'use client';
import { useState, useEffect } from 'react';
import { GoogleAuthProvider, signInWithPopup, signInWithRedirect, getRedirectResult, getAuth } from 'firebase/auth';
import { auth } from '@/firebase';
import { useRouter } from 'next/navigation';

export default function FirebaseSignIn() {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');
  const [useRedirect, setUseRedirect] = useState(false);
  const router = useRouter();

  useEffect(() => {
    // Check if user is already signed in
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        // User is already signed in, redirect to home
        router.push('/');
      }
    });

    // Check for redirect result on component mount
    getRedirectResult(auth).then((result) => {
      if (result && result.user) {
        console.log('Successfully signed in via redirect:', result.user);
        router.push('/');
      }
    }).catch((error) => {
      console.error('Redirect sign-in error:', error);
      if (error.code !== 'auth/no-pending-credential') {
        setError(error.message);
      }
    });

    return () => unsubscribe();
  }, [router]);

  const handleGoogleSignIn = async () => {
    // Prevent multiple simultaneous sign-in attempts
    if (loading) {
      return;
    }
    
    setLoading(true);
    setError('');
    
    try {
      const provider = new GoogleAuthProvider();
      // Force account selection and prompt for consent
      provider.setCustomParameters({
        prompt: 'select_account', // Forces account selection
        access_type: 'offline',    // Requests offline access
        include_granted_scopes: 'true' // Include previously granted scopes
      });
      
      if (useRedirect) {
        // Use redirect method as fallback
        await signInWithRedirect(auth, provider);
      } else {
        // Use popup for better control
        const result = await signInWithPopup(auth, provider);
        
        if (result.user) {
          console.log('Successfully signed in:', result.user);
          // Redirect to home page after successful sign-in
          router.push('/');
        }
      }
    } catch (err) {
      console.error('Sign-in error:', err);
      
      // Handle specific Firebase auth errors
      if (err.code === 'auth/cancelled-popup-request' || 
          err.code === 'auth/popup-closed-by-user') {
        // User cancelled the popup - don't show error message
        console.log('Popup was cancelled by user');
        setError('');
      } else if (err.code === 'auth/popup-blocked') {
        setError('Popup was blocked by your browser. Please allow popups for this site.');
      } else if (err.code === 'auth/unauthorized-domain') {
        setError('This domain is not authorized for Firebase authentication.');
      } else {
        setError(err.message || 'An error occurred during sign-in.');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold mb-6">Sign In with Firebase</h1>
        
        <div className="space-y-4 w-full max-w-sm">
          <div className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <label className="text-sm font-medium text-gray-700">Sign-in Method:</label>
            <button
              onClick={() => setUseRedirect(!useRedirect)}
              className="text-sm px-3 py-1 bg-blue-100 text-blue-700 rounded hover:bg-blue-200 transition-colors"
            >
              {useRedirect ? 'Redirect' : 'Popup'}
            </button>
          </div>
          
          <button
            onClick={handleGoogleSignIn}
            disabled={loading}
            className="w-full px-4 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 disabled:bg-gray-400 transition-colors flex items-center justify-center gap-2"
          >
            <svg className="w-5 h-5" viewBox="0 0 24 24">
              <path fill="currentColor" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="currentColor" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12z"/>
              <path fill="currentColor" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.07H2.18C1.43 8.55 1 10.22 1s.43 3.45 1.18 4.93l2.85-2.22.81-.62z"/>
              <path fill="currentColor" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.07l2.66 2.84c.87-2.6 3.3-4.53 6.16-4.53z"/>
            </svg>
            {loading ? 'Signing in...' : `Sign in with Google (${useRedirect ? 'Redirect' : 'Popup'})`}
          </button>
          
          {error && (
            <div className="p-3 bg-red-50 border border-red-200 rounded-lg">
              <p className="text-red-800 text-sm">{error}</p>
            </div>
          )}
        </div>

        <p className="mt-4 text-sm text-gray-600">
          Sign in with your Google account using Firebase authentication.
        </p>

        <div className="mt-4 text-center">
          <a 
            href="/" 
            className="text-blue-600 hover:text-blue-800 text-sm underline"
          >
            Back to Home
          </a>
        </div>
      </main>
    </div>
  );
}
