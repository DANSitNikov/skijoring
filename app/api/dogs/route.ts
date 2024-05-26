import { auth } from "@/auth";
import prisma from "@/lib/db";
import { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";

export async function GET() {
  const session = await auth();

  console.log("this is session", session);

  const dogs = await prisma.dog.findMany({
    where: { userId: session?.user.id },
  });

  return NextResponse.json(dogs || []);
}
