export enum CardReader {
  class1 = 'class1',
  class2 = 'class2',
}

export enum CollectStatus {
  pending = 'pending',
  failed = 'failed',
  complete = 'complete',
}

export enum HintCode {
  outstandingTransaction = 'outstandingTransaction',
  noClient = 'noClient',
  started = 'started',
  userSign = 'userSign',
  expiredTransaction = 'expiredTransaction',
  certificateErr = 'certificateErr',
  userCancel = 'userCancel',
  cancelled = 'cancelled',
  startFailed = 'startFailed',
}
