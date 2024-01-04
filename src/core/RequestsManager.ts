import ApiConfig from './Api.config'
import { Api, type ApplicationApi } from './Api'
import { getAuthService } from './services/AuthService'
import { useUserStore } from '@/stores/user'

type GetRequestArgs = Parameters<ApplicationApi['get']>
type PostRequestArgs = Parameters<ApplicationApi['post']>
type PutRequestArgs = Parameters<ApplicationApi['put']>
type DeleteRequestArgs = Parameters<ApplicationApi['delete']>
type RequestArgs = GetRequestArgs | PostRequestArgs | PutRequestArgs | DeleteRequestArgs

export class RequestsManager {
  constructor() {
    this.api = new Api(ApiConfig)
    this.authService = getAuthService()
    this.store = useUserStore()
  }

  public async request<T>(type: HttpMethod, ...args: RequestArgs): Promise<HttpResponse<T> | null> {
    try {
      this.api.setHeaders(
        new Headers({
          authorization: this.getToken()
        })
      )
      const response = await this.makeRequest<T>(type, ...args)
      if (!response) {
        return null
      }
      if (response.ok === false && response.status === 401) {
        if (this.refreshed) {
          this.refreshed = false
          return response
        }
        await this.refreshToken()
        this.refreshed = true
        return await this.request(type, ...args)
      }
      this.refreshed = false
      return response
    } catch (error) {
      console.log(error)
      return null
    }
  }

  protected store
  private api: ApplicationApi
  private authService: ReturnType<typeof getAuthService>
  private refreshed = false
  private async refreshToken() {
    await this.authService.refresh()
  }
  private getToken() {
    return `Bearer ${this.store.userState.current_user?.access_token || ''}`
  }
  private makeRequest<T>(type: HttpMethod, ...args: RequestArgs): Promise<HttpResponse<T>> | null {
    switch (type) {
      case 'GET':
        return this.api.get(...(args as GetRequestArgs))
      case 'POST':
        return this.api.post(...(args as PostRequestArgs))
      case 'PUT':
        return this.api.put(...(args as PutRequestArgs))
      case 'DELETE':
        return this.api.delete(...(args as DeleteRequestArgs))
      default:
        return null
    }
  }
}
