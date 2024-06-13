import { create } from 'zustand'
import { type Question } from '../types'
import confetti from 'canvas-confetti'

interface State {
  questions: Question[]
  currentQuestion: number
  fetchQuestions: (limit: number) => Promise<void>
  selectAnswer: (questionId: number, answerIndex: number) => void
  nextQuestion: () => void
  prevQuestion: () => void
}

export const useQuestionsStore = create<State>((set, get) => {
  return {
    questions: [],
    currentQuestion: 0,

    fetchQuestions: async (limit: number) => {
      const res = await fetch('http://localhost:5173/data.json')
      const json = await res.json()
      const questions = json.sort(() => Math.random() - 0.5).slice(0, limit)
      set({ questions })
    },

    selectAnswer: (questionId: number, answerIndex: number) => {
      const { questions } = get()
      // Usar structuredClone para clonar el objeto
      const newQuestions = structuredClone(questions)
      // encontramos el indice de la pregunta
      const questionIndex = newQuestions.findIndex((q) => q.id === questionId)
      // obtenemos la informacion completa de la pregunta
      const questionInfo = newQuestions[questionIndex]
      // chequeamos si el user ha selecionado la respuesta correcta
      const isCorrectUserAnswer = questionInfo.correctAnswer === answerIndex

      if (isCorrectUserAnswer) confetti()

      // ahora actualizamos el estado. Mutando la copia que hemos hecho con el structuredClone
      newQuestions[questionIndex] = {
        ...questionInfo,
        isCorrectUserAnswer,
        userSelectedAnswer: answerIndex,
      }
      // Actualizamos el estado
      set({ questions: newQuestions })
    },

    nextQuestion: () => {
      const { currentQuestion, questions } = get()
      const nextQuestion = currentQuestion + 1

      if (nextQuestion < questions.length) {
        set({ currentQuestion: nextQuestion })
      }
    },

    prevQuestion: () => {
      const { currentQuestion } = get()
      const previousQuestion = currentQuestion - 1

      if (previousQuestion >= 0) {
        set({ currentQuestion: previousQuestion })
      }
    },
  }
})
