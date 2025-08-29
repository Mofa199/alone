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

export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const guides = await getStudyGuides();
    const guide = guides.find((g: any) => g.id === params.id);

    if (guide) {
      return NextResponse.json(guide);
    } else {
      return NextResponse.json({ message: 'Study guide not found' }, { status: 404 });
    }
  } catch (error) {
    return NextResponse.json({ message: 'Error retrieving study guide' }, { status: 500 });
  }
}
