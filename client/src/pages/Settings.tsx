import React from 'react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';

export const Settings: React.FC = () => {
  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Settings</h1>
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Profile Settings</h2>
        </CardHeader>
        <CardBody>
          <p className="text-gray-500">Settings configuration coming soon...</p>
        </CardBody>
      </Card>
    </div>
  );
};
