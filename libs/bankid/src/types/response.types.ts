import { CardReader, CollectStatus, HintCode } from './enums.types';

export type Requirement = {
  cardReader?: CardReader;
  certificatePolicies?: string[];
  issuerCn?: string;
  autoStartTokenRequired?: boolean;
  allowFingerprint?: boolean;
};

export interface BankIDRawAuthResponse {
  autoStartToken: string;
  orderRef: string;
  qrStartToken: string;
  qrStartSecret: string;
}

// eslint-disable-next-line @typescript-eslint/no-empty-interface
export interface BankIDRawSignResponse extends BankIDRawAuthResponse {}

export interface BankIDRawCompletionData {
  user: {
    personalNumber: string;
    name: string;
    givenName: string;
    surname: string;
  };
  device: {
    ipAddress: string;
  };
  cert: {
    notBefore: Date;
    notAfter: Date;
  };
  signature: string;
  ocspResponse: string;
}

export interface BankIDCollectResponse {
  orderRef: string;
  status: CollectStatus;
  hintCode?: HintCode;
  completionData?: BankIDRawCompletionData;
}
