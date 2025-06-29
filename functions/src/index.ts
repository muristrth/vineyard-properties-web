// functions/src/index.ts

import * as functions from 'firebase-functions';
import * as functionsV1 from 'firebase-functions/v1'; // Explicitly importing v1 for firestore trigger
import * as admin from 'firebase-admin';
import * as pdf from 'html-pdf'; // For PDF generation
import * as nodemailer from 'nodemailer'; // For sending emails

// Initialize Firebase Admin SDK
admin.initializeApp();

// --- Nodemailer Transporter Setup ---
// SMTP credentials will be stored in Firebase Functions config
const smtpConfig = {
  host: functions.config().smtp.host,
  port: parseInt(functions.config().smtp.port), // Ensure port is a number
  secure: functions.config().smtp.secure === 'true', // Use 'true' or 'false' string in config
  auth: {
    user: functions.config().smtp.user,
    pass: functions.config().smtp.pass,
  },
};

const transporter = nodemailer.createTransport(smtpConfig);
// --- End Nodemailer Transporter Setup ---

// Admin email address for notifications
const ADMIN_EMAIL = 'admin@yourcompany.com'; // <<< IMPORTANT: Replace with your actual admin email

/**
 * Cloud Function to generate a PDF, upload to Storage, update Firestore, and send emails
 * whenever a sales form document is submitted in Firestore.
 */
