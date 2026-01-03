'use client';
import { useState, useEffect } from 'react';
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { auth } from '@/firebase';
import Link from 'next/link';
import Image from "next/image";

const [profileData, setProfileData] = useState({
  displayName: '',
  bio: '',
  location: '',
  website: '',
  profilePicture: null
});

const handlePFPUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = (e) => {
      const result = e.target.result;
      setProfileData({...profileData, profilePicture: result});
    };
    reader.readAsDataURL(file);
  }
};

<div className="flex justify-center mb-6">
  <div className="relative">
    <div className="w-24 h-24 bg-gray-300 rounded-full flex items-center justify-center overflow-hidden">
      {profileData.profilePicture ? (
        <img 
          src={profileData.profilePicture} 
          alt={user?.displayName || 'Profile'}
          className="w-24 h-24 rounded-full object-cover"
        />
      ) : user?.photoURL ? (
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
    
    {/* PFP Upload Button */}
    <div className="absolute bottom-0 right-0">
      <label className="w-8 h-8 bg-blue-600 rounded-full flex items-center justify-center cursor-pointer hover:bg-blue-700 transition-colors">
        <svg className="w-4 h-4 text-white" fill="currentColor" viewBox="0 0 24 24">
          <path d="M12 4v1.5m6 0H6v2h12V8z"/>
          <path d="M19 14l-5-5L12 19l-7-7 5 5z"/>
        </svg>
        <input
          type="file"
          accept="image/*"
          onChange={handlePFPUpload}
          className="hidden"
        />
      </label>
    </div>
  </div>
</div>
