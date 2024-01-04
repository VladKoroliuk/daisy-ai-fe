interface HttpResponse<T> {
  data: T
  ok: boolean
  status: number
  statusText: string
  headers: Headers
}

type HttpParams = Record<string, string>
type HttpBody =
  | Record<string | boolean | number, string | boolean | number | object, null>
  | FormData

interface HttpClient {
  get<T>(url: string, params?: HttpParams): Promise<HttpResponse<T>>
  post<T>(url: string, body?: HttpBody): Promise<HttpResponse<T>>
  put<T>(url: string, body?: HttpBody): Promise<HttpResponse<T>>
  delete<T>(url: string, params?: HttpParams): Promise<HttpResponse<T>>
  setHeaders(headers: Headers): void
}

const HttpMethod = {
  GET: 'GET',
  POST: 'POST',
  PUT: 'PUT',
  DELETE: 'DELETE',
  PATCH: 'PATCH',
  HEAD: 'HEAD',
  OPTIONS: 'OPTIONS'
} as const

type HttpMethod = (typeof HttpMethod)[keyof typeof HttpMethod]

type RequestOptions = {
  method: HttpMethod
  mode?: 'cors' | 'no-cors' | 'same-origin'
  cache?: 'default' | 'no-cache' | 'reload' | 'force-cache' | 'only-if-cached'
  credentials?: 'include' | 'same-origin' | 'omit'
  headers?: Headers
  redirect?: 'follow' | 'manual' | 'error'
  referrerPolicy?: 'no-referrer' | 'client'
  body?: string
}

type ClientConfig = { baseURL: string }
