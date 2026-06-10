import { NextRequest, NextResponse } from "next/server";
import fs from "fs";
import path from "path";

export async function POST(req: NextRequest) {
  const body = await req.text();
  fs.writeFileSync(path.join(process.cwd(), "debug_conversations.json"), body);
  return NextResponse.json({ success: true });
}
