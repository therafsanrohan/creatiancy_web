/**
 * Helper to generate status-aware communication messages for Email, SMS, and WhatsApp.
 */

export interface MessageTemplateData {
  clientName: string;
  projectName: string;
  invoiceNumber: string;
  status: string;
  currency: 'BDT' | 'USD' | string;
  totalPayable: number;
  amountPaid: number;
  amountDue: number;
  dueDate: string;
  publicUrl: string;
  entityName: string;
}

export function formatCurrencyDisplay(amount: number, currency: string = 'BDT'): string {
  const symbol = currency === 'USD' ? '$' : '৳';
  return `${symbol}${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
}

export function generateInvoiceMessage(data: MessageTemplateData) {
  const {
    clientName,
    projectName,
    invoiceNumber,
    status,
    currency,
    totalPayable,
    amountPaid,
    amountDue,
    dueDate,
    publicUrl,
    entityName,
  } = data;

  const totalStr = formatCurrencyDisplay(totalPayable, currency);
  const paidStr = formatCurrencyDisplay(amountPaid, currency);
  const dueStr = formatCurrencyDisplay(amountDue, currency);

  switch (status) {
    case 'paid': {
      return {
        emailSubject: `Receipt & Paid Confirmation: Invoice ${invoiceNumber} - ${entityName}`,
        emailBody: `Dear ${clientName},

We are pleased to confirm receipt of your payment in full for invoice ${invoiceNumber} (${projectName}).

• Invoice Number: ${invoiceNumber}
• Status: PAID IN FULL
• Total Paid: ${totalStr}

You can view and download your official digital receipt anytime using this secure link:
${publicUrl}

Thank you for your business and partnership!

Warm regards,
${entityName}`,
        
        whatsApp: `Hello ${clientName},

✅ *Payment Received & Confirmed*
Invoice: *${invoiceNumber}* (${projectName})
Status: *PAID IN FULL*
Total Paid: *${totalStr}*

📄 *Official Digital Receipt & Invoice:*
${publicUrl}

Thank you for choosing ${entityName}!`,

        sms: `Dear ${clientName}, payment of ${totalStr} for invoice ${invoiceNumber} is confirmed. Status: PAID. View receipt: ${publicUrl} - ${entityName}`,
      };
    }

    case 'partially_paid': {
      return {
        emailSubject: `Payment Received (Partial): Invoice ${invoiceNumber} - ${entityName}`,
        emailBody: `Dear ${clientName},

Thank you for your recent payment towards invoice ${invoiceNumber} (${projectName}).

• Invoice Number: ${invoiceNumber}
• Total Amount: ${totalStr}
• Total Paid So Far: ${paidStr}
• Remaining Balance Due: ${dueStr}
• Due Date: ${dueDate}

Please review your updated invoice and payment history here:
${publicUrl}

Thank you,
${entityName}`,

        whatsApp: `Hello ${clientName},

💳 *Payment Received (Partial)*
Invoice: *${invoiceNumber}* (${projectName})
Amount Paid: *${paidStr}*
⚠️ Remaining Balance: *${dueStr}*
Due Date: *${dueDate}*

🔗 *View Updated Invoice & Settle Balance:*
${publicUrl}

Thank you,
${entityName}`,

        sms: `Dear ${clientName}, received ${paidStr} for inv ${invoiceNumber}. Remaining due: ${dueStr} (Due: ${dueDate}). Pay online: ${publicUrl} - ${entityName}`,
      };
    }

    case 'overdue': {
      return {
        emailSubject: `URGENT / OVERDUE REMINDER: Invoice ${invoiceNumber} - ${entityName}`,
        emailBody: `Dear ${clientName},

This is an urgent reminder that payment for invoice ${invoiceNumber} (${projectName}) is currently OVERDUE. The scheduled due date was ${dueDate}.

• Invoice Number: ${invoiceNumber}
• Overdue Balance: ${dueStr}
• Original Due Date: ${dueDate}

Please review and process the settlement via our secure payment portal:
${publicUrl}

If you have already processed this transaction, kindly reply with the transaction reference so we can reconcile it promptly.

Sincerely,
${entityName}`,

        whatsApp: `Hello ${clientName},

⚠️ *Overdue Payment Reminder*
Invoice *${invoiceNumber}* for *${projectName}* is currently overdue since *${dueDate}*.

• Outstanding Amount: *${dueStr}*
• Status: *OVERDUE*

🔗 *Review & Settle Online Now:*
${publicUrl}

If payment has already been made, please share the transaction slip/reference.

Thank you,
${entityName}`,

        sms: `REMINDER: Invoice ${invoiceNumber} is OVERDUE since ${dueDate}. Outstanding amount: ${dueStr}. Please pay via: ${publicUrl} - ${entityName}`,
      };
    }

    default: {
      // approved, sent, viewed
      return {
        emailSubject: `Official Invoice ${invoiceNumber} for ${projectName} - ${entityName}`,
        emailBody: `Dear ${clientName},

Please find the official digital invoice ${invoiceNumber} for ${projectName}.

• Invoice Number: ${invoiceNumber}
• Total Payable: ${totalStr}
• Payment Due Date: ${dueDate}

You can view details, download the PDF, and make payments online via our secure capability link:
${publicUrl}

Thank you for your business!

Best regards,
${entityName}`,

        whatsApp: `Hello ${clientName},

📄 *Official Invoice ${invoiceNumber}*
Project: *${projectName}*
Total Payable: *${totalStr}*
Due Date: *${dueDate}*

🔗 *View & Pay Online:*
${publicUrl}

Thank you,
${entityName}`,

        sms: `Dear ${clientName}, invoice ${invoiceNumber} (${totalStr}) for ${projectName} is ready. Due: ${dueDate}. View & pay: ${publicUrl} - ${entityName}`,
      };
    }
  }
}
