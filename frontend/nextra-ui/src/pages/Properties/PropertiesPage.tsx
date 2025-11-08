import React from 'react';
import { Button } from '../../components/common/Button';

export const PropertiesPage: React.FC = () => {
  const properties = [
    {
      id: 1,
      name: 'Modern Office Space',
      address: '123 Business District, Floor 1',
      price: 2500,
      image: '/images/properties/office1.jpg'
    },
    {
      id: 2,
      name: 'Downtown Retail Space',
      address: '456 Main Street',
      price: 3200,
      image: '/images/properties/retail1.jpg'
    },
    {
      id: 3,
      name: 'Industrial Warehouse',
      address: '789 Industrial Park',
      price: 4800,
      image: '/images/properties/warehouse1.jpg'
    },
    {
      id: 4,
      name: 'Coworking Space',
      address: '321 Innovation Hub',
      price: 1800,
      image: '/images/properties/coworking1.jpg'
    },
    {
      id: 5,
      name: 'Executive Suite',
      address: '555 Corporate Tower',
      price: 5500,
      image: '/images/properties/suite1.jpg'
    },
    {
      id: 6,
      name: 'Restaurant Space',
      address: '777 Culinary Avenue',
      price: 3800,
      image: '/images/properties/restaurant1.jpg'
    }
  ];

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <div>
          <h1 className="text-2xl font-semibold text-text">Properties</h1>
          <p className="text-text-secondary mt-1">Manage your real estate portfolio</p>
        </div>
        <Button variant="primary">Add Property</Button>
      </div>

      {/* Filter Bar */}
      <div className="bg-surface rounded-lg shadow p-4 flex flex-wrap gap-4">
        <input
          type="text"
          placeholder="Search properties..."
          className="flex-1 min-w-[200px] px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background text-text"
        />
        <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background text-text">
          <option>All Types</option>
          <option>Office</option>
          <option>Retail</option>
          <option>Industrial</option>
        </select>
        <select className="px-4 py-2 border border-border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary/30 bg-background text-text">
          <option>Price Range</option>
          <option>$0 - $2,000</option>
          <option>$2,000 - $4,000</option>
          <option>$4,000+</option>
        </select>
      </div>

      {/* Properties Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {properties.map((property) => (
          <div key={property.id} className="bg-surface rounded-lg shadow overflow-hidden transition-transform hover:scale-[1.02]">
            <div className="h-48 bg-background/50">
              {/* Property Image Placeholder */}
              <div className="w-full h-full flex items-center justify-center text-text-secondary bg-background/50">
                Property Image
              </div>
            </div>
            <div className="p-4 space-y-2">
              <h3 className="font-semibold text-text">{property.name}</h3>
              <p className="text-sm text-text-secondary">{property.address}</p>
              <div className="flex justify-between items-center pt-2">
                <span className="text-text-secondary">${property.price}/month</span>
                <Button variant="ghost" size="sm">View Details</Button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      <div className="flex justify-center gap-2 pt-4">
        <Button variant="ghost" size="sm">Previous</Button>
        <Button variant="primary" size="sm">1</Button>
        <Button variant="ghost" size="sm">2</Button>
        <Button variant="ghost" size="sm">3</Button>
        <Button variant="ghost" size="sm">Next</Button>
      </div>
    </div>
  );
};