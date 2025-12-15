import React from 'react';
import { Card, CardHeader, CardBody } from '../components/ui/Card';
import { TrendingUp, Briefcase, Calendar, CheckCircle } from 'lucide-react';

export const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Applications', value: '0', icon: Briefcase, color: 'text-blue-600' },
    { label: 'Active', value: '0', icon: TrendingUp, color: 'text-green-600' },
    { label: 'Interviews', value: '0', icon: Calendar, color: 'text-purple-600' },
    { label: 'Offers', value: '0', icon: CheckCircle, color: 'text-green-600' },
  ];

  return (
    <div className="p-6">
      <h1 className="text-3xl font-bold text-gray-900 mb-6">Dashboard</h1>

      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
        {stats.map((stat) => (
          <Card key={stat.label}>
            <CardBody>
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-gray-600">{stat.label}</p>
                  <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
                </div>
                <stat.icon className={`h-8 w-8 ${stat.color}`} />
              </div>
            </CardBody>
          </Card>
        ))}
      </div>

      {/* Recent Activity */}
      <Card>
        <CardHeader>
          <h2 className="text-lg font-semibold">Recent Activity</h2>
        </CardHeader>
        <CardBody>
          <p className="text-center text-gray-500 py-8">No recent activity</p>
        </CardBody>
      </Card>
    </div>
  );
};
