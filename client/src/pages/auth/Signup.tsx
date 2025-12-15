import React from 'react';
import { Input } from '../../components/ui/Input';
import { Button } from '../../components/ui/Button';
import { Card, CardBody } from '../../components/ui/Card';

export const Signup: React.FC = () => {
  const [name, setName] = React.useState('');
  const [email, setEmail] = React.useState('');
  const [password, setPassword] = React.useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Handle signup
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <Card className="w-full max-w-md">
        <CardBody className="p-8">
          <h1 className="text-3xl font-bold text-center text-gray-900 mb-6">
            Create an Account
          </h1>
          <form onSubmit={handleSubmit} className="space-y-4">
            <Input
              type="text"
              label="Name"
              placeholder="Your name"
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
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
              Sign Up
            </Button>
          </form>
          <p className="text-center text-sm text-gray-600 mt-4">
            Already have an account?{' '}
            <a href="/login" className="text-primary-600 hover:underline">
              Sign in
            </a>
          </p>
        </CardBody>
      </Card>
    </div>
  );
};
