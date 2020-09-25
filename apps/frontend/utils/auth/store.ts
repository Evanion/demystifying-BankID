import { Subject } from 'rxjs';

const subject = new Subject();

const Storage =
  typeof window !== 'undefined' ? sessionStorage || localStorage : null;

const tokens = Storage ? Storage.getItem('tokens') : null;
export interface Tokens {
  autoStartToken: string;
  orderRef: string;
}
const isAuth = Storage ? JSON.parse(Storage.getItem('user'))?.isAuth : false;

const initialState = {
  tokens: tokens
    ? JSON.parse(tokens)
    : ({
        autoStartToken: '',
        orderRef: '',
      } as Tokens),
  personalNumber: '',
  isAuth,
  loading: false,
  fetched: false,
  error: null,
  collect: {} as CollectResponse,
  updatedAt: new Date(),
};

const state = initialState;

export const authStore = {
  init: () => subject.next(state),
  initialState,
  subscribe: (setState) => subject.subscribe(setState),
  clearAuth: () => {
    state.tokens = { autoStartToken: '', orderRef: '' } as Tokens;
    state.personalNumber = '';
  },
};

export interface CollectResponse {
  status: CollectStatus;
  messageId: string;
}
export enum CollectStatus {
  pending = 'pending',
  failed = 'failed',
  complete = 'complete',
}
