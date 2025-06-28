'use client';

import React, { useState } from 'react';
import { useParams } from 'next/navigation';
import Link from 'next/link';
import Image from 'next/image';
import { mockStores, mockReviews, mockDealers, mockJobs } from '@/data/mockData';
import type { Review } from '@/types';

export default function StoreDetailPage() {
  const params = useParams();
  const storeId = params.id as string;
  
  const store = mockStores.find(s => s.id === storeId);
  const storeReviews = mockReviews.filter(r => r.storeId === storeId);
  const storeDealers = mockDealers.filter(d => d.storeIds.includes(storeId));
  const storeJobs = mockJobs.filter(j => j.storeId === storeId);
  
  const [activeTab, setActiveTab] = useState<'overview' | 'dealers' | 'reviews' | 'jobs'>('overview');
  
  if (!store) {
    return (
      <div className="container mx-auto px-4 py-8">
        <p>Store not found</p>
      </div>
    );
  }

  const averageRating = storeReviews.length > 0
    ? storeReviews.reduce((sum, review) => sum + review.rating, 0) / storeReviews.length
    : 0;

  return (
    <div className="container mx-auto px-4 py-8">
      {/* Store Header */}
      <div className="bg-white rounded-lg shadow-lg overflow-hidden mb-8">
        <div className="relative h-64 md:h-96">
          <Image
            src={store.image}
            alt={store.name}
            fill
            className="object-cover"
          />
        </div>
        <div className="p-6">
          <div className="flex justify-between items-start mb-4">
            <div>
              <h1 className="text-3xl font-bold mb-2">{store.name}</h1>
              <p className="text-gray-600 mb-1">{store.address}</p>
              <p className="text-gray-600">{store.city}</p>
            </div>
            <div className="text-right">
              <div className="flex items-center mb-2">
                <span className="text-2xl font-bold mr-2">{averageRating.toFixed(1)}</span>
                <div className="flex">
                  {[...Array(5)].map((_, i) => (
                    <svg
                      key={i}
                      className={`w-5 h-5 ${i < Math.round(averageRating) ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
              </div>
              <p className="text-sm text-gray-600">({storeReviews.length} reviews)</p>
            </div>
          </div>
          
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
            <div>
              <p className="text-sm text-gray-600">Games</p>
              <p className="font-semibold">{store.gamesAvailable.join(', ')}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Tables</p>
              <p className="font-semibold">{store.tables} tables</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Hours</p>
              <p className="font-semibold">{store.hours}</p>
            </div>
            <div>
              <p className="text-sm text-gray-600">Phone</p>
              <p className="font-semibold">{store.phone}</p>
            </div>
          </div>
        </div>
      </div>

      {/* Tabs */}
      <div className="bg-white rounded-lg shadow mb-8">
        <div className="border-b">
          <div className="flex">
            {(['overview', 'dealers', 'reviews', 'jobs'] as const).map((tab) => (
              <button
                key={tab}
                onClick={() => setActiveTab(tab)}
                className={`flex-1 py-4 px-6 text-center font-medium transition-colors ${
                  activeTab === tab
                    ? 'text-blue-600 border-b-2 border-blue-600'
                    : 'text-gray-600 hover:text-gray-800'
                }`}
              >
                {tab.charAt(0).toUpperCase() + tab.slice(1)}
                {tab === 'dealers' && ` (${storeDealers.length})`}
                {tab === 'reviews' && ` (${storeReviews.length})`}
                {tab === 'jobs' && ` (${storeJobs.length})`}
              </button>
            ))}
          </div>
        </div>

        <div className="p-6">
          {/* Overview Tab */}
          {activeTab === 'overview' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">About {store.name}</h2>
              <p className="text-gray-700 mb-6">{store.description}</p>
              
              <h3 className="text-xl font-semibold mb-3">Features</h3>
              <ul className="list-disc list-inside text-gray-700 mb-6">
                {store.features.map((feature, index) => (
                  <li key={index}>{feature}</li>
                ))}
              </ul>

              <h3 className="text-xl font-semibold mb-3">Contact Information</h3>
              <div className="bg-gray-50 p-4 rounded-lg">
                <p className="mb-2"><strong>Address:</strong> {store.address}, {store.city}</p>
                <p className="mb-2"><strong>Phone:</strong> {store.phone}</p>
                <p className="mb-2"><strong>Email:</strong> {store.email}</p>
                <p className="mb-2"><strong>Hours:</strong> {store.hours}</p>
                {store.website && (
                  <p><strong>Website:</strong> <a href={store.website} target="_blank" rel="noopener noreferrer" className="text-blue-600 hover:underline">{store.website}</a></p>
                )}
              </div>
            </div>
          )}

          {/* Dealers Tab */}
          {activeTab === 'dealers' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Our Dealers</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {storeDealers.map(dealer => (
                  <Link key={dealer.id} href={`/dealer/${dealer.id}`}>
                    <div className="bg-gray-50 rounded-lg overflow-hidden hover:shadow-lg transition-shadow cursor-pointer">
                      <div className="relative h-48">
                        <Image
                          src={dealer.image}
                          alt={dealer.name}
                          fill
                          className="object-cover"
                        />
                      </div>
                      <div className="p-4">
                        <h3 className="font-semibold text-lg mb-1">{dealer.name}</h3>
                        <p className="text-sm text-gray-600 mb-2">{dealer.experience} experience</p>
                        <div className="flex items-center">
                          <span className="text-sm font-medium mr-1">{dealer.rating.toFixed(1)}</span>
                          <svg className="w-4 h-4 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                            <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                          </svg>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          )}

          {/* Reviews Tab */}
          {activeTab === 'reviews' && (
            <div>
              <div className="flex justify-between items-center mb-6">
                <h2 className="text-2xl font-bold">Customer Reviews</h2>
                <Link
                  href="/review/new"
                  className="bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors"
                >
                  Write a Review
                </Link>
              </div>
              
              {storeReviews.length > 0 ? (
                <div className="space-y-6">
                  {storeReviews.map(review => (
                    <div key={review.id} className="border-b pb-6">
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
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No reviews yet. Be the first to review!</p>
              )}
            </div>
          )}

          {/* Jobs Tab */}
          {activeTab === 'jobs' && (
            <div>
              <h2 className="text-2xl font-bold mb-4">Open Positions</h2>
              {storeJobs.length > 0 ? (
                <div className="space-y-4">
                  {storeJobs.map(job => (
                    <div key={job.id} className="border rounded-lg p-4 hover:shadow-md transition-shadow">
                      <div className="flex justify-between items-start mb-2">
                        <h3 className="text-lg font-semibold">{job.title}</h3>
                        <span className={`px-3 py-1 rounded-full text-sm font-medium ${
                          job.type === 'Full-time' ? 'bg-green-100 text-green-800' : 'bg-blue-100 text-blue-800'
                        }`}>
                          {job.type}
                        </span>
                      </div>
                      <p className="text-gray-600 mb-2">{job.salary} • {job.experience}</p>
                      <p className="text-gray-700 mb-3">{job.description}</p>
                      <Link
                        href="/jobs"
                        className="text-blue-600 hover:underline text-sm"
                      >
                        View Details →
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-center text-gray-500 py-8">No open positions at this time.</p>
              )}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}