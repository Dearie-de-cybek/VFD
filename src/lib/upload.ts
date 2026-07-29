import "server-only";
import crypto from "crypto";
import { createAdminClient } from "@supabase/server/core";
import { prisma } from "@/lib/prisma";

const BUCKET = "uploads";
const PUBLIC_URL_MARKER = `/storage/v1/object/public/${BUCKET}/`;
const ALLOWED_TYPES = new Set(["image/jpeg", "image/png", "image/webp", "image/gif", "image/svg+xml"]);
const MAX_BYTES = 8 * 1024 * 1024; // 8MB

function extFor(mime: string) {
  switch (mime) {
    case "image/jpeg":
      return "jpg";
    case "image/png":
      return "png";
    case "image/webp":
      return "webp";
    case "image/gif":
      return "gif";
    case "image/svg+xml":
      return "svg";
    default:
      return "bin";
  }
}

/** Uploads an image to Supabase Storage and records it in the Media table. Returns the public URL. */
export async function saveUploadedImage(file: File): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Unsupported file type. Use JPG, PNG, WEBP, GIF or SVG.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("File too large. Max 8MB.");
  }

  const filename = `${crypto.randomUUID()}.${extFor(file.type)}`;
  const supabase = createAdminClient();

  const { error: uploadError } = await supabase.storage
    .from(BUCKET)
    .upload(filename, file, { contentType: file.type, upsert: false });
  if (uploadError) throw new Error(uploadError.message);

  const {
    data: { publicUrl },
  } = supabase.storage.from(BUCKET).getPublicUrl(filename);

  await prisma.media.create({ data: { path: publicUrl, filename } });

  return publicUrl;
}

/** Removes a previously uploaded image from Supabase Storage. Safe to call even if the file is already gone. */
export async function deleteUploadedImage(publicUrl: string): Promise<void> {
  const idx = publicUrl.indexOf(PUBLIC_URL_MARKER);
  if (idx === -1) return;
  const filename = publicUrl.slice(idx + PUBLIC_URL_MARKER.length);

  try {
    const supabase = createAdminClient();
    await supabase.storage.from(BUCKET).remove([filename]);
  } catch {
    // already deleted, never existed, or a transient network error — nothing to do
  }
}
