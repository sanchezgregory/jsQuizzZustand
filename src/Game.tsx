import { Card, IconButton, Stack, Typography } from '@mui/material'
import { type Question as QuestionType } from './types'
import { useQuestionsStore } from './store/Questions'

const Question = ({ info }: { info: QuestionType }) => {
  return (
    <Card variant='outlined'>
      <Typography variant='h5'>{info.question}</Typography>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Question info={questionInfo} />
    </>
  )
}
