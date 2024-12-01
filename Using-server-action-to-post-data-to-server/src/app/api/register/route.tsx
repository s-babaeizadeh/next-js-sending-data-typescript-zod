import { NextRequest, NextResponse } from "next/server";

import { schema } from "../../registrationSchema";

export async function POST(req: NextRequest) {
  const data = await req.json();
  let parsed = schema.safeParse(data);
  if (parsed.success) {
    // Add parsed.data to the database
    return NextResponse.json({ message: "User registered", data: parsed.data });
  } else {
    return NextResponse.json({ error: parsed.error }, { status: 400 });
  }
}