export const processSalesFormSubmission = functionsV1.firestore
  .document('forms/{formId}')
  .onUpdate(async (change, context) => {
    const newData = change.after.data();
    const previousData = change.before.data();
    const formId = context.params.formId;

    // Ensure this is a submission event and PDF hasn't been generated yet
    if (newData.status === 'submitted' && previousData.status !== 'submitted' && !newData.client?.pdfDownloadUrl) {
      const formData = newData as {
        formId: string;
        property: { name: string; beacon: string; price: string; viewedDate: string; salesperson: string; };
        client: {
          [x: string]: any;
          name1: string;
          name2: string;
          tel: string;
          kraPin: string;
          email: string;
          currentAddress: string;
          permanentAddress: string;
          nextOfKin: string;
          idNumber: string;
          passportPhotoUrl?: string; // Optional if not always present
        };
        status: string;
      };

      const clientEmail = formData.client.email;
      const clientFullName = `${formData.client.name1} ${formData.client.name2}`;

      functions.logger.info(`Processing form ${formId} for ${clientFullName}`);

      try {
        // 1. Generate HTML content for the PDF
        const htmlContent = `
          <!DOCTYPE html>
          <html>
          <head>
              <title>VPL Sales Form - ${formData.property.name}</title>
              <style>
                  body { font-family: Arial, sans-serif; margin: 20px; color: #333; }
                  .container { width: 100%; max-width: 800px; margin: 0 auto; border: 1px solid #eee; padding: 30px; box-shadow: 0 0 10px rgba(0,0,0,0.1); }
                  h1, h2 { color: #d9534f; border-bottom: 2px solid #d9534f; padding-bottom: 5px; margin-top: 20px; }
                  .section { margin-bottom: 20px; }
                  .field { margin-bottom: 10px; }
                  .field strong { display: inline-block; width: 150px; color: #555; }
                  .passport-photo { text-align: center; margin-top: 20px; }
                  .passport-photo img { max-width: 150px; border: 1px solid #ddd; padding: 5px; border-radius: 5px; }
                  .footer { text-align: center; margin-top: 40px; font-size: 0.8em; color: #777; }
              </style>
          </head>
          <body>
              <div class="container">
                  <h1>VPL Sales Form</h1>
                  <p><strong>Form ID:</strong> ${formData.formId}</p>

                  <h2>Property Information</h2>
                  <div class="section">
                      <div class="field"><strong>Property Name:</strong> ${formData.property.name}</div>
                      <div class="field"><strong>Beacon No.:</strong> ${formData.property.beacon}</div>
                      <div class="field"><strong>Price:</strong> Ksh ${formData.property.price}</div>
                      <div class="field"><strong>Salesperson:</strong> ${formData.property.salesperson}</div>
                      <div class="field"><strong>Date Viewed:</strong> ${formData.property.viewedDate}</div>
                  </div>

                  <h2>Client Information</h2>
                  <div class="section">
                      <div class="field"><strong>Client Name:</strong> ${clientFullName}</div>
                      <div class="field"><strong>Telephone:</strong> ${formData.client.tel}</div>
                      <div class="field"><strong>Email:</strong> ${formData.client.email}</div>
                      <div class="field"><strong>KRA PIN:</strong> ${formData.client.kraPin}</div>
                      <div class="field"><strong>ID Number:</strong> ${formData.client.idNumber}</div>
                      <div class="field"><strong>Current Address:</strong> ${formData.client.currentAddress}</div>
                      <div class="field"><strong>Permanent Address:</strong> ${formData.client.permanentAddress}</div>
                      <div class="field"><strong>Next of Kin:</strong> ${formData.client.nextOfKin}</div>
                      <div class="field"><strong>Form Signed:</strong> ${formData.client.signed ? 'Yes' : 'No'}</div>
                  </div>

                  ${formData.client.passportPhotoUrl ? `
                  <div class="passport-photo">
                      <h2>Passport Photo</h2>
                      <img src="${formData.client.passportPhotoUrl}" alt="Client Passport Photo">
                  </div>
                  ` : ''}

                  <div class="footer">
                      <p>This form was submitted on ${new Date().toLocaleDateString()} at ${new Date().toLocaleTimeString()}.</p>
                      <p>&copy; ${new Date().getFullYear()} Vineyard Properties. All rights reserved.</p>
                  </div>
              </div>
          </body>
          </html>
        `;

        // 2. Generate PDF Buffer
        const options: pdf.CreateOptions = { format: 'A4', orientation: 'portrait' };
        const pdfBuffer: Buffer = await new Promise((resolve, reject) => {
          pdf.create(htmlContent, options).toBuffer((err, buffer) => {
            if (err) return reject(err);
            resolve(buffer);
          });
        });

        // 3. Upload PDF to Firebase Storage
        const bucket = admin.storage().bucket();
        const filePath = `forms/${formId}/sales_form_${formId}.pdf`;
        const file = bucket.file(filePath);

        await file.save(pdfBuffer, {
          metadata: {
            contentType: 'application/pdf',
          },
        });

        // 4. Get the public download URL
        const [pdfDownloadUrl] = await file.getSignedUrl({
          action: 'read',
          expires: '03-09-2491', // A very long expiry date
        });

        // 5. Update Firestore document with PDF URL and status
        await admin.firestore().collection('forms').doc(formId).update({
          'client.pdfDownloadUrl': pdfDownloadUrl,
          status: 'completed', // Mark as completed after PDF generation
        });
        functions.logger.info(`PDF generated and uploaded for form ${formId}. URL: ${pdfDownloadUrl}`);

        // 6. Send email to client
        const mailOptionsClient = {
          from: 'sales@vineyardproperties.co.ke', // <<< IMPORTANT: Replace with your verified sender email from Postmark
          to: clientEmail,
          subject: `Your VPL Sales Form Submission for ${formData.property.name}`,
          html: `
            <p>Dear ${clientFullName},</p>
            <p>Thank you for submitting your sales form for the property: <strong>${formData.property.name}</strong>.</p>
            <p>Your form has been successfully received and processed. You can download a copy of your submitted form here:</p>
            <p><a href="${pdfDownloadUrl}">Download Your Sales Form PDF</a></p>
            <p>We appreciate your business!</p>
            <p>Best regards,<br>The Vineyard Properties Team</p>
          `,
          attachments: [
            {
              filename: `VPL_Sales_Form_${formId}.pdf`,
              content: pdfBuffer.toString('base64'),
              contentType: 'application/pdf',
            },
          ],
          headers: { // Postmark specific header
            'X-PM-Message-Stream': 'outbound'
          }
        };
        await transporter.sendMail(mailOptionsClient);
        functions.logger.info(`Email sent to client ${clientEmail} for form ${formId}`);

        // 7. Send notification email to admin
        const mailOptionsAdmin = {
          from: 'noreply@yourcompany.com', // <<< IMPORTANT: Replace with your verified sender email from Postmark
          to: ADMIN_EMAIL,
          subject: `NEW SALES FORM SUBMISSION: ${formData.property.name} by ${clientFullName}`,
          html: `
            <p>A new sales form has been submitted:</p>
            <ul>
              <li><strong>Form ID:</strong> ${formData.formId}</li>
              <li><strong>Client Name:</strong> ${clientFullName}</li>
              <li><strong>Client Email:</strong> ${formData.client.email}</li>
              <li><strong>Property:</strong> ${formData.property.name} (Ksh ${formData.property.price})</li>
              <li><strong>Status:</strong> Completed</li>
            </ul>
            <p>You can view the form details and download the PDF here: <a href="${pdfDownloadUrl}">Download Sales Form PDF</a></p>
            <p>Or view the document in Firestore: <a href="https://console.firebase.google.com/project/${process.env.GCLOUD_PROJECT}/firestore/data/~2Fforms~2F${formId}">View in Firestore Console</a></p>
          `,
          attachments: [
            {
              filename: `VPL_Sales_Form_${formId}.pdf`,
              content: pdfBuffer.toString('base64'),
              contentType: 'application/pdf',
            },
          ],
          headers: { // Postmark specific header
            'X-PM-Message-Stream': 'outbound'
          }
        };
        await transporter.sendMail(mailOptionsAdmin);
        functions.logger.info(`Notification email sent to admin for form ${formId}`);

      } catch (error) {
        functions.logger.error(`Error processing form ${formId}:`, error);
        // Optionally, update Firestore status to 'failed' or log for manual review
        await admin.firestore().collection('forms').doc(formId).update({
          status: 'failed_pdf_email',
          errorMessage: (error as Error).message,
        });
      }
    } else {
      functions.logger.info(`Form ${formId} update not relevant for PDF/email generation (status: ${newData.status}, pdfUrl: ${newData.client?.pdfDownloadUrl})`);
    }
    return null;
  });
