import { User } from './User'

type UserProps = any
interface CurrentUserProps {
  access_token: string
  user_data: UserProps
}

export class CurrentUser extends User {
  constructor(props: CurrentUserProps) {
    super(props)
    this.access_token = props.access_token
    this._user_data = props.user_data
  }

  get userData(): UserProps {
    return this._user_data
  }

  public access_token: string = ''
  private _user_data: UserProps
}

let instance: CurrentUser | null = null

export function getCurrentUserInstance(): CurrentUser {
  if (instance) {
    return instance
  } else {
    throw new Error('Current user is null')
  }
}

export function setCurrentUser(props: CurrentUserProps): CurrentUser {
  instance = new CurrentUser(props)
  return instance
}

export function setCurrentUserToNull(): void {
  instance = null
}
