import { FailedCollectResponseDto } from '../../dtos';
import { BankIDCollectResponse, CollectStatus, HintCode } from '../../types';

export const failedHandler = (
  payload: BankIDCollectResponse
): FailedCollectResponseDto => {
  switch (payload.hintCode) {
    case HintCode.expiredTransaction:
      return {
        status: CollectStatus.failed,
        messageId: 'rfa8',
      };

    case HintCode.certificateErr:
      return {
        status: CollectStatus.failed,
        messageId: 'rfa16',
      };

    case HintCode.userCancel:
      return {
        status: CollectStatus.failed,
        messageId: 'rfa6',
      };

    case HintCode.cancelled:
      return {
        status: CollectStatus.failed,
        messageId: 'rfa3',
      };

    case HintCode.startFailed:
      return {
        status: CollectStatus.failed,
        messageId: 'rfa17',
      };

    default:
      return {
        status: CollectStatus.failed,
        messageId: 'rfa22',
      };
  }
};
