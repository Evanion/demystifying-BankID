import * as React from 'react';
import { ApiContext } from './api.context';
export const useApi = () => React.useContext(ApiContext);
