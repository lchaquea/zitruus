import { NextRequest, NextResponse } from 'next/server';
import { submitResumePoolEntry } from '@/lib/airtable-server';
import { z } from 'zod';

// Validation schema
const resumePoolSchema = z.object({
  "Full Name": z.string().min(1, "Full name is required"),
  "Phone": z.string().min(1, "Phone number is required"),
  "Email": z.string().email("Invalid email format"),
  "Location": z.string().min(1, "Location is required"),
  "Function": z.string().min(1, "Function is required"),
  "Job Title": z.string().min(1, "Job title is required"),
  "Resume URL": z.string().url("Invalid resume URL"),
  "LinkedIn URL": z.string().url("Invalid LinkedIn URL"),
  "Portfolio URL": z.string().url("Invalid portfolio URL").optional(),
  "Years of Experience": z.string().min(1, "Years of experience is required"),
  "Salary Expectations": z.string().min(1, "Salary expectations are required"),
  "Skills": z.string().min(1, "Skills are required"),
  "Additional Info": z.string().optional(),
});

export async function POST(request: NextRequest) {
  try {
    const body = await request.json();
    
    // Validate request body
    const validatedData = resumePoolSchema.parse(body);
    
    // Submit to resume pool
    const result = await submitResumePoolEntry({
      ...validatedData,
      "Submitted At": new Date().toISOString(),
    });
    
    return NextResponse.json(result);
  } catch (error) {
    console.error('Error in /api/resume-pool:', error);
    
    if (error instanceof z.ZodError) {
      return NextResponse.json(
        { error: error.errors[0].message },
        { status: 400 }
      );
    }

    return NextResponse.json(
      { error: 'Failed to submit resume' },
      { status: 500 }
    );
  }
} 