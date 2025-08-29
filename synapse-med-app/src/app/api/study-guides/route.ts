import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/study-guides.json');

async function getStudyGuides() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function GET() {
  try {
    const guides = await getStudyGuides();
    return NextResponse.json(guides);
  } catch (error) {
    return NextResponse.json({ message: 'Error retrieving study guides' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newGuide = await request.json();
    const guides = await getStudyGuides();

    newGuide.id = `guide_${Date.now()}`;
    guides.push(newGuide);

    await fs.writeFile(dataFilePath, JSON.stringify(guides, null, 2));

    return NextResponse.json({ message: 'Study guide added successfully', guide: newGuide }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding study guide' }, { status: 500 });
  }
}
