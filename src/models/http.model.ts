import type { HttpResponse } from '../response';
import type { PlainObject, Prefix } from './shared.model';

export type RequestMethodType =
  | 'GET'
  | 'HEAD'
  | 'DELETE'
  | 'OPTIONS'
  | 'POST'
  | 'PUT'
  | 'PATCH'
  // | 'CONNECT'
  // | 'TRACE'

export type HeadersType =
  | Headers
  | PlainObject

export type QueryParamsType =
  | URLSearchParams
  | PlainObject

export type Url =
  | Prefix<string, `http${'s' | ''}://`>
  | Prefix<string, '/'>
  | URL
  | string

export type StatusType =
  | StatusSuccessType
  | StatusErrorType

type StatusSuccessType =
  | 'Info'
  | 'Success'
  | 'Redirection'

type StatusErrorType =
  | 'ClientError'
  | 'ServerError'

export type UnwrapHttpResponse<T>
  = T extends HttpResponse<infer F> ? F
  : T
