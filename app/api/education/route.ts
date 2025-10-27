import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const education = await prisma.education.findMany();
  return NextResponse.json(education);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newEducation = await prisma.education.create({ data });
  return NextResponse.json(newEducation);
}
