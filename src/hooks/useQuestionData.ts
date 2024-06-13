import { useQuestionsStore } from '../store/Questions'

export default function useQuestionData() {
  const questions = useQuestionsStore((state) => state.questions)
  let unansweredQuestions = 0
  let correctAnswers = 0
  let incorrectAnswers = 0

  questions.forEach((question) => {
    const { userSelectedAnswer, correctAnswer } = question

    if (userSelectedAnswer === undefined) unansweredQuestions++
    if (userSelectedAnswer === correctAnswer) correctAnswers++
    if (
      userSelectedAnswer !== undefined &&
      userSelectedAnswer !== correctAnswer
    )
      incorrectAnswers++
  })

  return [unansweredQuestions, correctAnswers, incorrectAnswers]
}
