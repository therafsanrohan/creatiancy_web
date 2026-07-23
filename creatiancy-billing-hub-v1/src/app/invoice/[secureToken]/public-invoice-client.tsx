'use client';

import { PublicInvoiceViewModel } from '@/lib/services/public-invoice-service';
import { getCanonicalPublicInvoiceUrl } from '@/lib/security/public-invoice-token';
import { Printer, Download, ShieldCheck, Building2 } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';

interface Props {
  invoice: PublicInvoiceViewModel;
}

export default function PublicInvoiceViewClient({ invoice }: Props) {
  const canonicalUrl = getCanonicalPublicInvoiceUrl(invoice.canonicalToken);
  const isBdt = invoice.currency === 'BDT';

  const handlePrint = () => {
    window.print();
  };

  const handleDownloadPdf = () => {
    window.open(`/api/public/invoices/${invoice.canonicalToken}/pdf`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gray-100 py-8 px-4 sm:px-6 lg:px-8">
      {/* Top Action Header Bar (No Print) */}
      <div className="max-w-4xl mx-auto mb-6 flex flex-col sm:flex-row items-center justify-between gap-4 no-print bg-white p-4 rounded-xl shadow-sm border border-gray-200">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-[#9B1C22]/10 text-[#9B1C22]">
            <ShieldCheck className="h-6 w-6" />
          </div>
          <div>
            <h2 className="text-sm font-bold text-gray-900">Official Client Document</h2>
            <p className="text-xs text-gray-500">Verified Secure Capability Link</p>
          </div>
        </div>

        <div className="flex items-center space-x-3 w-full sm:w-auto">
          <button
            type="button"
            onClick={handlePrint}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 rounded-lg border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 shadow-sm transition"
          >
            <Printer className="h-4 w-4 text-gray-500" />
            <span>Print Invoice</span>
          </button>
          <button
            type="button"
            onClick={handleDownloadPdf}
            className="flex-1 sm:flex-initial inline-flex items-center justify-center space-x-2 rounded-lg bg-[#9B1C22] px-4 py-2 text-sm font-medium text-white hover:bg-[#80171C] shadow-sm transition"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </button>
        </div>
      </div>

      {/* Main Printable Document Card */}
      <div className="max-w-4xl mx-auto bg-white rounded-xl shadow-lg border border-gray-200 p-8 sm:p-12 printable-area">
        {/* Document Header */}
        <div className="flex flex-col sm:flex-row justify-between items-start border-b-2 border-[#9B1C22] pb-6 mb-8 gap-6">
          <div>
            <div className="flex items-center space-x-2">
              <Building2 className="h-7 w-7 text-[#9B1C22]" />
              <span className="text-2xl font-extrabold tracking-tight text-gray-900">{invoice.entity.name}</span>
            </div>
            <p className="text-xs text-gray-500 mt-1 max-w-sm whitespace-pre-line">{invoice.entity.address}</p>
            {invoice.entity.taxId && (
              <p className="text-xs font-semibold text-gray-600 mt-1">Tax ID: {invoice.entity.taxId}</p>
            )}
          </div>

          <div className="sm:text-right">
            <h1 className="text-3xl font-black text-gray-900 tracking-tight">INVOICE</h1>
            <p className="text-lg font-bold text-[#9B1C22] mt-1">{invoice.invoiceNumber}</p>
            <div className="text-xs text-gray-500 mt-2 space-y-0.5">
              <p><span className="font-semibold text-gray-700">Issue Date:</span> {invoice.issueDate}</p>
              <p><span className="font-semibold text-gray-700">Due Date:</span> {invoice.dueDate}</p>
            </div>
          </div>
        </div>

        {/* Billed To & Project Details */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Billed To</h3>
            <p className="text-base font-bold text-gray-900">{invoice.client.companyName}</p>
            <p className="text-sm text-gray-700 font-medium mt-0.5">Attn: {invoice.client.contactPerson}</p>
            <p className="text-xs text-gray-600 mt-2 whitespace-pre-line">{invoice.client.billingAddress}</p>
            <p className="text-xs text-gray-600">{invoice.client.city}, {invoice.client.country}</p>
            {invoice.client.taxNumber && (
              <p className="text-xs font-semibold text-gray-600 mt-2">VAT / BIN / Tax ID: {invoice.client.taxNumber}</p>
            )}
          </div>

          <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
            <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Project & Reference</h3>
            <p className="text-base font-bold text-gray-900">{invoice.projectName}</p>
            {invoice.servicePeriod && (
              <p className="text-xs text-gray-600 mt-1"><span className="font-semibold">Service Period:</span> {invoice.servicePeriod}</p>
            )}
            {invoice.poNumber && (
              <p className="text-xs text-gray-600 mt-0.5"><span className="font-semibold">PO Number:</span> {invoice.poNumber}</p>
            )}
            {invoice.referenceNumber && (
              <p className="text-xs text-gray-600 mt-0.5"><span className="font-semibold">Reference:</span> {invoice.referenceNumber}</p>
            )}
          </div>
        </div>

        {/* Line Items Table */}
        <div className="overflow-x-auto mb-8">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="border-b-2 border-gray-200 bg-gray-50 text-xs font-bold text-gray-600 uppercase">
                <th className="py-3 px-4">Item & Description</th>
                <th className="py-3 px-4 text-right">Qty</th>
                <th className="py-3 px-4 text-right">Rate ({invoice.currency})</th>
                <th className="py-3 px-4 text-right">Amount ({invoice.currency})</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 text-sm">
              {invoice.items.map((item, idx) => (
                <tr key={idx} className="hover:bg-gray-50/50">
                  <td className="py-3.5 px-4">
                    <p className="font-bold text-gray-900">{item.serviceName}</p>
                    {item.description && <p className="text-xs text-gray-500 mt-0.5">{item.description}</p>}
                  </td>
                  <td className="py-3.5 px-4 text-right text-gray-700">{item.quantity} {item.unit}</td>
                  <td className="py-3.5 px-4 text-right text-gray-700">
                    {isBdt ? `৳${item.rate.toLocaleString()}` : `$${item.rate.toFixed(2)}`}
                  </td>
                  <td className="py-3.5 px-4 text-right font-bold text-gray-900">
                    {isBdt ? `৳${item.amount.toLocaleString()}` : `$${item.amount.toFixed(2)}`}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Totals & Remittance Bank Section */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
          {/* Remittance Bank Details */}
          <div>
            {invoice.bankAccount ? (
              <div className="bg-gray-50 p-5 rounded-lg border border-gray-200">
                <h3 className="text-xs font-bold text-gray-500 uppercase tracking-wider mb-2">Remittance Bank Details</h3>
                <p className="text-sm font-bold text-gray-900">{invoice.bankAccount.bankName}</p>
                <p className="text-xs text-gray-700 font-medium">Branch: {invoice.bankAccount.branch}</p>
                <p className="text-xs text-gray-700 mt-1"><span className="font-semibold">A/C Name:</span> {invoice.bankAccount.accountHolder}</p>
                <p className="text-xs text-gray-700 font-mono font-bold"><span className="font-semibold font-sans">A/C No:</span> {invoice.bankAccount.accountNumber}</p>
                {invoice.bankAccount.routingNumber && (
                  <p className="text-xs text-gray-600"><span className="font-semibold">Routing No:</span> {invoice.bankAccount.routingNumber}</p>
                )}
                {invoice.bankAccount.swiftBic && (
                  <p className="text-xs text-gray-600"><span className="font-semibold">SWIFT/BIC:</span> {invoice.bankAccount.swiftBic}</p>
                )}
              </div>
            ) : (
              <div className="text-xs text-gray-500 italic">Please contact your account manager for payment instructions.</div>
            )}
          </div>

          {/* Totals Summary */}
          <div className="space-y-2 text-sm bg-gray-50 p-5 rounded-lg border border-gray-200">
            <div className="flex justify-between text-gray-600">
              <span>Subtotal:</span>
              <span className="font-semibold">{isBdt ? `৳${invoice.totals.subtotal.toLocaleString()}` : `$${invoice.totals.subtotal.toFixed(2)}`}</span>
            </div>

            {invoice.totals.discountAmount > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>Discount:</span>
                <span className="font-semibold text-green-600">-{isBdt ? `৳${invoice.totals.discountAmount.toLocaleString()}` : `$${invoice.totals.discountAmount.toFixed(2)}`}</span>
              </div>
            )}

            {invoice.totals.vatAmount > 0 && (
              <div className="flex justify-between text-gray-600">
                <span>VAT / Tax:</span>
                <span className="font-semibold">+{isBdt ? `৳${invoice.totals.vatAmount.toLocaleString()}` : `$${invoice.totals.vatAmount.toFixed(2)}`}</span>
              </div>
            )}

            <div className="flex justify-between text-lg font-black text-[#9B1C22] border-t-2 border-[#9B1C22] pt-2 mt-2">
              <span>Total Payable:</span>
              <span>{isBdt ? `৳${invoice.totals.totalPayable.toLocaleString()}` : `$${invoice.totals.totalPayable.toFixed(2)}`}</span>
            </div>

            {invoice.totals.amountPaid > 0 && (
              <>
                <div className="flex justify-between text-green-700 font-semibold pt-1">
                  <span>Amount Paid:</span>
                  <span>-{isBdt ? `৳${invoice.totals.amountPaid.toLocaleString()}` : `$${invoice.totals.amountPaid.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between text-base font-bold text-red-700 border-t border-gray-300 pt-1">
                  <span>Balance Due:</span>
                  <span>{isBdt ? `৳${invoice.totals.amountDue.toLocaleString()}` : `$${invoice.totals.amountDue.toFixed(2)}`}</span>
                </div>
              </>
            )}
          </div>
        </div>

        {/* Footer & QR Verification */}
        <div className="border-t border-gray-200 pt-6 mt-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div>
            <p className="text-xs font-bold text-gray-700">Official Computer-Generated Document</p>
            <p className="text-xs text-gray-500 mt-0.5">Issued by {invoice.entity.name} • {invoice.entity.code}</p>
            {invoice.paymentInstructions && (
              <p className="text-xs text-gray-600 mt-2"><span className="font-semibold">Instructions:</span> {invoice.paymentInstructions}</p>
            )}
          </div>

          <div className="flex items-center space-x-3 bg-gray-50 p-3 rounded-lg border border-gray-200">
            <QRCodeSVG value={canonicalUrl} size={64} level="M" />
            <div className="text-[10px] text-gray-500 max-w-[120px]">
              <p className="font-bold text-gray-700">Scan to Verify</p>
              <p className="truncate">Digital Integrity Secured</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
