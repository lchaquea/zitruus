import { NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function GET() {
  try {
    const apiKey = process.env.NEXT_PUBLIC_AIRTABLE_API_KEY;
    const baseId = process.env.NEXT_PUBLIC_AIRTABLE_BASE_ID;
    
    if (!apiKey || !baseId) {
      return NextResponse.json({
        success: false,
        error: 'Missing configuration'
      });
    }

    // Initialize Airtable
    const base = new Airtable({ apiKey }).base(baseId);
    
    // List of table names to try
    const tableNames = [
      'JobListings',
      'Job Listings',
      'Jobs',
      'jobs',
      'Job listings',
      'job listings',
      'job_listings'
    ];

    const results = {};
    
    // Try each table name
    for (const tableName of tableNames) {
      try {
        const records = await base(tableName).select({ maxRecords: 1 }).firstPage();
        results[tableName] = {
          success: true,
          recordCount: records.length,
          fields: records[0]?.fields ? Object.keys(records[0].fields) : []
        };
      } catch (e) {
        results[tableName] = {
          success: false,
          error: e instanceof Error ? e.message : 'Unknown error'
        };
      }
    }

    // Return the results of our table tests
    return NextResponse.json({
      success: true,
      tableTests: results
    });
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 