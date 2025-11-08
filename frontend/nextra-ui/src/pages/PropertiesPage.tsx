import React from 'react';
import { Button } from '../components/common/Button';

export const PropertiesPage = () => {
  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h1 className="text-2xl font-semibold text-text">Properties</h1>
        <Button variant="primary">Add Property</Button>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {/* Property Card */}
        {[1, 2, 3, 4, 5, 6].map((i) => (
          <div key={i} className="bg-surface rounded-lg shadow overflow-hidden">
            <div className="h-48 bg-gray-200">
              {/* Property Image Placeholder */}
              <div className="w-full h-full flex items-center justify-center text-text-secondary">
                Property Image
              </div>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-text">Office Space {i}</h3>
              <p className="text-sm text-text-secondary">123 Business District, Floor {i}</p>
              <div className="flex justify-between items-center pt-2">
                <span className="text-text-secondary">$2,500/month</span>
                <Button variant="ghost" size="sm">View Details</Button>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};