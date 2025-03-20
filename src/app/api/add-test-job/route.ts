import { NextResponse } from 'next/server';
import Airtable from 'airtable';

// Custom fetch function that removes AbortSignal
const customFetch = async (url: string, options: any = {}) => {
  const { signal, ...fetchOptions } = options;
  return fetch(url, fetchOptions);
};

// Mark this route as dynamic to prevent static optimization
export const dynamic = 'force-dynamic';
export const runtime = 'edge';

export async function GET() {
  // Prevent execution during build time
  if (process.env.NODE_ENV === 'production' && process.env.VERCEL_ENV === 'production') {
    return NextResponse.json({
      success: false,
      message: 'This endpoint is not available in production',
    }, { status: 403 });
  }

  try {
    // Get environment variables
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const jobsTableName = process.env.AIRTABLE_TABLE_NAME || 'Jobs';

    // Check if API key and base ID are available
    if (!apiKey) {
      return NextResponse.json({ error: 'Airtable API key is missing' }, { status: 500 });
    }

    if (!baseId) {
      return NextResponse.json({ error: 'Airtable Base ID is missing' }, { status: 500 });
    }

    // Configure Airtable with custom fetch
    Airtable.configure({
      apiKey: apiKey,
      endpointUrl: 'https://api.airtable.com',
      requestTimeout: 300000, // 5 minutes timeout
      fetch: customFetch as any,
    });

    const base = new Airtable().base(baseId);
    const table = base(jobsTableName);
    
    try {
      console.log(`Attempting to add test job to table: ${jobsTableName}`);
      
      // Create a test job record
      const record = await table.create({
        'Job Title': 'Test Software Developer',
        'Function': 'Engineering',
        'Location': 'Remote - LATAM',
        'Employment Type': 'Full-time',
        'Salary Range': '$60K - $80K USD/year',
        'Date Posted': new Date().toISOString().split('T')[0],
        'Application Deadline': new Date(Date.now() + 30 * 24 * 60 * 60 * 1000).toISOString().split('T')[0],
        'Job Description': 'This is a test job posting created via the API.',
        'Responsibilities': 'Write code\nTest features\nCollaborate with team',
        'Requirements': 'JavaScript\nReact\n3+ years experience',
        'Skills': 'JavaScript, React, Node.js, TypeScript',
        'Company Description': 'Test company description',
        'Industry': 'Technology',
        'Benefits': 'Remote work\nFlexible hours\nHealth insurance'
      });
      
      return NextResponse.json({
        success: true,
        message: `Successfully added test job to table: ${jobsTableName}`,
        record: {
          id: record.id,
          fields: record.fields
        }
      });
    } catch (err) {
      console.error(`Error adding test job to table ${jobsTableName}:`, err);
      return NextResponse.json({
        success: false,
        message: `Failed to add test job to table: ${jobsTableName}`,
        error: err instanceof Error ? err.message : 'Unknown error'
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error in add-test-job route:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : null
    }, { status: 500 });
  }
} 