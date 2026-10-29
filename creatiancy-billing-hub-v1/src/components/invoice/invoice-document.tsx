import { InvoiceDocumentViewModel } from './invoice-document.types';
import { QRCodeSVG } from 'qrcode.react';
import { Building2, ShieldCheck, CheckCircle2, Receipt } from 'lucide-react';

interface Props {
  document: InvoiceDocumentViewModel;
  showWatermark?: boolean;
}

export default function InvoiceDocument({ document: doc }: Props) {
  const isBdt = doc.currency === 'BDT';

  const formatMoney = (amount: number) => {
    if (isBdt) {
      return `৳${amount.toLocaleString('en-US', { minimumFractionDigits: 0, maximumFractionDigits: 2 })}`;
    }
    return `$${amount.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`;
  };

  const statusColor: Record<string, string> = {
    paid: 'bg-green-100 text-green-700 border-green-200',
    partially_paid: 'bg-amber-100 text-amber-700 border-amber-200',
    overdue: 'bg-red-100 text-red-700 border-red-200',
    sent: 'bg-blue-100 text-blue-700 border-blue-200',
    draft: 'bg-gray-100 text-gray-500 border-gray-200',
    void: 'bg-gray-100 text-gray-400 border-gray-200',
    approved: 'bg-purple-100 text-purple-700 border-purple-200',
  };

  return (
    <div
      id="print-area"
      className="w-full max-w-[210mm] bg-white shadow-lg border border-gray-100 p-6 sm:p-10 text-[#1E1E1E] flex flex-col justify-between font-sans relative select-none box-border mx-auto rounded-none"
      style={{ minHeight: '297mm' }}
    >
      {/* Draft Internal Watermark Overlay */}
      {doc.isDraft && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 -rotate-35 text-6xl sm:text-8xl font-black text-rose-500/10 uppercase tracking-widest pointer-events-none select-none z-0 border-8 border-rose-500/10 px-8 py-4 rounded-3xl">
          DRAFT
        </div>
      )}

      {/* Document Top */}
      <div>
        {/* Header block */}
        <div className="flex justify-between items-start pb-4 border-b border-gray-100">
          <div>
            {/* Creatiancy Logo */}
            <div className="flex items-center space-x-3">
              {/* eslint-disable-next-line @next/next/no-img-element */}
              <img
                src="/logos/Creatiancy%20logo.svg"
                alt="Creatiancy"
                className="h-7 sm:h-8 md:h-9 w-auto max-w-[200px] object-contain"
                onError={(e) => { (e.target as HTMLImageElement).src = '/logos/Creatiancy logo.svg'; }}
              />
            </div>

            {/* Entity address particulars */}
            <div className="mt-3 text-[10px] text-gray-500 space-y-0.5 leading-normal">
              <span className="font-bold text-gray-800 block">
                {doc.entity.name}
              </span>
              <span>
                {doc.entity.address || (isBdt ? 'House 12, Road 4, Banani, Dhaka 1213, Bangladesh' : '1619 Broadway, Suite 500, New York, NY 10019, USA')}
              </span>
              {doc.entity.registrationNumber && (
                <span className="block">
                  Registration: {doc.entity.registrationNumber}
                </span>
              )}
              {doc.entity.taxId && (
                <span className="block">
                  {isBdt ? 'TIN / BIN: ' : 'EIN: '}{doc.entity.taxId}
                </span>
              )}
              {doc.entity.email && <span className="block">Email: {doc.entity.email}</span>}
              {doc.entity.phone && <span className="block">Phone: {doc.entity.phone}</span>}
            </div>
          </div>

          {/* Invoice meta + status */}
          <div className="text-right flex flex-col items-end space-y-3">
            <div>
              <h2 className="text-2xl font-extrabold text-gray-300 tracking-widest uppercase">INVOICE</h2>
              {doc.status && (
                <span className={`mt-1 inline-block rounded-md border px-2 py-0.5 text-[9px] font-bold uppercase tracking-wider ${statusColor[doc.status] || 'bg-gray-100 text-gray-500 border-gray-200'}`}>
                  {doc.status.replace(/_/g, ' ')}
                </span>
              )}
            </div>
            
            <div className="space-y-1 text-xs text-gray-500">
              <div>
                <span className="text-[9px] text-gray-400 uppercase font-semibold block">Invoice Number</span>
                <span className="font-bold text-gray-800">{doc.isDraft ? 'DRAFT-PENDING' : doc.invoiceNumber}</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 uppercase font-semibold block">Issue Date</span>
                <span className="font-bold text-gray-800">{doc.issueDate}</span>
              </div>
              <div>
                <span className="text-[9px] text-gray-400 uppercase font-semibold block">Due Date</span>
                <span className="font-bold text-[#9B1C22]">{doc.dueDate}</span>
              </div>
            </div>
          </div>
        </div>

        {/* Billing particulars split */}
        <div className="grid grid-cols-2 gap-6 py-4 border-b border-gray-100 text-xs">
          <div>
            <span className="font-bold text-gray-400 uppercase tracking-wider block text-[9px] mb-1">BILL TO:</span>
            {doc.client ? (
              <div className="space-y-0.5 text-gray-600 leading-normal">
                <p className="font-bold text-gray-800 text-xs">{doc.client.companyName || doc.client.contactPerson}</p>
                {doc.client.companyName && <p className="font-semibold text-[11px]">{doc.client.contactPerson}</p>}
                <p className="text-[11px]">{doc.client.billingAddress}</p>
                <p className="text-[11px]">{doc.client.city}, {doc.client.country}</p>
                {doc.client.billingEmail && <p className="text-[11px]">Email: {doc.client.billingEmail}</p>}
                {doc.client.taxNumber && <p className="font-semibold text-[11px]">Tax/VAT ID: {doc.client.taxNumber}</p>}
              </div>
            ) : (
              <span className="text-gray-400 italic">No client profile mapped</span>
            )}
          </div>

          <div>
            <span className="font-bold text-gray-400 uppercase tracking-wider block text-[9px] mb-1">PROJECT INFORMATION:</span>
            <div className="space-y-0.5 text-gray-600">
              <p className="font-bold text-gray-800 text-xs">{doc.projectName}</p>
              {doc.servicePeriod && (
                <p className="text-[11px]">
                  <span className="font-semibold text-gray-400 block text-[9px] uppercase">Service Period</span>
                  <span className="font-semibold">{doc.servicePeriod}</span>
                </p>
              )}
              {doc.poNumber && <p className="text-[11px]">PO Number: <span className="font-semibold">{doc.poNumber}</span></p>}
              {doc.referenceNumber && <p className="text-[11px]">Reference: <span className="font-semibold">{doc.referenceNumber}</span></p>}
            </div>
          </div>
        </div>

        {/* Items table */}
        <div className="py-4">
          <table className="w-full text-left text-xs border-collapse table-fixed">
            <thead>
              <tr className="border-b border-gray-200 text-gray-400 font-bold uppercase tracking-wider text-[9px]">
                <th className="py-2 w-[48%] pr-2">Service Lines Description</th>
                <th className="py-2 text-right w-[14%] px-1">Quantity</th>
                <th className="py-2 text-right w-[19%] px-1">Rate</th>
                <th className="py-2 text-right w-[19%] pl-1">Amount</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-100 text-gray-700">
              {doc.items.map((itm, idx) => (
                <tr key={idx} className="align-top avoid-break">
                  <td className="py-2.5 pr-2 break-words">
                    <span className="font-bold text-gray-800 block text-xs">{itm.serviceName}</span>
                    {itm.description && <span className="text-[10px] text-gray-400 leading-tight block mt-0.5 whitespace-pre-line">{itm.description}</span>}
                  </td>
                  <td className="py-2.5 text-right whitespace-nowrap px-1 font-medium">{itm.quantity} {itm.unit}</td>
                  <td className="py-2.5 text-right whitespace-nowrap px-1 font-medium">{formatMoney(itm.rate)}</td>
                  <td className="py-2.5 text-right font-bold text-gray-800 whitespace-nowrap pl-1">{formatMoney(itm.amount)}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Document Bottom */}
      <div className="space-y-4 pt-3 border-t border-gray-150 avoid-break">
        {/* Totals Section (Right Aligned) */}
        <div className="flex justify-end avoid-break">
          <div className="w-full sm:w-72 space-y-1.5 text-xs text-gray-700 bg-gray-50/50 p-3 rounded-xl border border-gray-100">
            <div className="flex justify-between">
              <span className="text-gray-500 font-semibold">Subtotal:</span>
              <span className="font-bold">{formatMoney(doc.totals.subtotal)}</span>
            </div>
            
            {doc.totals.discountAmount > 0 && (
              <div className="flex justify-between text-[#9B1C22]">
                <span className="font-semibold">Discount Adjustment:</span>
                <span className="font-bold">-{formatMoney(doc.totals.discountAmount)}</span>
              </div>
            )}

            {isBdt && doc.totals.vatAmount > 0 ? (
              <div className="flex justify-between text-gray-500">
                <span className="font-semibold">
                  VAT ({doc.totals.vatRate || 0}% {doc.totals.vatInclusive ? 'Included' : 'Exclusive'}):
                </span>
                <span className="font-bold">{formatMoney(doc.totals.vatAmount)}</span>
              </div>
            ) : isBdt ? (
              <div className="flex justify-between text-gray-400">
                <span className="font-semibold">VAT Status:</span>
                <span className="font-bold text-emerald-700">Not Applied (0% Exempt)</span>
              </div>
            ) : null}

            <div className="flex justify-between border-t border-gray-200 pt-1.5 text-xs font-extrabold text-[#9B1C22]">
              <span>Total Payable:</span>
              <span>{formatMoney(doc.totals.totalPayable)}</span>
            </div>

            {doc.totals.amountPaid > 0 && (
              <div className="flex justify-between text-green-600 font-semibold text-[11px]">
                <span>Amount Paid:</span>
                <span>-{formatMoney(doc.totals.amountPaid)}</span>
              </div>
            )}

            <div className="flex justify-between border-t border-gray-200 pt-1.5 text-xs font-bold text-gray-900">
              <span>Amount Due:</span>
              <span>{formatMoney(doc.totals.amountDue)}</span>
            </div>
          </div>
        </div>

        {/* Full Width Bank Details & Payment Instructions Section OR Payment Confirmation Receipt if Paid */}
        {doc.status === 'paid' || doc.totals.amountDue <= 0 ? (
          <div className="border-t border-emerald-300 pt-3 space-y-3 avoid-break">
            <span className="font-extrabold text-[10px] uppercase tracking-wider text-emerald-700 block">
              OFFICIAL PAYMENT RECEIPT & SETTLEMENT RECORD
            </span>

            <div className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-r from-emerald-50/90 via-white to-emerald-50/50 p-4 shadow-xs">
              <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b border-emerald-200/60 pb-3">
                <div className="flex items-center space-x-2.5">
                  <div className="rounded-full bg-emerald-600 p-1.5 text-white shadow-xs">
                    <CheckCircle2 className="h-5 w-5" />
                  </div>
                  <div>
                    <div className="flex items-center space-x-2">
                      <span className="font-black text-gray-900 text-sm tracking-tight">Invoice Fully Paid</span>
                      <span className="text-[10px] font-black bg-emerald-600 text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                        PAID IN FULL
                      </span>
                    </div>
                    <p className="text-gray-500 text-xs">
                      Payment received and reconciled. No further balance is due on this invoice.
                    </p>
                  </div>
                </div>

                <div className="text-left sm:text-right">
                  <span className="text-[10px] font-semibold text-gray-400 block uppercase">Settled Amount</span>
                  <span className="text-base font-black text-emerald-800">{formatMoney(doc.totals.totalPayable)}</span>
                </div>
              </div>

              {/* Payment transactions history breakdown */}
              {doc.payments && doc.payments.length > 0 ? (
                <div className="mt-3 space-y-2">
                  <span className="text-[10px] font-extrabold uppercase text-gray-500 tracking-wider flex items-center space-x-1">
                    <Receipt className="h-3 w-3 text-emerald-600" />
                    <span>Payment Transaction Records</span>
                  </span>
                  <div className="divide-y divide-gray-150 rounded-xl bg-white border border-gray-200/80 overflow-hidden text-xs">
                    {doc.payments.map((p, idx) => (
                      <div key={idx} className="p-2.5 flex flex-col sm:flex-row sm:items-center justify-between gap-1.5 bg-gray-50/40">
                        <div className="space-y-0.5">
                          <div className="flex items-center space-x-2">
                            <span className="font-bold text-gray-900">
                              {p.paymentMethod ? p.paymentMethod.replace(/_/g, ' ').toUpperCase() : 'DIRECT PAYMENT'}
                            </span>
                            {p.receiptNumber && (
                              <span className="font-mono text-[10px] bg-gray-200 text-gray-700 px-1.5 py-0.5 rounded font-semibold">
                                Receipt #{p.receiptNumber}
                              </span>
                            )}
                          </div>
                          {p.transactionReference && (
                            <p className="text-[11px] text-gray-500 font-mono">
                              Trx Ref: <span className="font-bold text-gray-800">{p.transactionReference}</span>
                            </p>
                          )}
                        </div>

                        <div className="flex items-center justify-between sm:justify-end sm:space-x-4">
                          {p.paymentDate && (
                            <span className="text-[11px] text-gray-500 font-medium">
                              {new Date(p.paymentDate).toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric' })}
                            </span>
                          )}
                          <span className="font-black text-emerald-700 text-sm">
                            +{formatMoney(p.amount)}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              ) : (
                <div className="mt-2 text-xs text-gray-600 italic">
                  Payment confirmed in full via recorded transaction. Thank you for your partnership!
                </div>
              )}
            </div>
          </div>
        ) : (
          <div className="border-t border-gray-200 pt-3 space-y-3 avoid-break">
            <span className="font-extrabold text-[10px] uppercase tracking-wider text-gray-400 block">
              PAYMENT & REMITTANCE INSTRUCTIONS
            </span>
            
            {/* Row 1: Bank Details & Mobile Wallets (2 columns on md+, stacked on mobile) */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-3 text-xs">
            {/* Bank Account Box */}
            {doc.bankAccount ? (
              <div className="rounded-xl bg-gray-50 p-3 border border-gray-200/70 space-y-1 text-gray-700">
                <div className="flex items-center space-x-1.5 text-[#9B1C22] font-bold text-xs mb-0.5">
                  <Building2 className="h-3.5 w-3.5" />
                  <span>{doc.bankAccount.bankName}</span>
                </div>
                <p className="text-[11px]"><span className="font-semibold text-gray-500">Account Holder:</span> <strong className="text-gray-900">{doc.bankAccount.accountHolder}</strong></p>
                <p className="text-[11px]"><span className="font-semibold text-gray-500">Account Number:</span> <strong className="font-mono text-gray-900">{doc.bankAccount.accountNumber}</strong></p>
                {doc.bankAccount.branch && <p className="text-[11px]"><span className="font-semibold text-gray-500">Branch Name:</span> <span className="text-gray-800">{doc.bankAccount.branch}</span></p>}
                {doc.bankAccount.routingNumber && <p className="text-[11px]"><span className="font-semibold text-gray-500">Routing Code:</span> <span className="font-mono text-gray-800">{doc.bankAccount.routingNumber}</span></p>}
                {doc.bankAccount.swiftBic && <p className="text-[11px]"><span className="font-semibold text-gray-500">SWIFT / BIC:</span> <span className="font-mono text-gray-800">{doc.bankAccount.swiftBic}</span></p>}
              </div>
            ) : (
              <p className="text-gray-400 italic text-xs">No bank account details specified.</p>
            )}

            {/* Mobile Wallets & Notes Box */}
            <div className="space-y-2">
              {isBdt && (doc.entity.bkashMerchant || doc.entity.nagadMerchant) && (
                <div className="rounded-xl border border-gray-200/70 bg-gray-50 p-3 space-y-1.5">
                  <p className="font-bold text-[10px] text-gray-500 uppercase tracking-wider">Mobile Wallet (Merchant Payment)</p>
                  <div className="grid grid-cols-2 gap-2 text-xs">
                    {doc.entity.bkashMerchant && (
                      <div className="rounded-lg bg-white p-2 border border-gray-200/80">
                        <span className="text-[9px] font-bold text-pink-600 block uppercase">bKash Merchant</span>
                        <span className="font-mono font-extrabold text-gray-900 text-xs">{doc.entity.bkashMerchant}</span>
                      </div>
                    )}
                    {doc.entity.nagadMerchant && (
                      <div className="rounded-lg bg-white p-2 border border-gray-200/80">
                        <span className="text-[9px] font-bold text-orange-600 block uppercase">Nagad Merchant</span>
                        <span className="font-mono font-extrabold text-gray-900 text-xs">{doc.entity.nagadMerchant}</span>
                      </div>
                    )}
                  </div>
                </div>
              )}

              {doc.paymentInstructions && (
                <div className="rounded-xl bg-gray-50 p-2.5 border border-gray-200/70 text-[11px] text-gray-700 leading-relaxed italic">
                  {doc.paymentInstructions}
                </div>
              )}
            </div>
          </div>

          {/* Row 2: Bangla QR (Dedicated Full Width Row - Large Scan Code for instant scanning) */}
          {isBdt && (doc.entity.code === 'CLTD' || doc.entity.name?.toLowerCase().includes('creatiancy limited')) && (
            <div className="rounded-2xl border-2 border-emerald-500/40 bg-gradient-to-r from-emerald-50/80 via-white to-emerald-50/40 p-3 sm:p-4 flex flex-col sm:flex-row items-center justify-between gap-4 shadow-xs">
              <div className="flex flex-col sm:flex-row items-center gap-4 text-center sm:text-left w-full sm:w-auto">
                {/* Massive High-Res QR Code (Direct scan, zero wasted margin) */}
                <div className="relative rounded-2xl bg-white p-2 border-2 border-emerald-400 shadow-md shrink-0">
                  {/* eslint-disable-next-line @next/next/no-img-element */}
                  <img
                    src="/logos/QR/bkashBanglaQR.svg"
                    alt="Bangla QR Code - Scan to Pay"
                    width={150}
                    height={150}
                    className="w-36 h-36 sm:w-40 sm:h-40 rounded-xl object-contain block"
                  />
                </div>
                <div className="space-y-1.5 max-w-sm">
                  <div className="flex items-center justify-center sm:justify-start space-x-2">
                    <span className="font-black text-gray-900 text-base sm:text-lg tracking-tight">Bangla QR</span>
                    <span className="text-[10px] font-black bg-[#9B1C22] text-white px-2.5 py-0.5 rounded-full uppercase tracking-wider shadow-2xs">
                      Easy Pay
                    </span>
                  </div>
                  <p className="text-sm font-bold text-emerald-800">
                    Scan for Easy Pay
                  </p>
                  <p className="text-gray-600 text-xs leading-relaxed">
                    Open your <strong>bKash</strong>, <strong>Nagad</strong>, or any <strong>Bangla QR</strong> supported banking app and scan this code to pay directly from mobile or printed copy.
                  </p>
                </div>
              </div>
              <div className="shrink-0 flex flex-col items-center justify-center pt-2 sm:pt-0 sm:pl-4 border-t sm:border-t-0 sm:border-l border-emerald-200">
                {/* eslint-disable-next-line @next/next/no-img-element */}
                <img
                  src="/logos/QR/Bangla_QR_Logo.svg"
                  alt="Bangla QR Official Logo"
                  width={56}
                  height={68}
                  className="w-14 h-16 object-contain"
                />
                <span className="text-[9px] font-extrabold text-gray-600 mt-1 uppercase tracking-tight">Bangladesh Bank</span>
              </div>
            </div>
          )}
        </div>
      )}

        {/* QR Verification Badge */}
          {doc.verificationUrl && !doc.isDraft && (
            <div className="mt-2 flex items-center justify-between rounded-xl border border-[#9B1C22]/20 bg-[#9B1C22]/5 p-2.5 avoid-break">
              <div className="flex items-center space-x-2.5">
                <QRCodeSVG
                  value={doc.verificationUrl}
                  size={48}
                  bgColor="#ffffff"
                  fgColor="#9B1C22"
                  level="H"
                  marginSize={1}
                />
                <div>
                  <div className="flex items-center space-x-1">
                    <ShieldCheck className="h-3.5 w-3.5 text-[#9B1C22]" />
                    <span className="font-extrabold text-[#9B1C22] text-[11px] uppercase tracking-wider">Creatiancy Authenticity Verified</span>
                  </div>
                  <p className="text-gray-600 text-[9px] leading-tight mt-0.5">
                    Scan QR code to verify digital signature on official portal.
                  </p>
                </div>
              </div>
              <div className="hidden sm:block text-right">
                <span className="text-[9px] font-bold uppercase text-[#9B1C22] bg-white border border-[#9B1C22]/20 px-2 py-0.5 rounded shadow-2xs">
                  Creatiancy
                </span>
              </div>
            </div>
          )}

        {/* Legal footer */}
        <div className="mt-4 pt-2 border-t border-gray-200 text-[9px] text-gray-500 text-center leading-normal space-y-0.5 avoid-break">
          <p className="font-bold text-[#9B1C22] tracking-wide">
            {doc.entity.name}
          </p>
          <p className="text-gray-500 text-[8px]">
            {isBdt
              ? 'All rates are inclusive of applicable VAT in accordance with the prevailing laws and regulations of Bangladesh.'
              : 'All rates are inclusive of applicable taxes in accordance with the prevailing laws and regulations.'}
          </p>
          <div className="pt-1 border-t border-dashed border-gray-200 text-[8px] font-semibold text-gray-400">
            Creatiancy Document • Computer-generated • No physical signature required.
          </div>
        </div>
      </div>
    </div>
  );
}
