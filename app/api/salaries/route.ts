// pages/api/salaries.ts
import fs from "fs";
import path from "path";
import { parse } from "csv-parse";
import { NextRequest, NextResponse } from "next/server";
import { finished } from "stream/promises";

export async function GET(req: NextRequest) {
  const filePath = path.resolve(".", "data/salaries.csv");
  const salaries: any[] = [];

  try {
    const parser = fs.createReadStream(filePath).pipe(parse({ columns: true }));

    parser.on("data", (data) => {
      salaries.push(data);
    });

    await finished(parser);

    return NextResponse.json(salaries, { status: 200 });
  } catch (err) {
    console.log("Error reading CSV file", err);
    return NextResponse.json(
      { error: "Failed to read the CSV file" },
      { status: 500 }
    );
  }
}