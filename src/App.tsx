// import LoginForm from "./components/loginForm/LoginForm";
import DashboardLayout from "./layouts/dashboard/DashboardLayout";
import { GlobalStyles } from "@mui/system";
import { CssVarsProvider } from "@mui/joy/styles";
import CssBaseline from "@mui/joy/CssBaseline";
// import MorseCodeVisualizer from "./components/morseCodeVisualizer/MorseCodeVisualizer";

const App = () => {
  return (
     <CssVarsProvider defaultMode="system" disableTransitionOnChange>
          <CssBaseline disableColorScheme/>
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
    <DashboardLayout/>

    </CssVarsProvider>

    
  );
}

export default App;
