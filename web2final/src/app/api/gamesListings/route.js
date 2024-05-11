import prisma from "@/app/libs/prisma";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const games = await prisma.game.findMany({});
    return NextResponse.json(games);
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.error("Something went wrong", { status: 500 });
  }
}

export async function POST(req, res) {
  try {
    const body = await req.json();
    const { id } = body;

    const UniqueGame = await prisma.game.findUnique({ where: { gameId: id } });

    return NextResponse.json(UniqueGame);
  } catch (error) {
    console.error("An error occurred:", error);
    return NextResponse.error("Something went wrong", { status: 500 });
  }
}
