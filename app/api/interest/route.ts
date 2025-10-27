import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  const interests = await prisma.interest.findMany();
  return NextResponse.json(interests);
}

export async function POST(req: Request) {
  const data = await req.json();
  const newInterest = await prisma.interest.create({ data });
  return NextResponse.json(newInterest);
}
