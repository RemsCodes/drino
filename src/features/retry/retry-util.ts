import type { RequestMethodType } from '../../models/http.model';
import type { NumberRange } from '../../models/shared.model';
import type { OnMethods, OnStatusCodes, RetryConfig } from './models';

export function needRetry(retryConfig: Required<RetryConfig>, status: number, method: RequestMethodType, retried: number, abortCtrl: AbortController): boolean {
  return (retried < retryConfig.max)
    && matchStatus(retryConfig.onStatus, status)
    && matchMethod(retryConfig.onMethods, method)
    && !abortCtrl.signal.aborted;
}

function matchStatus(onStatus: OnStatusCodes, status: number): boolean {
  if (isNumberRange(onStatus)) {
    const { start, end }: NumberRange = onStatus;
    return (start <= status)
      && (status <= end);
  }

  if (!onStatus.length) return false;

  if (isNumberRangeArray(onStatus)) {
    return onStatus.some(({ start, end }: NumberRange) => (start <= status) && (status <= end));
  }

  return onStatus.includes(status);
}

function matchMethod(onMethods: OnMethods, method: RequestMethodType): boolean {
  return (onMethods === '*')
    || onMethods.includes(method);
}

function isNumberRange(value: any): value is NumberRange {
  return (!!value.min)
    && (!!value.max);
}

function isNumberRangeArray(value: any[]): value is NumberRange[] {
  return isNumberRange(value?.at(0));
}
