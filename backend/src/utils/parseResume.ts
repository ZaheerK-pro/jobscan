/**
 * Extract profile-related fields from resume PDF text.
 * Used to auto-fill profile when user imports a resume.
 */
export interface ParsedResume {
  fullname?: string;
  email?: string;
  phoneNumber?: string;
  bio?: string;
  skills?: string[];
}

const EMAIL_REGEX =
  /[a-zA-Z0-9.!#$%&'*+/=?^_`{|}~-]+@[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?(?:\.[a-zA-Z0-9](?:[a-zA-Z0-9-]{0,61}[a-zA-Z0-9])?)*/g;
const PHONE_REGEX =
  /(?:\+?\d{1,3}[-.\s]?)?\(?\d{2,4}\)?[-.\s]?\d{2,4}[-.\s]?\d{2,4}(?:[-.\s]?\d{2,4})?|\d{10,}/g;

const COMMON_SKILLS = [
  "javascript",
  "typescript",
  "react",
  "node",
  "node.js",
  "python",
  "java",
  "sql",
  "html",
  "css",
  "aws",
  "git",
  "rest",
  "api",
  "mongodb",
  "postgresql",
  "express",
  "redux",
  "tailwind",
  "agile",
  "scrum",
  "docker",
  "kubernetes",
  "linux",
  "figma",
  "next.js",
  "angular",
  "vue",
  "c++",
  "c#",
  ".net",
  "machine learning",
  "data analysis",
  "communication",
  "leadership",
  "problem solving",
  "teamwork",
];

function extractEmails(text: string): string[] {
  const matches = text.match(EMAIL_REGEX) ?? [];
  return [...new Set(matches)].filter((e) => e.length >= 5 && !e.endsWith(".png") && !e.endsWith(".jpg"));
}

function extractPhones(text: string): string[] {
  const matches = text.match(PHONE_REGEX) ?? [];
  return [...new Set(matches)].filter((p) => p.replace(/\D/g, "").length >= 10);
}

function extractSkills(text: string): string[] {
  const lower = text.toLowerCase();
  const found: string[] = [];
  for (const skill of COMMON_SKILLS) {
    const regex = new RegExp(`\\b${skill.replace(/[.+]/g, "\\$&")}\\b`, "i");
    if (regex.test(lower) && !found.includes(skill)) {
      found.push(skill);
    }
  }
  return found;
}

function extractFirstLineAsName(text: string): string | undefined {
  const lines = text
    .split(/\r?\n/)
    .map((l) => l.trim())
    .filter((l) => l.length > 0);
  for (const line of lines) {
    if (line.length < 2 || line.length > 80) continue;
    if (EMAIL_REGEX.test(line) || PHONE_REGEX.test(line)) continue;
    if (/^\d+$/.test(line)) continue;
    return line;
  }
  return undefined;
}

function extractBio(text: string, maxLen = 400): string | undefined {
  const sections = text.split(/\n\s*(?:summary|about|profile|objective|experience|education|skills)\s*:/i);
  const first = sections[0]?.trim();
  if (first && first.length >= 20) {
    return first.slice(0, maxLen).trim();
  }
  const lines = text.split(/\r?\n/).map((l) => l.trim()).filter(Boolean);
  let acc = "";
  for (const line of lines) {
    if (line.match(EMAIL_REGEX) || line.match(PHONE_REGEX)) continue;
    if (acc.length + line.length > maxLen) break;
    acc += (acc ? " " : "") + line;
  }
  return acc.length >= 20 ? acc : undefined;
}

/**
 * Parse PDF buffer and return extracted profile fields.
 */
export async function parseResumeFromPdf(buffer: Buffer): Promise<ParsedResume> {
  const pdfParseModule = await import("pdf-parse");
  const pdfParse = (pdfParseModule as { default?: (buf: Buffer) => Promise<{ text?: string }> }).default ?? pdfParseModule;
  const data = await (pdfParse as (buf: Buffer) => Promise<{ text?: string }>)(buffer);
  const text = (data?.text ?? "") as string;
  if (!text || text.trim().length < 10) {
    return {};
  }

  const emails = extractEmails(text);
  const phones = extractPhones(text);
  const skills = extractSkills(text);
  const fullname = extractFirstLineAsName(text);
  const bio = extractBio(text);

  return {
    fullname: fullname ?? undefined,
    email: emails[0],
    phoneNumber: phones[0],
    bio: bio ?? undefined,
    skills: skills.length > 0 ? skills : undefined,
  };
}
