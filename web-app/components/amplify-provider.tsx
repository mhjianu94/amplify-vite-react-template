'use client';

import { Amplify } from 'aws-amplify';
import outputs from '../public/amplify_outputs.json';
import { useEffect } from 'react';

// Configure Amplify on the client side
if (typeof window !== 'undefined') {
  Amplify.configure(outputs, { ssr: true });
}

export function AmplifyProvider({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Ensure Amplify is configured
    if (typeof window !== 'undefined') {
      Amplify.configure(outputs, { ssr: true });
    }
  }, []);

  return <>{children}</>;
}

