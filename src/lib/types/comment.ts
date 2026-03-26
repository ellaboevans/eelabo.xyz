import { ObjectId } from "mongodb";

export interface Comment {
  _id?: ObjectId;
  postSlug: string;
  name: string;
  content: string;
  createdAt: Date;
}

export interface CommentInput {
  name: string;
  content: string;
}

export interface CommentResponse {
  id: string;
  postSlug: string;
  name: string;
  content: string;
  createdAt: string;
}

/**
 * Generates a deterministic gradient based on a name string.
 * The same name will always produce the same gradient colors.
 */
export function generateGradient(name: string): string {
  const hash = name
    .toLowerCase()
    .split("")
    .reduce((acc, char) => acc + char.charCodeAt(0), 0);

  const hue1 = hash % 360;
  const hue2 = (hash * 7) % 360;

  return `linear-gradient(135deg, hsl(${hue1}, 70%, 60%), hsl(${hue2}, 70%, 60%))`;
}

/**
 * Generates initials from a name (max 2 characters)
 */
export function getInitials(name: string): string {
  return name
    .split(" ")
    .map((word) => word[0])
    .join("")
    .toUpperCase()
    .slice(0, 2);
}
