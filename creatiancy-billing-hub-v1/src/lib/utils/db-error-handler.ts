/**
 * Centralized Supabase & PostgreSQL Error Handler
 * Translates low-level database constraint errors into clean, user-friendly messages.
 */

export interface FriendlyDatabaseError {
  userMessage: string;
  code?: string;
  details?: string;
}

export function handleDatabaseError(error: any, operationName: string): FriendlyDatabaseError {
  if (!error) {
    return { userMessage: 'An unknown database error occurred.' };
  }

  const code = error.code || error.status;
  const message = error.message || String(error);

  console.error(`[DB Error] Operation '${operationName}' failed (${code}):`, message, error);

  // PostgreSQL Error Code Mapping
  switch (code) {
    case '23503': // foreign_key_violation
      return {
        userMessage: 'A required parent record (Entity, Client, or Account Manager) is missing or no longer exists. Please refresh the page and select a valid record.',
        code,
        details: message
      };
    case '23505': // unique_violation
      return {
        userMessage: 'A record with this serial number, code, or identifier already exists in the system.',
        code,
        details: message
      };
    case '23502': // not_null_violation
      return {
        userMessage: 'One or more required fields were missing. Please complete all mandatory fields.',
        code,
        details: message
      };
    case '23514': // check_violation
      return {
        userMessage: 'The submitted record value violates system policy rules or boundaries.',
        code,
        details: message
      };
    case '22P02': // invalid_text_representation (invalid UUID syntax)
      return {
        userMessage: 'The submitted identifier format is invalid. Please select a valid record from the dropdown menu.',
        code,
        details: message
      };
    case '42501': // insufficient_privilege / RLS policy violation
      return {
        userMessage: 'You do not have permission to perform this action or access this organization record.',
        code,
        details: message
      };
    case 'PGRST116': // Single row result error
      return {
        userMessage: 'The requested record was not found.',
        code,
        details: message
      };
    default:
      return {
        userMessage: message.includes('Cloud') ? message : `Database operation failed: ${message}`,
        code,
        details: message
      };
  }
}
