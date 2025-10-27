// app/api/work/route.ts
import { prisma } from "@/lib/prisma";
import { NextResponse } from "next/server";

// GET – alle Arbeitseinträge abrufen
export async function GET() {
  const work = await prisma.workExperience.findMany();
  return NextResponse.json(work);
}

// POST – neuen Eintrag hinzufügen
export async function POST(req: Request) {
  const data = await req.json();
  const newWork = await prisma.workExperience.create({ data });
  return NextResponse.json(newWork);
}
