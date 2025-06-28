'use client';

import React, { useState } from 'react';
import { useRouter } from 'next/navigation';
import { mockStores, mockDealers } from '@/data/mockData';

export default function NewReviewPage() {
  const router = useRouter();
  const [reviewType, setReviewType] = useState<'store' | 'dealer'>('store');
  const [selectedStoreId, setSelectedStoreId] = useState('');
  const [selectedDealerId, setSelectedDealerId] = useState('');
  const [rating, setRating] = useState(0);
  const [hoveredRating, setHoveredRating] = useState(0);
  const [comment, setComment] = useState('');
  const [userName, setUserName] = useState('');
  const [userEmail, setUserEmail] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // In a real app, this would submit to an API
    console.log('Review submitted:', {
      type: reviewType,
      storeId: selectedStoreId,
      dealerId: selectedDealerId,
      rating,
      comment,
      userName,
      userEmail,
      date: new Date().toISOString()
    });

    // Show success message and redirect
    alert('Thank you for your review! It will be published after moderation.');
    
    if (reviewType === 'store' && selectedStoreId) {
      router.push(`/store/${selectedStoreId}`);
    } else if (reviewType === 'dealer' && selectedDealerId) {
      router.push(`/dealer/${selectedDealerId}`);
    } else {
      router.push('/');
    }
  };

  const isFormValid = () => {
    return (
      rating > 0 &&
      comment.trim().length > 0 &&
      userName.trim().length > 0 &&
      userEmail.trim().length > 0 &&
      ((reviewType === 'store' && selectedStoreId) ||
       (reviewType === 'dealer' && selectedDealerId))
    );
  };

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Write a Review</h1>

        <form onSubmit={handleSubmit} className="bg-white rounded-lg shadow p-6">
          {/* Review Type Selection */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              What would you like to review?
            </label>
            <div className="flex gap-4">
              <label className="flex items-center">
                <input
                  type="radio"
                  value="store"
                  checked={reviewType === 'store'}
                  onChange={(e) => {
                    setReviewType(e.target.value as 'store');
                    setSelectedDealerId('');
                  }}
                  className="mr-2"
                />
                <span>Poker Store</span>
              </label>
              <label className="flex items-center">
                <input
                  type="radio"
                  value="dealer"
                  checked={reviewType === 'dealer'}
                  onChange={(e) => {
                    setReviewType(e.target.value as 'dealer');
                    setSelectedStoreId('');
                  }}
                  className="mr-2"
                />
                <span>Dealer</span>
              </label>
            </div>
          </div>

          {/* Store Selection */}
          {reviewType === 'store' && (
            <div className="mb-6">
              <label htmlFor="store" className="block text-sm font-medium text-gray-700 mb-2">
                Select Store
              </label>
              <select
                id="store"
                value={selectedStoreId}
                onChange={(e) => setSelectedStoreId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a store...</option>
                {mockStores.map(store => (
                  <option key={store.id} value={store.id}>
                    {store.name} - {store.city}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Dealer Selection */}
          {reviewType === 'dealer' && (
            <div className="mb-6">
              <label htmlFor="dealer" className="block text-sm font-medium text-gray-700 mb-2">
                Select Dealer
              </label>
              <select
                id="dealer"
                value={selectedDealerId}
                onChange={(e) => setSelectedDealerId(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              >
                <option value="">Select a dealer...</option>
                {mockDealers.map(dealer => (
                  <option key={dealer.id} value={dealer.id}>
                    {dealer.name}
                  </option>
                ))}
              </select>
            </div>
          )}

          {/* Rating */}
          <div className="mb-6">
            <label className="block text-sm font-medium text-gray-700 mb-2">
              Rating
            </label>
            <div className="flex gap-2">
              {[1, 2, 3, 4, 5].map((star) => (
                <button
                  key={star}
                  type="button"
                  onClick={() => setRating(star)}
                  onMouseEnter={() => setHoveredRating(star)}
                  onMouseLeave={() => setHoveredRating(0)}
                  className="p-1"
                >
                  <svg
                    className={`w-8 h-8 ${
                      star <= (hoveredRating || rating)
                        ? 'text-yellow-400'
                        : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                </button>
              ))}
            </div>
          </div>

          {/* Comment */}
          <div className="mb-6">
            <label htmlFor="comment" className="block text-sm font-medium text-gray-700 mb-2">
              Your Review
            </label>
            <textarea
              id="comment"
              value={comment}
              onChange={(e) => setComment(e.target.value)}
              rows={5}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              placeholder="Share your experience..."
              required
            />
          </div>

          {/* User Information */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-2">
                Your Name
              </label>
              <input
                type="text"
                id="name"
                value={userName}
                onChange={(e) => setUserName(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">
                Your Email
              </label>
              <input
                type="email"
                id="email"
                value={userEmail}
                onChange={(e) => setUserEmail(e.target.value)}
                className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-blue-500 focus:border-blue-500"
                placeholder="your@email.com"
                required
              />
              <p className="text-xs text-gray-500 mt-1">Your email will not be published</p>
            </div>
          </div>

          {/* Submit Button */}
          <div className="flex justify-between">
            <button
              type="button"
              onClick={() => router.back()}
              className="px-6 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button
              type="submit"
              disabled={!isFormValid()}
              className={`px-6 py-2 rounded-md transition-colors ${
                isFormValid()
                  ? 'bg-blue-500 text-white hover:bg-blue-600'
                  : 'bg-gray-300 text-gray-500 cursor-not-allowed'
              }`}
            >
              Submit Review
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}