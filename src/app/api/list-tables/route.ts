import { NextResponse } from 'next/server';
import Airtable from 'airtable';

// Custom fetch function that removes AbortSignal
const customFetch = async (url: string, options: any = {}) => {
  const { signal, ...fetchOptions } = options;
  return fetch(url, fetchOptions);
};

export async function GET() {
  try {
    // Get environment variables
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;

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
    
    // Try different table name variations
    const tables = [
      'Job Listings',
      'JobListings',
      'Jobs',
      'jobs',
      'Job listings',
      'job listings',
      'job_listings',
      'CandidateReferrals',
      'CompanyReferrals',
      'ResumePool'
    ];
    
    const tableResults = {};
    
    // Try to access each table and see if it exists
    for (const tableName of tables) {
      try {
        const table = base(tableName);
        const records = await table.select({ maxRecords: 1 }).all();
        tableResults[tableName] = {
          exists: true,
          recordCount: records.length,
          sampleFields: records.length > 0 ? Object.keys(records[0].fields) : []
        };
      } catch (error) {
        tableResults[tableName] = {
          exists: false,
          error: error instanceof Error ? error.message : 'Unknown error'
        };
      }
    }

    return NextResponse.json({
      success: true,
      baseId,
      tables: tableResults
    });
  } catch (error) {
    console.error('Error listing Airtable tables:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : null
    }, { status: 500 });
  }
} 