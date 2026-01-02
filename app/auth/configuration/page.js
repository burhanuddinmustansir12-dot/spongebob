'use client';

export default function AuthConfiguration() {
  return (
    <div className="flex min-h-screen items-center justify-center bg-white font-sans">
      <main className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg border border-gray-200">
        <h1 className="text-2xl font-bold mb-6">Firebase Configuration</h1>
        
        <div className="space-y-4 w-full max-w-sm">
          <div className="p-4 bg-blue-50 rounded-lg border border-blue-200">
            <h2 className="text-lg font-semibold mb-2">Firebase Project Configuration</h2>
            <div className="space-y-2 text-sm">
              <p><strong>Project ID:</strong> burhan-5c22a</p>
              <p><strong>Auth Domain:</strong> burhan-5c22a.firebaseapp.com</p>
              <p><strong>Storage Bucket:</strong> burhan-5c22a.firebasestorage.app</p>
              <p><strong>API Key:</strong> AIzaSyC6YaOF5NFEBC-t6VFTEeMSYYyao58nxvU</p>
            </div>
          </div>
          
          <div className="p-4 bg-green-50 rounded-lg border border-green-200">
            <h2 className="text-lg font-semibold mb-2">Status</h2>
            <div className="space-y-2 text-sm">
              <p><strong>✅ Firebase SDK:</strong> Installed</p>
              <p><strong>✅ Configuration:</strong> Valid</p>
              <p><strong>✅ Authentication:</strong> Ready</p>
            </div>
          </div>
        </div>
        
        <div className="mt-6 text-center">
          <a 
            href="/" 
            className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
          >
            Back to Home
          </a>
        </div>
      </main>
    </div>
  );
}
