import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/badges.json');

export async function GET() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    const badges = JSON.parse(data);
    return NextResponse.json(badges);
  } catch (error) {
    return NextResponse.json({ message: 'Error retrieving badges' }, { status: 500 });
  }
}
