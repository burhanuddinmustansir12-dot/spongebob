'use client';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import Link from 'next/link';

export default function Profile() {
  const [user, setUser] = useState(null);
  const [activeTab, setActiveTab] = useState('profile');
  const [isEditing, setIsEditing] = useState(false);
  const [profileData, setProfileData] = useState({
    displayName: '',
    bio: '',
    location: '',
    website: '',
    skills: '',
    experience: ''
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      if (user) {
        setProfileData({
          displayName: user.displayName || '',
          email: user.email || '',
          photoURL: user.photoURL || ''
        });
      }
    });

    return () => unsubscribe();
  }, []);

  const handleSave = async () => {
    setIsEditing(false);
    // Here you would save to Firebase/Firestore
    console.log('Profile saved:', profileData);
    alert('Profile saved successfully!');
  };

  const handleTabChange = (tab) => {
    setActiveTab(tab);
  };

  if (!user) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-white font-sans">
        <main className="flex flex-col items-center justify-center p-8 bg-white rounded-lg shadow-lg border border-gray-200">
          <div className="text-center">
            <h1 className="text-2xl font-bold mb-6">Please Sign In</h1>
            <p className="text-gray-600 mb-4">You need to be logged in to view your profile.</p>
            <Link 
              href="/firebase-signin" 
              className="inline-block px-6 py-3 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors font-medium"
            >
              Sign In
            </Link>
          </div>
        </main>
      </div>
    );
  }

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <div className="w-64 bg-white shadow-lg border-r border-gray-200">
        <div className="p-6">
          <div className="flex items-center mb-6">
            <div className="w-12 h-12 bg-blue-600 rounded-full flex items-center justify-center">
              <span className="text-white text-xl font-bold">
                {user?.displayName?.charAt(0)?.toUpperCase() || 'U'}
              </span>
            </div>
            <h2 className="text-lg font-semibold">{user?.displayName || 'User Profile'}</h2>
          </div>
          
          {/* Tab Navigation */}
          <div className="flex space-x-1 border-b border-gray-200">
            <button
              onClick={() => handleTabChange('profile')}
              className={`flex-1 px-4 py-2 text-sm font-medium ${
                activeTab === 'profile' 
                  ? 'bg-blue-600 text-white border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300'
              }`}
            >
              Profile
            </button>
            <button
              onClick={() => handleTabChange('settings')}
              className={`flex-1 px-4 py-2 text-sm font-medium ${
                activeTab === 'settings' 
                  ? 'bg-blue-600 text-white border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300'
              }`}
            >
              Settings
            </button>
            <button
              onClick={() => handleTabChange('activity')}
              className={`flex-1 px-4 py-2 text-sm font-medium ${
                activeTab === 'activity' 
                  ? 'bg-blue-600 text-white border-b-2 border-blue-600' 
                  : 'text-gray-600 hover:text-gray-800 border-b-2 border-transparent hover:border-gray-300'
              }`}
            >
              Activity
            </button>
          </div>

          {/* Tab Content */}
          <div className="flex-1 p-6">
            {activeTab === 'profile' && (
              <div className="space-y-6">
                {/* Profile Picture */}
                <div className="flex justify-center mb-6">
                  <div className="relative">
                    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center">
                      {user?.photoURL ? (
                        <img 
                          src={user.photoURL} 
                          alt={user.displayName || 'Profile'}
                          className="w-24 h-24 rounded-full object-cover"
                        />
                      ) : (
                        <div className="w-24 h-24 bg-gray-400 rounded-full flex items-center justify-center">
                          <svg className="w-12 h-12 text-gray-500" fill="currentColor" viewBox="0 0 24 24">
                            <path d="M12 12c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53z"/>
                          </svg>
                        </div>
                      )}
                    </div>
                  </div>

                  {/* Profile Info */}
                  <div className="space-y-4">
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Display Name</label>
                        <input
                          type="text"
                          value={isEditing ? profileData.displayName : user?.displayName || ''}
                          onChange={(e) => setProfileData({...profileData, displayName: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input
                          type="email"
                          value={isEditing ? profileData.email : user?.email || ''}
                          onChange={(e) => setProfileData({...profileData, email: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
                        <textarea
                          value={isEditing ? profileData.bio : user?.bio || ''}
                          onChange={(e) => setProfileData({...profileData, bio: e.target.value})}
                          disabled={!isEditing}
                          rows={4}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Additional Profile Fields */}
                    <div className="grid grid-cols-1 gap-4">
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Location</label>
                        <input
                          type="text"
                          value={isEditing ? profileData.location : user?.location || ''}
                          onChange={(e) => setProfileData({...profileData, location: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                      <div>
                        <label className="block text-sm font-medium text-gray-700 mb-2">Website</label>
                        <input
                          type="url"
                          value={isEditing ? profileData.website : user?.website || ''}
                          onChange={(e) => setProfileData({...profileData, website: e.target.value})}
                          disabled={!isEditing}
                          className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
                        />
                      </div>
                    </div>

                    {/* Action Buttons */}
                    <div className="flex space-x-4">
                      {isEditing ? (
                        <>
                          <button
                            onClick={handleSave}
                            className="px-4 py-2 bg-green-600 text-white rounded-lg hover:bg-green-700 transition-colors"
                          >
                            Save Profile
                          </button>
                          <button
                            onClick={() => setIsEditing(false)}
                            className="px-4 py-2 bg-gray-600 text-white rounded-lg hover:bg-gray-700 transition-colors"
                          >
                            Cancel
                          </button>
                        </>
                      ) : (
                        <button
                          onClick={() => setIsEditing(true)}
                          className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition-colors"
                        >
                          Edit Profile
                        </button>
                      )}
                    </div>
                  </div>
            )}

            {activeTab === 'settings' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold mb-4">Settings</h3>
                <div className="space-y-4">
                  <div className="grid grid-cols-1 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Theme</label>
                      <select className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-blue-500">
                        <option value="light">Light</option>
                        <option value="dark">Dark</option>
                        <option value="auto">System</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-2">Notifications</label>
                      <div className="space-y-2">
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">Email notifications</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">Push notifications</span>
                        </label>
                        <label className="flex items-center">
                          <input type="checkbox" className="mr-2" />
                          <span className="text-sm">Profile visibility</span>
                        </label>
                      </div>
                    </div>
                  </div>
                </div>
            )}

            {activeTab === 'activity' && (
              <div className="space-y-6">
                <h3 className="text-lg font-semibold mb-4">Activity</h3>
                <div className="space-y-4">
                  <div className="border-l border-gray-200 pl-4">
                    <div className="text-sm text-gray-500 mb-2">Today</div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-green-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">Profile updated</p>
                          <p className="text-sm text-gray-500">2 hours ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-l border-gray-200 pl-4">
                    <div className="text-sm text-gray-500 mb-2">Yesterday</div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-blue-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">Signed in</p>
                          <p className="text-sm text-gray-500">1 day ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="border-l border-gray-200 pl-4">
                    <div className="text-sm text-gray-500 mb-2">This week</div>
                    <div className="space-y-2">
                      <div className="flex items-center">
                        <div className="w-3 h-3 bg-purple-500 rounded-full"></div>
                        <div>
                          <p className="font-medium">New connection</p>
                          <p className="text-sm text-gray-500">3 days ago</p>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </main>
    </div>
  );
}
