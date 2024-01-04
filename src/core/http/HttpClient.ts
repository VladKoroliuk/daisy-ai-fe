import { defaultFetchConfig } from './HttpClient.config'

export class HttpFetch implements HttpClient {
  constructor(private config: ClientConfig) {
    this.headers = new Headers()
  }

  public get<T>(uri: string, params?: HttpParams): Promise<HttpResponse<T>> {
    const url = this.createURL(uri, params)
    return this.request<T>(url, {
      method: 'GET'
    })
  }
  public post<T>(uri: string, body?: HttpBody): Promise<HttpResponse<T>> {
    const url = this.createURL(uri)
    return this.request<T>(url, {
      method: 'POST',
      body: body
    })
  }
  public put<T>(uri: string, body?: HttpBody): Promise<HttpResponse<T>> {
    throw new Error('Not implemented')
  }
  public delete<T>(uri: string, params?: HttpParams): Promise<HttpResponse<T>> {
    const url = this.createURL(uri, params)
    return this.request<T>(url, {
      method: 'DELETE'
    })
  }

  protected async request<T>(url: string, config: RequestOptions): Promise<HttpResponse<T>> {
    const fullConfig = this.makeFullConfig({ ...config, headers: this.headers })
    const response = await fetch(url, fullConfig as object)
    return {
      data: await response.json(),
      ok: response.ok,
      status: response.status,
      statusText: response.statusText,
      headers: response.headers
    }
  }

  public setHeaders(headers: Headers) {
    this.headers = headers
  }

  public getHeaders(): Headers {
    return this.headers
  }

  protected headers: Headers

  private makeFullConfig(userConfig: RequestOptions): RequestOptions {
    return { ...defaultFetchConfig, ...userConfig }
  }

  private createURL(uri: string, params?: Record<string, string>): string {
    const urlObject = new URL(uri, this.config.baseURL)
    const urlParams = new URLSearchParams(params).toString()
    urlObject.search = urlParams
    return urlObject.toString()
  }
}
