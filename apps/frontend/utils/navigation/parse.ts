import { compile } from 'path-to-regexp';
import { Route } from './routes';

export const parseRoute = (route: Route, params: object) => {
  console.log('[parse]', params);
  const toPath = compile(route, { encode: encodeURIComponent });
  return toPath(params);
};
