import './App.css'
import { Container, Stack, Typography } from '@mui/material'
import JavascriptLogo from './JavascriptLogo.tsx'
import Start from './Start.tsx'
import { useQuestionsStore } from './store/Questions.tsx'
import { Game } from './Game.tsx'

function App() {
  const questions = useQuestionsStore((state) => state.questions)
  console.log(questions)

  return (
    <main>
      <Container maxWidth='sm'>
        <Stack
          direction='row'
          gap={2}
          alignItems='center'
          justifyContent='center'>
          <JavascriptLogo />
          <Typography variant='h2' component='h1'>
            <h1>Javascript Quizz</h1>
          </Typography>
        </Stack>

        {questions.length === 0 && <Start />}
        {questions.length > 0 && <Game />}
      </Container>
    </main>
  )
}
export default App
