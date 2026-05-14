import { useState, type FormEvent } from 'react';
import { Lock, Phone } from 'lucide-react';

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { startSession, verifyCredentials } from '@/lib/admin-auth';

interface AdminGateProps {
  onSuccess: () => void;
}

export function AdminGate({ onSuccess }: AdminGateProps) {
  const [mobile, setMobile] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState<string | null>(null);
  const [submitting, setSubmitting] = useState(false);

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    if (verifyCredentials(mobile, password)) {
      startSession();
      onSuccess();
    } else {
      setError('Invalid mobile number or password.');
    }
    setSubmitting(false);
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-50 via-rose-50 to-amber-50 px-4">
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-xl p-8 space-y-6 border border-rose-100"
      >
        <header className="text-center space-y-1">
          <div className="mx-auto h-12 w-12 rounded-full bg-rose-100 flex items-center justify-center">
            <Lock className="h-6 w-6 text-rose-600" />
          </div>
          <h1 className="text-2xl font-bold text-rose-900">Admin Login</h1>
          <p className="text-sm text-muted-foreground">Restricted area. Authorised users only.</p>
        </header>

        <div className="space-y-2">
          <Label htmlFor="mobile">Mobile number</Label>
          <div className="relative">
            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-muted-foreground" />
            <Input
              id="mobile"
              type="tel"
              autoComplete="username"
              inputMode="numeric"
              placeholder="10-digit mobile"
              value={mobile}
              onChange={e => setMobile(e.target.value)}
              className="pl-9"
              required
            />
          </div>
        </div>

        <div className="space-y-2">
          <Label htmlFor="password">Password</Label>
          <Input
            id="password"
            type="password"
            autoComplete="current-password"
            placeholder="••••••••"
            value={password}
            onChange={e => setPassword(e.target.value)}
            required
          />
        </div>

        {error && (
          <p className="text-sm text-red-600 bg-red-50 border border-red-200 rounded-md px-3 py-2">{error}</p>
        )}

        <Button type="submit" className="w-full bg-rose-600 hover:bg-rose-700" disabled={submitting}>
          {submitting ? 'Signing in…' : 'Sign in'}
        </Button>
      </form>
    </div>
  );
}
