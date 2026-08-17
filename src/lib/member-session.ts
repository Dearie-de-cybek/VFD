import "server-only";
import { SignJWT, jwtVerify } from "jose";
import { cookies } from "next/headers";

const MEMBER_SESSION_COOKIE = "vdl_member_session";
const SESSION_TTL_SECONDS = 60 * 60 * 24 * 7; // 7 days

function secretKey() {
  const secret = process.env.SESSION_SECRET;
  if (!secret) throw new Error("SESSION_SECRET is not set");
  return new TextEncoder().encode(secret);
}

export type MemberSessionPayload = {
  memberId: string;
  email: string;
  name: string;
  role: string;
};

export async function createMemberSession(payload: MemberSessionPayload) {
  const token = await new SignJWT(payload)
    .setProtectedHeader({ alg: "HS256" })
    .setIssuedAt()
    .setExpirationTime(`${SESSION_TTL_SECONDS}s`)
    .sign(secretKey());

  const cookieStore = await cookies();
  cookieStore.set(MEMBER_SESSION_COOKIE, token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === "production",
    sameSite: "lax",
    path: "/",
    maxAge: SESSION_TTL_SECONDS,
  });
}

export async function destroyMemberSession() {
  const cookieStore = await cookies();
  cookieStore.delete(MEMBER_SESSION_COOKIE);
}

export async function getMemberSession(): Promise<MemberSessionPayload | null> {
  const cookieStore = await cookies();
  const token = cookieStore.get(MEMBER_SESSION_COOKIE)?.value;
  if (!token) return null;

  try {
    const { payload } = await jwtVerify(token, secretKey());
    return payload as unknown as MemberSessionPayload;
  } catch {
    return null;
  }
}

export async function requireMember(): Promise<MemberSessionPayload> {
  const session = await getMemberSession();
  if (!session) throw new Error("Unauthorized");
  return session;
}

export { MEMBER_SESSION_COOKIE };
