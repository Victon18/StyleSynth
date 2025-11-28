// apps/web/app/api/history/[id]/route.ts
import { getServerSession } from "next-auth";
import { authOptions } from "$lib/auth";
import prisma from "@repo/db/client";
import { unlink } from "fs/promises";
import path from "path";

export async function DELETE(
  req: Request,
  { params }: { params: { id: string } }
) {
  const session = await getServerSession(authOptions);
  if (!session?.user?.email)
    return Response.json({ error: "Not authenticated" }, { status: 401 });

  const historyId = Number(params.id);
  if (isNaN(historyId))
    return Response.json({ error: "Invalid ID" }, { status: 400 });

  // Fetch entry
  const entry = await prisma.history.findUnique({
    where: { id: historyId },
  });

  if (!entry || entry.userEmail !== session.user.email) {
    return Response.json({ error: "Not found" }, { status: 404 });
  }

  // Delete file from disk
  if (entry.url.startsWith("/generated/")) {
    const filePath = path.join(process.cwd(), "public", entry.url);
    try {
      await unlink(filePath);
    } catch (err) {
      console.error("Error deleting file:", err);
      // continue anyway
    }
  }

  // Remove DB entry
  await prisma.history.delete({
    where: { id: historyId },
  });

  return Response.json({ success: true });
}

