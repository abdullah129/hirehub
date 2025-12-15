import React from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';

export const Login: React.FC = () => {
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle login
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardBody className="p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Welcome to HireHub
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="email"
              label="Email"
              placeholder="your@email.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
            <Input
              type="password"
              label="Password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
            <Button type="submit" variant="primary" size="lg" className="w-full">
              Sign In
            </Button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Don't have an account?{' '}
            <a href="/signup" className="text-primary-600 hover:underline">
              Sign up
            </a>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};
