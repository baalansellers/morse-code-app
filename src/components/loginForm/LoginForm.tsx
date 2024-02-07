import React from "react";
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
import { useColorScheme } from '@mui/joy/styles';

interface FormElements extends HTMLFormControlsCollection {
    email: HTMLInputElement;
    password: HTMLInputElement;
    persistent: HTMLInputElement;
  }

interface SignInFormElement extends HTMLFormElement {
    readonly elements: FormElements;
  }

const Login: React.FC = () => {
  const {setMode} = useColorScheme()

  setMode('light');

    return (
      <>
          <Box
            sx={() => ({
              width: '100vw',
              transition: 'width var(--Transition-duration)',
              transitionDelay: 'calc(var(--Transition-duration) + 0.1s)',
              display: 'flex',
              justifyContent: 'center',
              alignItems:  'center',
              backgroundColor: '#6ebe4f',
              height: '100vh'
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
            component='main'
            sx={() => ({
              minHeight: '400px',
              width: 'clamp(var(--Form-maxWidth), (var(--Collapsed-breakpoint) - 100vw) * 999, 100%)',
              maxWidth: '100%',
              backgroundColor: '#fff',
              px: 2,
            })}
          >
             
              {/* <Box
                component="main"
                sx={{
                 minHeight: '60dvh',
                 width: 400,
                  maxWidth: '100%',
                  [`& .${formLabelClasses.asterisk}`]: {
                    visibility: 'hidden',
                  },
                  backgroundColor: '#FFF'
                }}
              > */}
            <Stack gap={4} sx={{ mb: 2 }}>
              <Stack gap={1}>
                <Typography level="h1"
                >Sign in</Typography>
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
          </>
      );
    }
     
    

export default Login