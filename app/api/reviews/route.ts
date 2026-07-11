import { NextResponse } from 'next/server';
import { getDb, isMongoConfigured, type ReviewDoc } from '@/lib/mongodb';

export const dynamic = 'force-dynamic';

const VALID_BRANCHES = ['Naran', 'Besar'];

export async function GET() {
  if (!isMongoConfigured) {
    return NextResponse.json({ error: 'MongoDB is not configured' }, { status: 503 });
  }

  try {
    const db = await getDb();
    const docs = await db
      .collection<ReviewDoc>('reviews')
      .find({ isPublished: true })
      .sort({ createdAt: -1 })
      .toArray();

    const reviews = docs.map(doc => ({
      id: doc._id.toString(),
      name: doc.name,
      rating: doc.rating,
      branch: doc.branch,
      comment: doc.comment,
      createdAt: doc.createdAt,
    }));

    return NextResponse.json({ reviews });
  } catch (error) {
    console.error('GET /api/reviews failed:', error);
    return NextResponse.json({ error: 'Failed to load reviews' }, { status: 500 });
  }
}

export async function POST(request: Request) {
  if (!isMongoConfigured) {
    return NextResponse.json({ error: 'MongoDB is not configured' }, { status: 503 });
  }

  const body = await request.json().catch(() => null);

  const name = typeof body?.name === 'string' ? body.name.trim() : '';
  const phone = typeof body?.phone === 'string' ? body.phone.trim() : '';
  const branch = typeof body?.branch === 'string' ? body.branch.trim() : '';
  const comment = typeof body?.comment === 'string' ? body.comment.trim() : '';
  const rating = Number(body?.rating);

  if (!name || !comment || !VALID_BRANCHES.includes(branch) || !Number.isInteger(rating) || rating < 1 || rating > 5) {
    return NextResponse.json({ error: 'Invalid review data' }, { status: 400 });
  }

  try {
    const db = await getDb();
    const createdAt = new Date().toISOString();

    const result = await db.collection<ReviewDoc>('reviews').insertOne({
      name,
      phone: phone || null,
      branch,
      rating,
      comment,
      isPublished: true,
      createdAt,
    });

    return NextResponse.json({
      review: {
        id: result.insertedId.toString(),
        name,
        rating,
        branch,
        comment,
        createdAt,
      },
    });
  } catch (error) {
    console.error('POST /api/reviews failed:', error);
    return NextResponse.json({ error: 'Failed to publish review' }, { status: 500 });
  }
}
