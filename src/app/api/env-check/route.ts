import { NextResponse } from 'next/server';
import Airtable from 'airtable';

export async function GET() {
  try {
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_TABLE_NAME || 'JobListings';

    // First, let's check our environment variables
    const envCheck = {
      apiKey: {
        exists: !!apiKey,
        length: apiKey?.length || 0,
        prefix: apiKey?.substring(0, 6) || ''
      },
      baseId: {
        exists: !!baseId,
        value: baseId || '',
      },
      tableName: {
        value: tableName
      }
    };

    // Try to initialize Airtable in different ways
    let base;
    let error = null;
    
    try {
      // Method 1: Direct initialization
      Airtable.configure({ apiKey });
      base = Airtable.base(baseId as string);
      
      // Try to access the table
      const table = base(tableName);
      const records = await table.select({ maxRecords: 1 }).firstPage();
      
      return NextResponse.json({
        success: true,
        envCheck,
        recordCount: records.length,
        fields: records[0]?.fields ? Object.keys(records[0].fields) : []
      });
    } catch (e) {
      error = e instanceof Error ? e.message : 'Unknown error';
      
      // Method 2: Alternative initialization
      try {
        base = new Airtable({ apiKey }).base(baseId as string);
        const records = await base(tableName).select({ maxRecords: 1 }).firstPage();
        
        return NextResponse.json({
          success: true,
          method: 'alternative',
          envCheck,
          recordCount: records.length,
          fields: records[0]?.fields ? Object.keys(records[0].fields) : []
        });
      } catch (e2) {
        return NextResponse.json({
          success: false,
          envCheck,
          error: {
            method1: error,
            method2: e2 instanceof Error ? e2.message : 'Unknown error'
          }
        });
      }
    }
  } catch (error) {
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error'
    });
  }
} 