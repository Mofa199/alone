import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

// Define the path to the mock database
const dataFilePath = path.join(process.cwd(), 'src/data/topics.json');

// Helper function to read data
async function getTopics() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

// GET handler for retrieving a single topic by ID
export async function GET(request: Request, { params }: { params: { id: string } }) {
  try {
    const topics = await getTopics();
    const topic = topics.find((t: any) => t.id === params.id);

    if (topic) {
      return NextResponse.json(topic);
    } else {
      return NextResponse.json({ message: 'Topic not found' }, { status: 404 });
    }
  } catch (error) {
    console.error('Failed to retrieve topic:', error);
    return NextResponse.json({ message: 'Error retrieving topic' }, { status: 500 });
  }
}
