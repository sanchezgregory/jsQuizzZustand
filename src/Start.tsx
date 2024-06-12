import { Button } from '@mui/material'
import { useQuestionsStore } from './store/Questions'

export default function Start() {
  const LIMIT_QUESTION = 5
  const fetchQuestions = useQuestionsStore((state) => state.fetchQuestions)

  const handleClick = () => {
    fetchQuestions(LIMIT_QUESTION)
  }

  return <Button onClick={handleClick}>Empezar</Button>
}
