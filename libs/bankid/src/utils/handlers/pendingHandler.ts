import { PendingCollectResponseDto } from '../../dtos';
import { BankIDCollectResponse, CollectStatus, HintCode } from '../../types';

export const pendingHandler = (
  payload: BankIDCollectResponse
): PendingCollectResponseDto => {
  const message: PendingCollectResponseDto = {
    status: CollectStatus.pending,
    hintCode: payload.hintCode,
    messageId: '',
  };
  switch (payload.hintCode) {
    case HintCode.outstandingTransaction:
      return {
        ...message,
        messageId: 'rfa18',
      };

    case HintCode.noClient:
      return {
        ...message,
        messageId: 'rfa1',
      };

    case HintCode.started:
      return {
        ...message,
        messageId: 'rfa15',
      };

    case HintCode.userSign:
      return {
        ...message,
        messageId: 'rfa9',
      };

    default:
      return {
        ...message,
        messageId: 'rfa21',
      };
  }
};
