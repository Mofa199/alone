import { NextResponse } from 'next/server';
import fs from 'fs/promises';
import path from 'path';

const dataFilePath = path.join(process.cwd(), 'src/data/questions.json');

async function getQuestions() {
  try {
    const data = await fs.readFile(dataFilePath, 'utf-8');
    return JSON.parse(data);
  } catch (error) {
    return [];
  }
}

export async function GET() {
  try {
    const questions = await getQuestions();
    return NextResponse.json(questions);
  } catch (error) {
    return NextResponse.json({ message: 'Error retrieving questions' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const newQuestion = await request.json();
    const questions = await getQuestions();

    newQuestion.id = `question_${Date.now()}`;
    questions.push(newQuestion);

    await fs.writeFile(dataFilePath, JSON.stringify(questions, null, 2));

    return NextResponse.json({ message: 'Question added successfully', question: newQuestion }, { status: 201 });
  } catch (error) {
    return NextResponse.json({ message: 'Error adding question' }, { status: 500 });
  }
}
