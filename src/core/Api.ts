import { HttpFetch } from './http/HttpClient'

export interface ApplicationApi {
  get<T>(uri: string, params?: HttpParams): Promise<HttpResponse<T>>
  post<T>(uri: string, body: HttpBody): Promise<HttpResponse<T>>
  put<T>(uri: string, body?: HttpBody): Promise<HttpResponse<T>>
  delete<T>(uri: string, params?: HttpParams): Promise<HttpResponse<T>>
  patch<T>(uri: string, body?: HttpBody): Promise<HttpResponse<T>>
  setHeaders(headers: Headers): void
}

export class Api extends HttpFetch {
  constructor(config: ClientConfig) {
    super(config)
  }

  public async get<T>(uri: string, params?: HttpParams): Promise<HttpResponse<T>> {
    return await super.get<T>(uri, params)
  }

  public async post<T>(uri: string, body: HttpBody = {}): Promise<HttpResponse<T>> {
    const serializedBody = JSON.stringify(body)
    this.headers.set('Content-Type', 'application/json')
    return await super.post<T>(uri, serializedBody)
  }

  public async put<T>(uri: string, body?: HttpBody): Promise<HttpResponse<T>> {
    return await super.put<T>(uri, body)
  }

  public async delete<T>(uri: string, params?: HttpParams): Promise<HttpResponse<T>> {
    return await super.delete<T>(uri, params)
  }

  public async patch<T>(uri: string, body?: HttpBody): Promise<HttpResponse<T>> {
    const serializedBody = JSON.stringify(body)
    this.headers.set('Content-Type', 'application/json')
    return super.patch<T>(uri, serializedBody)
  }

  public setHeaders(headers: Headers): void {
    super.setHeaders(headers)
  }
}
