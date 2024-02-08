import { Box, Button, Stack } from '@mui/joy'
import { Link } from 'react-router-dom'

const LandingPage = () => {
  return (
    <Box
      sx={() => ({
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        padding: 2,
        borderBottom: '1px solid #e0e0e0',
      })}
    >
      <Stack>
        <Box
          sx={{
            padding: 2,
            backgroundColor: '#6ebe4f',
          }}
        >
          <Stack gap={4} sx={{ my: 1 }}>
            <Button>Practice</Button>
            <Button component={Link} to='/freeplay'>
              Free play
            </Button>
          </Stack>
        </Box>
        <p>Enter text to convert to Morse Code</p>
      </Stack>
    </Box>
  )
}

export default LandingPage
