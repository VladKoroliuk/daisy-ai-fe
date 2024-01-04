import { Api } from '../Api'
import ApiConfig from '../Api.config'
import { setCurrentUser } from '../entity/CurrentUser'
import { useUserStore } from '@/stores/user'

class AuthService {
  constructor(private api: Api) {
    this.access_token = null
    this.store = useUserStore()
  }
  async signin(email: string, password: string) {
    try {
      const response = await this.api.post<{ access_token: string; user: any }>('/auth/login', {
        email,
        password
      })
      if (!response.ok) {
        return {
          ok: false,
          response
        }
      }
      this.setUser(response.data.access_token, response.data.user)
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  async refresh() {
    try {
      const response = await this.api.post<{ access_token: string; user: any }>('/auth/refresh')
      if (!response.ok) {
        return {
          ok: false,
          response
        }
      }
      this.setUser(response.data.access_token, response.data.user)
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }

  async signup(signupData: {
    email: string
    password: string
    firstName: string
    lastName: string
  }) {
    try {
      const response = await this.api.post<{ access_token: string; user: any }>(
        '/auth/signup',
        signupData
      )
      if (!response.ok) {
        return {
          ok: false,
          response
        }
      }
      this.setUser(response.data.access_token, response.data.user)
      return { success: true }
    } catch (error) {
      return { success: false, error }
    }
  }
  async logout() {
    this.api.setHeaders(
      new Headers({
        authorization: `Bearer ${this.store.userState.current_user?.access_token}`
      })
    )
    const response = await this.api.post<{ access_token: string; user: any }>('/auth/logout')
    if (!response.ok) {
      throw new Error(response.statusText)
    }
    this.setUser('', null)
  }

  protected access_token: string | null

  private store

  private setUser(token: string, user: any): void {
    const currentUser = setCurrentUser({
      access_token: token,
      user_data: user
    })
    // #чичкадура
    this.store.userState.current_user = currentUser
  }
}

let instance: AuthService | null = null

export const getAuthService = (): AuthService => {
  if (instance) {
    return instance
  }
  const api = new Api(ApiConfig)
  instance = new AuthService(api)
  return instance
}
