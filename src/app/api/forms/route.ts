import { NextResponse } from 'next/server';

// Webhook URLs - Replace these with your actual webhook URLs
const WEBHOOKS = {
  jobApplication: process.env.JOB_APPLICATION_WEBHOOK_URL,
  resumePool: process.env.RESUME_POOL_WEBHOOK_URL,
  candidateRequest: process.env.CANDIDATE_REQUEST_WEBHOOK_URL,
  candidateReferral: process.env.CANDIDATE_REFERRAL_WEBHOOK_URL,
  companyReferral: process.env.COMPANY_REFERRAL_WEBHOOK_URL,
};

async function sendToWebhook(webhookUrl: string, data: any) {
  try {
    const response = await fetch(webhookUrl, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(data),
    });

    if (!response.ok) {
      throw new Error(`HTTP error! status: ${response.status}`);
    }

    return await response.json();
  } catch (error) {
    console.error('Error sending to webhook:', error);
    throw error;
  }
}

export async function POST(request: Request) {
  try {
    const data = await request.json();
    const { formType, ...formData } = data;

    // Get the appropriate webhook URL based on form type
    const webhookUrl = WEBHOOKS[formType];

    if (!webhookUrl) {
      return NextResponse.json(
        { error: 'Invalid form type' },
        { status: 400 }
      );
    }

    // Send to webhook
    await sendToWebhook(webhookUrl, formData);

    return NextResponse.json(
      { message: 'Form submitted successfully' },
      { status: 200 }
    );
  } catch (error) {
    console.error('Error processing form submission:', error);
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    );
  }
} 