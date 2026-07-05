import "server-only";
import { mkdir, writeFile, unlink } from "fs/promises";
import path from "path";
import crypto from "crypto";
import { prisma } from "@/lib/prisma";

const UPLOAD_DIR = path.join(process.cwd(), "public", "uploads");
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

/** Saves an uploaded image to /public/uploads and records it in the Media table. Returns the public path. */
export async function saveUploadedImage(file: File): Promise<string> {
  if (!ALLOWED_TYPES.has(file.type)) {
    throw new Error("Unsupported file type. Use JPG, PNG, WEBP, GIF or SVG.");
  }
  if (file.size > MAX_BYTES) {
    throw new Error("File too large. Max 8MB.");
  }

  await mkdir(UPLOAD_DIR, { recursive: true });

  const filename = `${crypto.randomUUID()}.${extFor(file.type)}`;
  const buffer = Buffer.from(await file.arrayBuffer());
  await writeFile(path.join(UPLOAD_DIR, filename), buffer);

  const publicPath = `/uploads/${filename}`;
  await prisma.media.create({ data: { path: publicPath, filename } });

  return publicPath;
}

/** Removes a previously uploaded image from /public/uploads. Safe to call even if the file is already gone. */
export async function deleteUploadedImage(publicPath: string): Promise<void> {
  if (!publicPath.startsWith("/uploads/")) return;
  const filePath = path.join(process.cwd(), "public", publicPath);
  try {
    await unlink(filePath);
  } catch {
    // already deleted or never existed on disk — nothing to do
  }
}
