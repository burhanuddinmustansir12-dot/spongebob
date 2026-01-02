import { auth } from '@/firebase';
import { GoogleAuthProvider } from 'firebase/auth';

export async function POST(request) {
  try {
    const { idToken } = await request.json();
    
    if (!idToken) {
      return Response.json({ error: 'Missing ID token' }, { status: 400 });
    }

    // Create a credential from the Google ID token
    const credential = GoogleAuthProvider.credential(idToken);
    
    return Response.json({ 
      success: true,
      message: 'Authentication endpoint is working',
      tokenReceived: !!idToken
    });
  } catch (error) {
    console.error('Firebase auth error:', error);
    return Response.json({ 
      success: false,
      error: error.message 
    });
  }
}

export async function GET(request) {
  try {
    return Response.json({ 
      success: true,
      message: 'Firebase auth endpoint is ready'
    });
  } catch (error) {
    return Response.json({ 
      success: false,
      error: error.message 
    });
  }
}
