import { getDatabase } from "@/lib/db/mongodb";
import { Comment, CommentInput, CommentResponse } from "@/lib/types/comment";
import { NextRequest } from "next/server";

export const dynamic = "force-dynamic";

const rateLimitMap = new Map<string, { count: number; lastReset: number }>();
const RATE_LIMIT = 5; 
const RATE_WINDOW = 60 * 1000; 

function isRateLimited(ip: string): boolean {
  const now = Date.now();
  const entry = rateLimitMap.get(ip);

  if (!entry || now - entry.lastReset > RATE_WINDOW) {
    rateLimitMap.set(ip, { count: 1, lastReset: now });
    return false;
  }

  if (entry.count >= RATE_LIMIT) {
    return true;
  }

  entry.count++;
  return false;
}

function sanitizeInput(str: string): string {
  return str
    .trim()
    .replaceAll(/</g, "&lt;")
    .replaceAll(/>/g, "&gt;")
    .replaceAll(/"/g, "&quot;")
    .replaceAll(/'/g, "&#x27;")
    .slice(0, 1000); 
}

function sanitizeName(str: string): string {
  return str
    .trim()
    .replaceAll(/</g, "&lt;")
    .replaceAll(/>/g, "&gt;")
    .replaceAll(/"/g, "&quot;")
    .replaceAll(/'/g, "&#x27;")
    .slice(0, 50); 
}

export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    const db = await getDatabase();
    const comments = await db
      .collection<Comment>("comments")
      .find({ postSlug: slug })
      .sort({ createdAt: -1 })
      .toArray();

    const response: CommentResponse[] = comments.map((comment) => ({
      id: comment._id!.toString(),
      postSlug: comment.postSlug,
      name: comment.name,
      content: comment.content,
      createdAt: comment.createdAt.toISOString(),
    }));

    return Response.json(response);
  } catch (error) {
    console.error("Error fetching comments:", error);
    return Response.json({ error: "Failed to fetch comments" }, { status: 500 });
  }
}

export async function POST(
  request: NextRequest,
  { params }: { params: Promise<{ slug: string }> }
) {
  try {
    const { slug } = await params;

    // Rate limiting
    const ip = request.headers.get("x-forwarded-for") || "unknown";
    if (isRateLimited(ip)) {
      return Response.json(
        { error: "Too many comments. Please wait a moment." },
        { status: 429 }
      );
    }

    const body: CommentInput & { honeypot?: string } = await request.json();

    // Honeypot check (spam bots fill hidden fields)
    if (body.honeypot) {
      return Response.json({ error: "Spam detected" }, { status: 400 });
    }

    // Validate input
    if (!body.name || !body.content) {
      return Response.json(
        { error: "Name and content are required" },
        { status: 400 }
      );
    }

    if (body.name.trim().length < 2) {
      return Response.json(
        { error: "Name must be at least 2 characters" },
        { status: 400 }
      );
    }

    if (body.content.trim().length < 3) {
      return Response.json(
        { error: "Comment must be at least 3 characters" },
        { status: 400 }
      );
    }

    const comment: Comment = {
      postSlug: slug,
      name: sanitizeName(body.name),
      content: sanitizeInput(body.content),
      createdAt: new Date(),
    };

    const db = await getDatabase();
    const result = await db.collection<Comment>("comments").insertOne(comment);

    const response: CommentResponse = {
      id: result.insertedId.toString(),
      postSlug: comment.postSlug,
      name: comment.name,
      content: comment.content,
      createdAt: comment.createdAt.toISOString(),
    };

    return Response.json(response, { status: 201 });
  } catch (error) {
    console.error("Error creating comment:", error);
    return Response.json({ error: "Failed to create comment" }, { status: 500 });
  }
}
