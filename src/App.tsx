// import LoginForm from "./components/loginForm/LoginForm";
import { GlobalStyles } from '@mui/system'
import { CssVarsProvider } from '@mui/joy/styles'
import CssBaseline from '@mui/joy/CssBaseline'
import Root from './routes/Root'
// import MorseCodeVisualizer from "./components/morseCodeVisualizer/MorseCodeVisualizer";

const App = () => {
  return (
    <CssVarsProvider defaultMode='system' disableTransitionOnChange>
      <CssBaseline disableColorScheme />
      <GlobalStyles
        styles={{
          ':root': {
            '--Collapsed-breakpoint': '769px', // form will stretch when viewport is below `769px`
            '--Cover-width': '50vw', // must be `vw` only
            '--Form-maxWidth': '400px',
            '--Transition-duration': '0.4s', // set to `none` to disable transition
          },
        }}
      />
      <Root />
    </CssVarsProvider>
  )
}

export default App
