import * as React from 'react';
import { useRouter } from 'next/router';
import { Route } from '../utils/navigation';

export const Index: React.FC = () => {
  const router = useRouter();

  if (typeof window !== 'undefined') {
    router.push(Route.Login);
  }

  return null;
};

export default Index;
