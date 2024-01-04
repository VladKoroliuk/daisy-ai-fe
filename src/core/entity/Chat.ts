import { Entity } from './Entity'

export interface ChatProps {
  topicID: string
  level: number
  id: string
}

export class Chat extends Entity {
  constructor(props: ChatProps) {
    super(props)
  }
}
