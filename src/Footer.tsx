import { Button } from '@mui/material'
import { useQuestionsStore } from './store/Questions'
import useQuestionData from './hooks/useQuestionData'

function Footer() {
  const [unansweredQuestions, correctAnswers, incorrectAnswers] =
    useQuestionData()

  const reset = useQuestionsStore((state) => state.reset)
  return (
    <>
      <div>Footer</div>
      <div>Unanswered questions: {unansweredQuestions}</div>
      <div>Correct answers: {correctAnswers}</div>
      <div>Incorrect answers: {incorrectAnswers}</div>
      <div>
        <Button onClick={() => reset()}>Reset</Button>
      </div>
    </>
  )
}

export default Footer
