'use client';
import { useParams } from 'next/navigation';

export default function RecipePage() {
  const params = useParams();
  const id = params.id as string;

  return <div>Recipe ID: {id}</div>;
}
