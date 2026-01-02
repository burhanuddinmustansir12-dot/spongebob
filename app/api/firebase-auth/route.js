import { auth } from '@/firebase';
import { signInWithCredential } from 'firebase/auth';

export async function POST(request) {
  try {
    const { idToken } = await request.json();
    
    if (!idToken) {
      return Response.json({ error: 'Missing ID token' }, { status: 400 });
    }

    const credential = GoogleAuthProvider.credential(idToken);
    const userCredential = await signInWithCredential(auth, credential);
    
    return Response.json({ 
      success: true,
      user: {
        uid: userCredential.user.uid,
        email: userCredential.user.email,
        displayName: userCredential.user.displayName
      }
    });
  } catch (error) {
    return Response.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}

export async function GET(request) {
  try {
    const user = auth.currentUser;
    
    if (user) {
      return Response.json({ 
        success: true,
        user: {
          uid: user.uid,
          email: user.email,
          displayName: user.displayName
        }
      });
    } else {
      return Response.json({ 
        success: false,
        error: 'No user logged in'
      });
    }
  } catch (error) {
    return Response.json({ 
      success: false,
      error: error.message 
    }, { status: 500 });
  }
}
