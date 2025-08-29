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
    // If the file doesn't exist or is empty, return an empty array
    return [];
  }
}

// GET handler for retrieving all topics
export async function GET() {
  try {
    const topics = await getTopics();
    return NextResponse.json(topics);
  } catch (error) {
    console.error('Failed to retrieve topics:', error);
    return NextResponse.json({ message: 'Error retrieving topics' }, { status: 500 });
  }
}

// POST handler for adding a new topic
export async function POST(request: Request) {
  try {
    const newTopic = await request.json();
    const topics = await getTopics();

    // Add a unique ID and timestamp
    newTopic.id = `topic_${Date.now()}`;
    newTopic.createdAt = new Date().toISOString();

    topics.push(newTopic);

    await fs.writeFile(dataFilePath, JSON.stringify(topics, null, 2));

    return NextResponse.json({ message: 'Topic added successfully', topic: newTopic }, { status: 201 });
  } catch (error) {
    console.error('Failed to add topic:', error);
    return NextResponse.json({ message: 'Error adding topic' }, { status: 500 });
  }
}
