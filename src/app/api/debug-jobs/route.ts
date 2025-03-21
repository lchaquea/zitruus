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
    const jobsTable = base(jobsTableName);

    // Try to fetch records
    const records = await jobsTable.select().all();

    // Return raw data
    return NextResponse.json({
      success: true,
      tableName: jobsTableName,
      recordCount: records.length,
      rawRecords: records.map(record => ({
        id: record.id,
        fields: record.fields,
      })),
    });
  } catch (error) {
    console.error('Error fetching raw job data:', error);
    
    // Return error information
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : null,
    }, { status: 500 });
  }
} 