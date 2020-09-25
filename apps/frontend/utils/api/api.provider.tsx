import * as React from 'react';
import { clients } from './api.client';
import { ApiContext } from './api.context';

export const ApiProvider: React.FC = ({ children }) => (
  <ApiContext.Provider value={clients} children={children} />
);
