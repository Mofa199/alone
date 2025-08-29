import { NextResponse } from 'next/server';

const POINTS_PER_CORRECT_ANSWER = 10;

export async function POST(request: Request) {
  try {
    const { score } = await request.json();

    if (typeof score !== 'number') {
      return NextResponse.json({ message: 'Invalid score provided' }, { status: 400 });
    }

    const pointsAwarded = score * POINTS_PER_CORRECT_ANSWER;

    // In a real app, you would find the user in the database and update their points.
    // For now, we just return the points awarded and let the client-side context handle the state.

    return NextResponse.json({ success: true, pointsAwarded });
  } catch (error) {
    return NextResponse.json({ message: 'Error updating points' }, { status: 500 });
  }
}
