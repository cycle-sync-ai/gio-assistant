
import { NextResponse } from "next/server";

export default async function GET(req) {
    try {
        return NextResponse.json({ messsage: "Hello World" }, {status: 200});
    } catch (error) {
        console.log(error);
        return NextResponse.json({ error: error }, {status: 500});
    }
}

export default async function POST(req) {
  try {
    console.log(req.data, "POST")
      return NextResponse.json({ messsage: "Hello World" }, {status: 200});
  } catch (error) {
      console.log(error);
      return NextResponse.json({ error: error }, {status: 500});
  }
}