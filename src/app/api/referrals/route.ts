import { NextRequest, NextResponse } from 'next/server';
import { submitCandidateReferral } from '../../../lib/airtable-server';
import { z } from 'zod';

// Validation schema
const referralSchema = z.object({
  candidateName: z.string().min(1, 'Candidate name is required'),
  candidateEmail: z.string().email('Invalid email address'),
  phoneNumber: z.string().min(1, 'Phone number is required'),
  resume: z.array(z.string()).min(1, 'Resume is required'),
  jobId: z.string().min(1, 'Job ID is required'),
  message: z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = referralSchema.parse(body);
    
    // Submit referral
    const result = await submitCandidateReferral(validatedData);
    
    if (!result.success) {
      return NextResponse.json(
        { error: result.error || 'Failed to submit referral' },
        { status: 400 }
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Error in /api/referrals:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: 'Invalid request data', details: error.errors },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit referral' },
      { status: 500 }
    );
  }
} 