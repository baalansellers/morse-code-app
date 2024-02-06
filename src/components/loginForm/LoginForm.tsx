import React from "react"
import { CssVarsProvider} from '@mui/joy/styles';
import GlobalStyles from '@mui/joy/GlobalStyles';
import CssBaseline from '@mui/joy/CssBaseline';
import Box from '@mui/joy/Box';
import Button from '@mui/joy/Button';
import Checkbox from '@mui/joy/Checkbox';
import Divider from '@mui/joy/Divider';
import FormControl from '@mui/joy/FormControl';
import FormLabel, { formLabelClasses } from '@mui/joy/FormLabel';
import Link from '@mui/joy/Link';
import Input from '@mui/joy/Input';
import Typography from '@mui/joy/Typography';
import Stack from '@mui/joy/Stack';

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
    persistent: HTMLInputElement;
  }

interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

const Login: React.FC = () => {
    return (
        <CssVarsProvider defaultMode="dark" disableTransitionOnChange>
          <CssBaseline />
          <GlobalStyles
            styles={{
              ':root': {
                '--Collapsed-breakpoint': '769px', // form will stretch when viewport is below `769px`
                '--Cover-width': '50vw', // must be `vw` only
                '--Form-maxWidth': '800px',
                '--Transition-duration': '0.4s', // set to `none` to disable transition
              },
            }}
          />
          <Box
            sx={(theme) => ({
              width:
                'clamp(100vw - var(--Cover-width), (var(--Collapsed-breakpoint) - 100vw) * 999, 100vw)',
              transition: 'width var(--Transition-duration)',
              transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
              position: 'relative',
              zIndex: 1,
              display: 'flex',
              justifyContent: 'center',
              alignItems:  'center',
              backdropFilter: 'blur(12px)',
              backgroundColor: 'rgba(255 255 255 / 0.2)',
              [theme.getColorSchemeSelector('dark')]: {
                backgroundColor: 'rgba(19 19 24 / 0.4)',
              },
            })}
          >
            {/* <Box
              sx={{
                display: 'flex',
                flexDirection: 'column',
                minHeight: '100dvh',
                width:
                  'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
                maxWidth: '100%',
                px: 2,
              }}
            > */}
             
              <Box
                component="main"
                sx={{
                  my: 'auto',
                  py: 2,
                  pb: 5,
                 display: 'flex',
                 flexDirection: 'column',
                 gap: 2,
                 width: 400,
                  maxWidth: '100%',
                  mx: 'auto',
                  borderRadius: 'sm',
                  '& form': {
                    display: 'flex',
                    flexDirection: 'column',
                    gap: 2,
                  },
                  [`& .${formLabelClasses.asterisk}`]: {
                    visibility: 'hidden',
                  },
                }}
              >
                <Stack gap={4} sx={{ mb: 2 }}>
                  <Stack gap={1}>
                    <Typography level="h3">Sign in</Typography>
                    <Typography level="body-sm">
                      New to company?{' '}
                      <Link href="#replace-with-a-link" level="title-sm">
                        Sign up!
                      </Link>
                    </Typography>
                  </Stack>
                  
                </Stack>
                <Divider
                  sx={(theme) => ({
                    [theme.getColorSchemeSelector('light')]: {
                      color: { xs: '#FFF', md: 'text.tertiary' },
                      '--Divider-lineColor': {
                        xs: '#FFF',
                        md: 'var(--joy-palette-divider)',
                      },
                    },
                  })}
                >
                  or
                </Divider>
                <Stack gap={4} sx={{ mt: 2 }}>
                  <form
                    onSubmit={(event: React.FormEvent<SignInFormElement>) => {
                      event.preventDefault();
                      const formElements = event.currentTarget.elements;
                      const data = {
                        email: formElements.email.value,
                        password: formElements.password.value,
                        persistent: formElements.persistent.checked,
                      };
                      alert(JSON.stringify(data, null, 2));
                    }}
                  >
                    <FormControl required>
                      <FormLabel>Email</FormLabel>
                      <Input type="email" name="email" />
                    </FormControl>
                    <FormControl required>
                      <FormLabel>Password</FormLabel>
                      <Input type="password" name="password" />
                    </FormControl>
                    <Stack gap={4} sx={{ mt: 2 }}>
                      <Box
                        sx={{
                          display: 'flex',
                          justifyContent: 'space-between',
                          alignItems: 'center',
                        }}
                      >
                        <Checkbox size="sm" label="Remember me" name="persistent" />
                        <Link level="title-sm" href="#replace-with-a-link">
                          Forgot your password?
                        </Link>
                      </Box>
                      <Button type="submit" fullWidth>
                        Sign in
                      </Button>
                    </Stack>
                  </form>
                </Stack>
              </Box>
              <Box component="footer" sx={{ py: 3 }}>
                <Typography level="body-xs" textAlign="center">
                  © Your company {new Date().getFullYear()}
                </Typography>
              </Box>
            {/* </Box> */}
          </Box>
        </CssVarsProvider>
      );
    }
     
    

export default Login