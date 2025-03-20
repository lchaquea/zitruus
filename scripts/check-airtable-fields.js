require('dotenv').config();
const Airtable = require('airtable');

async function checkFields() {
  try {
    // Get environment variables
    const apiKey = process.env.AIRTABLE_API_KEY;
    const baseId = process.env.AIRTABLE_BASE_ID;
    const tableName = process.env.AIRTABLE_CANDIDATE_REQUEST_TABLE || 'CandidateRequests';

    if (!apiKey || !baseId) {
      console.error('Missing configuration:', { 
        hasApiKey: !!apiKey, 
        hasBaseId: !!baseId 
      });
      return;
    }

    // Configure Airtable
    Airtable.configure({ apiKey });
    const base = Airtable.base(baseId);
    const table = base(tableName);

    // Try to fetch one record to get field names
    const records = await table.select({ maxRecords: 1 }).all();
    
    // Get field names from the table schema
    const fields = records.length > 0 ? Object.keys(records[0].fields) : [];

    // Expected field names
    const expectedFields = [
      'Company Name',
      'Company LinkedIn',
      'Contact Name',
      'Contact Email',
      'Contact Phone',
      'Industry',
      'Company Size',
      'Position Title',
      'Position Type',
      'Location',
      'Budget',
      'Requirements',
      'Timeline',
      'Additional Info',
      'Submitted At'
    ];

    // Compare fields
    const missingFields = expectedFields.filter(field => !fields.includes(field));
    const extraFields = fields.filter(field => !expectedFields.includes(field));

    console.log({
      success: true,
      tableName,
      actualFields: fields,
      expectedFields,
      missingFields,
      extraFields,
      fieldsMatch: missingFields.length === 0,
      details: {
        totalFields: fields.length,
        expectedFieldCount: expectedFields.length,
        missingFieldCount: missingFields.length,
        extraFieldCount: extraFields.length
      }
    });

  } catch (error) {
    console.error('Error checking Airtable fields:', error);
  }
}

checkFields(); 