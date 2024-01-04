import { RequestsManager } from '../RequestsManager'

class UserService extends RequestsManager {
  constructor() {
    super()
  }

  async getAllUsers() {
    const repsonse = await this.request('GET', '/users')
    console.log(repsonse)
  }
}

let instance: null | UserService = null

export const getUserService = (): UserService => {
  if (instance) {
    return instance
  }
  instance = new UserService()
  return getUserService()
}
