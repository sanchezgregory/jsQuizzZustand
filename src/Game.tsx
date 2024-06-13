import {
  Card,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Stack,
  Typography,
} from '@mui/material'

import { type Question as QuestionType } from './types'
import { useQuestionsStore } from './store/Questions'
import SyntaxHighlighter from 'react-syntax-highlighter'
import { gradientDark } from 'react-syntax-highlighter/dist/esm/styles/hljs'
import Footer from './Footer'

// esta funcion getBackgroundColor, al estar fuera del componente, solo se renderiza una vez, si estuviese dentro, se rendereizaría cuando el componente le toque
const getBackgroundColor = (info: QuestionType, index: number) => {
  const { userSelectedAnswer, correctAnswer } = info
  // user no ha seleccionado nada
  if (userSelectedAnswer == null) return 'transparent'
  // user ya seleccionó pero la solucion es incorrecta
  if (index !== correctAnswer && index !== userSelectedAnswer)
    return 'transparent'
  // si es la solucion correcta
  if (index === correctAnswer) return 'green'
  //si es la solucion del usuario pero no es correcta
  if (index === userSelectedAnswer) return 'red'

  return 'transparent'
}

const Question = ({ info }: { info: QuestionType }) => {
  const selectAnswer = useQuestionsStore((state) => state.selectAnswer)

  const handleClick = (questionId: number, answerIndex: number) => {
    selectAnswer(questionId, answerIndex)
  }
  console.log(info)
  return (
    <Card
      variant='outlined'
      sx={{ bgcolor: '#222', p: 2, textAlign: 'left', marginTop: '4' }}
    >
      <Typography variant='h5'>{info.question}</Typography>
      <SyntaxHighlighter language='javascript' style={gradientDark}>
        {info.code}
      </SyntaxHighlighter>
      <List sx={{ bgcolor: '#333' }} disablePadding>
        {info.answers.map((answer, index) => (
          <ListItem key={index} disablePadding divider>
            <ListItemButton
              sx={{
                backgroundColor: getBackgroundColor(info, index),
              }}
              onClick={() => handleClick(info.id, index)}
              disabled={info.userSelectedAnswer !== undefined}
            >
              <ListItemText primary={answer} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </Card>
  )
}

export const Game = () => {
  const questions = useQuestionsStore((state) => state.questions)
  const currentQuestion = useQuestionsStore((state) => state.currentQuestion)
  const nextQuestion = useQuestionsStore((state) => state.nextQuestion)
  const prevQuestion = useQuestionsStore((state) => state.prevQuestion)

  const questionInfo = questions[currentQuestion]

  return (
    <>
      <Stack
        direction='row'
        gap='2'
        alignItems='center'
        justifyContent='center'
      >
        <IconButton onClick={prevQuestion} disabled={currentQuestion === 0}>
          Prev
        </IconButton>
        {currentQuestion + 1} / {questions.length}
        <IconButton
          onClick={nextQuestion}
          disabled={currentQuestion >= questions.length - 1}
        >
          Next
        </IconButton>
      </Stack>
      <Question info={questionInfo} />
      <Footer />
    </>
  )
}
