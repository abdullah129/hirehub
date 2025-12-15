import React from 'react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';

export const Analytics: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Analytics</h1>
      <Card>
        <CardBody>
          <p className="text-center text-gray-500 py-16">Analytics charts coming soon...</p>
        </CardBody>
      </Card>
    </div>
  );
};
