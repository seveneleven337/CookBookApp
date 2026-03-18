import { getRandomMeal } from '@/lib/recipe-api';
import { NextResponse } from 'next/server';

export async function GET() {
  const meal = await getRandomMeal();
  return NextResponse.json(meal);
}
