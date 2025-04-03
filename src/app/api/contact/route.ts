// app/api/contact/route.ts

import { NextRequest, NextResponse } from 'next/server';
import nodemailer from 'nodemailer';

export async function POST(req: NextRequest) {
  try {
    const { email, company } = await req.json();

    if (!email || !company) {
      return NextResponse.json({ message: 'Missing fields' }, { status: 400 });
    }

    // Configure the transporter
    const transporter = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        user: process.env.CONTACT_EMAIL,
        pass: process.env.CONTACT_EMAIL_PASS,
      },
    });

    // Email content
    const mailOptions = {
      from: `"Ai.Dit Contact Form" <${process.env.CONTACT_EMAIL}>`,
      to: process.env.CONTACT_EMAIL, // send to yourself
      subject: 'New Demo Request from Ai.Dit Landing Page',
      text: `Email: ${email}\nCompany: ${company}`,
      html: `
        <p><strong>Email:</strong> ${email}</p>
        <p><strong>Company:</strong> ${company}</p>
      `,
    };

    await transporter.sendMail(mailOptions);

    return NextResponse.json({ message: 'Success' }, { status: 200 });
  } catch (err) {
    console.error('Email send error:', err);
    return NextResponse.json(
      { message: 'Error sending email' },
      { status: 500 }
    );
  }
}
