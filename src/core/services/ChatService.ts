import { RequestsManager } from '../RequestsManager'
import type { ChatProps } from '../entity/Chat'
import type { ChatTopic } from '../entity/Topic'

export interface MessageProps {
  chatID: string
  content: string
  id: string
  role: string
}

type ChatObject = {
  id: string
  topic: string
  level: number
  topicID: string
  userId: string
}

class ChatsService extends RequestsManager {
  public async createChat(level: number, topic: string) {
    const response = await this.request<ChatProps>('POST', '/chat/', {
      level,
      topic
    })
    if (!response) {
      return null
    }

    return response.data
  }

  public async getChats() {
    const response = await this.request<ChatProps[]>('GET', '/chat/')
    if (!response) {
      return []
    }
    return response.data
  }

  public async sendMessage(chatID: string, message: string): Promise<MessageProps[]> {
    const response = await this.request<MessageProps[]>('POST', '/chat/question', {
      chatID,
      message
    })
    if (!response) {
      return []
    }
    return response.data
  }

  public async loadChat(chatID: string): Promise<{
    chatData: ChatObject
    messages: MessageProps[]
  }> {
    const response = await this.request<{
      chatData: ChatObject
      messages: MessageProps[]
    }>('GET', '/chat/' + chatID)
    if (!response) {
      throw new Error()
    }
    return response.data
  }

  public async getTopics() {
    const response = await this.request<ChatTopic[]>('GET', '/chat/topic')
    if (!response) {
      return []
    }
    return response.data
  }

  public async deleteChat(id: string) {
    const response = await this.request<ChatProps>('DELETE', '/chat/' + id)
  }
}

let instance: null | ChatsService = null

export const getChatService = (): ChatsService => {
  if (instance) {
    return instance
  }
  instance = new ChatsService()
  return getChatService()
}
