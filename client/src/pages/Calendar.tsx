import React from 'react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';

export const Calendar: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Interview Calendar</h1>
      <Card>
        <CardBody>
          <p className="text-center text-gray-500 py-16">Calendar view coming soon...</p>
        </CardBody>
      </Card>
    </div>
  );
};
