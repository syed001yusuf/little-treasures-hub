/* ──────────────────────────────────────────────────────────
 * ADMIN AUTH (lightweight gate — NOT a security boundary)
 *
 * A single hard-coded credential pair. Hand these to one
 * trusted user. To rotate, change the values and redeploy.
 *
 * For production-grade auth, replace this module with a real
 * provider (Clerk/Supabase/Firebase) without changing the
 * AdminGate UI — only `verifyCredentials` and the session
 * helpers below need to change.
 * ────────────────────────────────────────────────────────── */

export const ADMIN_MOBILE = '8880008765';
export const ADMIN_PASSWORD = '8880008765';

const SESSION_KEY = 'admin_session_v1';

export function verifyCredentials(mobile: string, password: string): boolean {
  return mobile.trim() === ADMIN_MOBILE && password === ADMIN_PASSWORD;
}

export function startSession(): void {
  try {
    sessionStorage.setItem(SESSION_KEY, '1');
  } catch {
    /* sessionStorage unavailable (private mode etc.) — gate will simply re-prompt */
  }
}

export function endSession(): void {
  try {
    sessionStorage.removeItem(SESSION_KEY);
  } catch {
    /* noop */
  }
}

export function isAuthenticated(): boolean {
  try {
    return sessionStorage.getItem(SESSION_KEY) === '1';
  } catch {
    return false;
  }
}
