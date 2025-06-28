'use client';

import React from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { mockDealers, mockStores, mockReviews } from '@/data/mockData';

export default function DealerProfilePage() {
  const params = useParams();
  const dealerId = params.id as string;
  
  const dealer = mockDealers.find(d => d.id === dealerId);
  const dealerReviews = mockReviews.filter(r => r.dealerId === dealerId);
  
  if (!dealer) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Dealer not found</p>
      </div>
    );
  }

  const dealerStores = mockStores.filter(store => dealer.storeIds.includes(store.id));

  return (
    <div className="container mx-auto px-4 py-8">
      <div className="max-w-4xl mx-auto">
        {/* Dealer Header */}
        <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
          <div className="md:flex">
            <div className="md:w-1/3">
              <div className="relative h-64 md:h-full">
                <Image
                  src={dealer.image}
                  alt={dealer.name}
                  fill
                  className="object-cover"
                />
              </div>
            </div>
            <div className="md:w-2/3 p-6">
              <h1 className="text-3xl font-bold mb-2">{dealer.name}</h1>
              <div className="flex items-center mb-4">
                <span className="text-2xl font-bold mr-2">{dealer.rating.toFixed(1)}</span>
                <div className="flex mr-2">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(dealer.rating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="text-gray-600">({dealerReviews.length} reviews)</span>
              </div>
              
              <div className="grid grid-cols-2 gap-4 mb-6">
                <div>
                  <p className="text-sm text-gray-600">Experience</p>
                  <p className="font-semibold">{dealer.experience}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Languages</p>
                  <p className="font-semibold">{dealer.languages.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Specialties</p>
                  <p className="font-semibold">{dealer.specialties.join(', ')}</p>
                </div>
                <div>
                  <p className="text-sm text-gray-600">Total Reviews</p>
                  <p className="font-semibold">{dealer.totalReviews}</p>
                </div>
              </div>
              
              <p className="text-gray-700">{dealer.bio}</p>
            </div>
          </div>
        </div>

        {/* Currently Working At */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Currently Working At</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {dealerStores.map(store => (
              <Link key={store.id} href={`/store/${store.id}`}>
                <div className="border rounded-lg p-4 hover:shadow-md transition-shadow cursor-pointer">
                  <h3 className="font-semibold text-lg mb-1">{store.name}</h3>
                  <p className="text-gray-600 text-sm mb-2">{store.city}</p>
                  <p className="text-sm text-gray-500">{store.gamesAvailable.join(', ')}</p>
                </div>
              </Link>
            ))}
          </div>
        </div>

        {/* Skills & Certifications */}
        <div className="bg-white rounded-lg shadow p-6 mb-8">
          <h2 className="text-2xl font-bold mb-4">Skills & Certifications</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h3 className="font-semibold mb-2">Game Expertise</h3>
              <div className="flex flex-wrap gap-2">
                {dealer.specialties.map((specialty, index) => (
                  <span key={index} className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm">
                    {specialty}
                  </span>
                ))}
              </div>
            </div>
            <div>
              <h3 className="font-semibold mb-2">Languages</h3>
              <div className="flex flex-wrap gap-2">
                {dealer.languages.map((language, index) => (
                  <span key={index} className="px-3 py-1 bg-green-100 text-green-800 rounded-full text-sm">
                    {language}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* Recent Reviews */}
        <div className="bg-white rounded-lg shadow p-6">
          <div className="flex justify-between items-center mb-4">
            <h2 className="text-2xl font-bold">Recent Reviews</h2>
            <Link
              href="/review/new"
              className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors text-sm"
            >
              Write a Review
            </Link>
          </div>
          
          {dealerReviews.length > 0 ? (
            <div className="space-y-4">
              {dealerReviews.slice(0, 5).map(review => (
                <div key={review.id} className="border-b pb-4">
                  <div className="flex justify-between items-start mb-2">
                    <div>
                      <h4 className="font-semibold">{review.userName}</h4>
                      <div className="flex items-center mt-1">
                        {[...Array(5)].map((_, i) => (
                          <svg
                            key={i}
                            className={`w-4 h-4 ${i < review.rating ? 'text-yellow-400' : 'text-gray-300'}`}
                            fill="currentColor"
                            viewBox="0 0 20 20"
                          >
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        ))}
                      </div>
                    </div>
                    <span className="text-sm text-gray-500">
                      {new Date(review.date).toLocaleDateString()}
                    </span>
                  </div>
                  <p className="text-gray-700">{review.comment}</p>
                  {review.storeId && (
                    <p className="text-sm text-gray-500 mt-2">
                      at {mockStores.find(s => s.id === review.storeId)?.name}
                    </p>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <p className="text-center text-gray-500 py-8">No reviews yet. Be the first to review!</p>
          )}
        </div>
      </div>
    </div>
  );
}