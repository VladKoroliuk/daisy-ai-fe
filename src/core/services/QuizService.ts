import { RequestsManager } from '../RequestsManager'

export type Quiz = {
  id: string
  level: number
  sections: QuizSection[]
  topic: {
    id: string
    label: string
  }
  subTopic: string
  topicID: string
  userId: string
}

export type QuizSection = {
  currentOption: null | string
  id: QuizSectionID
  question: string
  quizId: string
  options: QuizSectionOption[]
}

export type QuizSectionOption = {
  id: QuizSectionOptionID
  isCorrect: boolean
  quizSectionId: string
  text: string
}

type QuizSectionID = string
type QuizSectionOptionID = string

class QuizService extends RequestsManager {
  public async createQuiz(payload: {
    level: number
    subject: string
    topic: string
    count: number
  }) {
    const response = await this.request<Quiz>('POST', '/quiz/', payload)
    if (!response) {
      return null
    }

    return response.data
  }
  public async getQuizzes() {
    const response = await this.request<Quiz[]>('GET', '/quiz/')
    if (!response) {
      return []
    }
    return response.data
  }
  public async saveResults(results: Record<QuizSectionID, QuizSectionOptionID>) {
    const response = await this.request<Quiz>('PATCH', '/quiz/results', results)
    if (!response) {
      return null
    }

    return response.data
  }
}

let quizService: null | QuizService = null
export function getQuizService() {
  if (quizService) {
    return quizService
  }
  quizService = new QuizService()
  return quizService
}
