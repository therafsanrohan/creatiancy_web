import { NextRequest, NextResponse } from 'next/server';
import { getSanitizedPublicInvoice } from '@/lib/services/public-invoice-service';

export const dynamic = 'force-dynamic';

/**
 * Public Invoice Data API Endpoint
 * Exposes sanitized, tamper-proof invoice data for valid capability tokens / IDs.
 * Strips internal costs, margins, and private administrative notes.
 */
export async function GET(
  request: NextRequest,
  { params }: { params: Promise<{ token: string }> }
) {
  try {
    const { token } = await params;

    if (!token || typeof token !== 'string') {
      return NextResponse.json(
        { success: false, error: 'Token is required' },
        { status: 400 }
      );
    }

    const result = await getSanitizedPublicInvoice(token);

    const headers = {
      'Cache-Control': 'private, no-cache, no-store, max-age=0, must-revalidate',
      'X-Robots-Tag': 'noindex, nofollow, noarchive',
    };

    if (!result.success) {
      if (result.redirectTo) {
        return NextResponse.json(
          {
            success: false,
            error: 'REDIRECT',
            redirectTo: result.redirectTo,
            canonicalUrl: `/invoice/${result.redirectTo}`,
          },
          { status: 307, headers }
        );
      }

      return NextResponse.json(
        {
          success: false,
          error: result.error || 'UNAVAILABLE',
          message: 'The requested invoice is unavailable, expired, or non-public.',
        },
        { status: 404, headers }
      );
    }

    return NextResponse.json(
      {
        success: true,
        invoice: result.invoice,
      },
      { status: 200, headers }
    );
  } catch (error: any) {
    console.error('[PublicInvoiceAPI] Error fetching invoice:', error);
    return NextResponse.json(
      {
        success: false,
        error: 'INTERNAL_ERROR',
        message: 'An unexpected error occurred while fetching the invoice.',
      },
      {
        status: 500,
        headers: {
          'Cache-Control': 'no-store',
          'X-Robots-Tag': 'noindex, nofollow',
        },
      }
    );
  }
}
