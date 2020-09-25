import { useRouter } from 'next/dist/client/router';
import { useCallback, useEffect, useState } from 'react';
import { useApi } from '../api/api.hook';
import { authStore, CollectResponse, CollectStatus } from './store';

import { Route } from '../navigation';

let collectLoop;
const Storage =
  typeof window !== 'undefined' ? sessionStorage || localStorage : null;
export const useAuth = () => {
  const api = useApi();
  const router = useRouter();
  const [auth, setAuth] = useState(authStore.initialState);

  const getAuth = useCallback(
    async (personalNumber?: string) => {
      try {
        setAuth((state) => ({
          ...state,
          loading: true,
          fetched: false,
          error: null,
        }));
        const tokens = await api.Bankid.auth({
          body: { personalNumber },
        }).then((result) => result.data<Promise<AuthPayload>>());
        Storage.setItem('tokens', JSON.stringify(tokens));
        setAuth((state) => ({
          ...state,
          loading: false,
          fetched: true,
          tokens,
        }));
        return tokens;
      } catch (error) {
        setAuth((state) => ({
          ...state,
          loading: false,
          fetched: true,
          error,
        }));
      }
    },
    [api.Bankid]
  );

  const isAuth = async (): Promise<boolean> => {
    const user = await Promise.resolve(Storage.getItem('user')).then((result) =>
      JSON.parse(result)
    );
    return auth.isAuth || user.isAuth;
  };

  const collect = useCallback(
    async (orderRef: string) => {
      const statusDto = await api.Bankid.collect({ orderRef }).then((result) =>
        result.data<Promise<CollectResponse>>()
      );
      console.log('[COLLECT]', statusDto);
      setAuth((state) => ({
        ...state,
        collect: statusDto,
        updatedAt: new Date(),
      }));

      switch (statusDto.status) {
        case CollectStatus.pending:
          collectLoop = setTimeout(() => {
            collect(orderRef);
          }, 2000);
          break;
        case CollectStatus.failed:
          setAuth((status) => ({ ...status, error: statusDto.messageId }));
          router.push(Route.Login);
          break;
        default:
          setAuth((status) => ({ ...status, isAuth: true }));
          Storage.setItem('user', JSON.stringify({ isAuth: true }));
          router.push(Route.Dashboard);
          break;
      }
    },
    [router, api.Bankid]
  );

  const startAuth = async () => {
    try {
      const tokens = await getAuth();
      console.log('[TOKENS]', tokens);
      return {
        same: `bankid:///?autostarttoken=${
          tokens.autoStartToken
        }&redirect=${encodeURIComponent(`${router.route}/${tokens.orderRef}`)}`,
        other: `bankid:///?autostarttoken=${tokens.autoStartToken}`,
        tokens,
      };
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    const sub = authStore.subscribe(setAuth);
    authStore.init();
    return () => {
      sub.unsubscribe();
      clearTimeout(collectLoop);
    };
  }, []);

  return {
    auth,
    isAuth,
    startAuth,
    getAuth,
    collect,
  };
};

interface AuthPayload {
  orderRef: string;
  autoStartToken: string;
}
