import { NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function GET() {
  try {
    // Get environment variables
    const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
    const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
    const jobsTableName = process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME || 'Jobs';

    // Check if API key and base ID are available
    if (!apiKey) {
      return NextResponse.json({ error: 'Airtable API key is missing' }, { status: 500 });
    }

    if (!baseId) {
      return NextResponse.json({ error: 'Airtable Base ID is missing' }, { status: 500 });
    }

    // Configure Airtable
    Airtable.configure({
      apiKey: apiKey,
    });

    const base = Airtable.base(baseId);
    const jobsTable = base(jobsTableName);

    // Try to fetch records
    const records = await jobsTable.select().all();

    // Return diagnostic information
    return NextResponse.json({
      success: true,
      message: 'Successfully connected to Airtable',
      tableInfo: {
        tableName: jobsTableName,
        recordCount: records.length,
      },
      // Include a sample record if available (with sensitive data redacted)
      sampleRecord: records.length > 0 ? {
        id: records[0].id,
        fields: records[0].fields,
      } : null,
    });
  } catch (error) {
    console.error('Error testing Airtable connection:', error);
    
    // Return error information
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : null,
      env: {
        apiKeyExists: !!process.env.NEXT_PUBLIC_AIRTABLE_API_KEY,
        baseIdExists: !!process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID,
        tableNameExists: !!process.env.NEXT_PUBLIC_AIRTABLE_TABLE_NAME,
      }
    }, { status: 500 });
  }
} 