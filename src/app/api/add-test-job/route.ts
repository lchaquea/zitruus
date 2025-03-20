import { NextResponse } from 'next/server';
import Airtable from 'airtable';

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

    // Configure Airtable
    Airtable.configure({
      apiKey: apiKey,
    });

    const base = Airtable.base(baseId);
    
    // Try different table name variations
    const tableNames = [
      jobsTableName,
      'Job Listings',
      'JobListings',
      'Jobs'
    ];
    
    let success = false;
    let createdRecord = null;
    let usedTableName = '';
    let error = null;
    
    // Try each table name until one works
    for (const tableName of tableNames) {
      try {
        console.log(`Trying to add test job to table: ${tableName}`);
        const table = base(tableName);
        
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
        
        success = true;
        createdRecord = record;
        usedTableName = tableName;
        break;
      } catch (err) {
        console.error(`Error adding test job to table ${tableName}:`, err);
        error = err;
      }
    }
    
    if (success) {
      return NextResponse.json({
        success: true,
        message: `Successfully added test job to table: ${usedTableName}`,
        record: {
          id: createdRecord.id,
          fields: createdRecord.fields
        }
      });
    } else {
      return NextResponse.json({
        success: false,
        message: 'Failed to add test job to any table',
        error: error instanceof Error ? error.message : 'Unknown error',
        triedTables: tableNames
      }, { status: 500 });
    }
  } catch (error) {
    console.error('Error adding test job:', error);
    
    return NextResponse.json({
      success: false,
      error: error instanceof Error ? error.message : 'Unknown error',
      stack: error instanceof Error ? error.stack : null
    }, { status: 500 });
  }
} 