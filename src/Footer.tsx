import { useQuestionsStore } from './store/Questions'
import useQuestionData from './hooks/useQuestionData'

function Footer() {
  const [unansweredQuestions, correctAnswers, incorrectAnswers] =
    useQuestionData()

  return (
    <>
      <div>Footer</div>
      <div>Unanswered questions: {unansweredQuestions}</div>
      <div>Correct answers: {correctAnswers}</div>
      <div>Incorrect answers: {incorrectAnswers}</div>
    </>
  )
}

export default Footer
