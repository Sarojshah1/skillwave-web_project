import React from 'react';
import { Card, CardHeader, CardTitle, CardContent } from '@/shared/ui/Card';

const OrderSummaryCard = ({ thumbnail, title, description, price }) => {
  return (
    <Card className="w-full max-w-2xl mb-8">
      <CardHeader>
        <CardTitle>Order Summary</CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex gap-4 mb-4">
          <img
            src={`http://localhost:3000/thumbnails/${thumbnail}`}
            alt={title}
            className="w-32 h-32 object-contain rounded-md"
          />
          <div>
            <h3 className="text-xl font-semibold text-gray-800">{title}</h3>
            <p className="text-gray-600 text-sm">{description}</p>
            <p className="text-lg font-bold text-gray-900 mt-2">NPR {price}</p>
          </div>
        </div>
        <div className="space-y-2 text-sm text-gray-700">
          <div className="flex justify-between">
            <span>Subtotal</span>
            <span>NPR {price}</span>
          </div>
          <div className="flex justify-between">
            <span>Tax (5%)</span>
            <span>NPR {(price * 0.05).toFixed(2)}</span>
          </div>
          <div className="flex justify-between font-bold text-gray-900">
            <span>Total</span>
            <span>NPR {(price * 1.05).toFixed(2)}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
};

export default OrderSummaryCard;
