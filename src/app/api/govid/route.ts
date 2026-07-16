import { NextResponse } from 'next/server';
import { govIds } from '@/lib/data';

// GET /api/govid
// Fetch all available government IDs or a specific one by passing ?id=
export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const id = searchParams.get('id');

    if (id) {
      const doc = govIds.find(g => g.id === id);
      if (!doc) {
        return NextResponse.json({ error: 'Government ID not found' }, { status: 404 });
      }
      return NextResponse.json({ success: true, data: doc });
    }

    return NextResponse.json({ success: true, data: govIds });
  } catch (error) {
    return NextResponse.json({ error: 'Failed to fetch government IDs' }, { status: 500 });
  }
}

// POST /api/govid
// Mock submission of a new government ID application
export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { idType, applicantData } = body;

    if (!idType || !applicantData) {
      return NextResponse.json({ error: 'Missing required fields: idType and applicantData' }, { status: 400 });
    }

    // Validate if the ID type exists
    const doc = govIds.find(g => g.id === idType);
    if (!doc) {
      return NextResponse.json({ error: 'Invalid ID type' }, { status: 400 });
    }

    // Here we would normally perform deep validation against doc.fields
    // For this mockup, we just simulate a successful submission.
    
    // Generate a mock application reference ID
    const refId = `APP-${Math.floor(1000 + Math.random() * 9000)}-${Math.random().toString(36).substring(2, 6).toUpperCase()}`;

    return NextResponse.json({
      success: true,
      message: 'Application submitted successfully',
      applicationId: refId,
      timestamp: new Date().toISOString(),
      estimatedProcessing: doc.processingTime
    }, { status: 201 });
    
  } catch (error) {
    return NextResponse.json({ error: 'Failed to process application' }, { status: 500 });
  }
}
