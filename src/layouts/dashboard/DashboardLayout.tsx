import Stack from '@mui/joy/Stack'
import Box from '@mui/joy/Box'
import Menu from '@mui/joy/Menu'
import MenuButton from '@mui/joy/MenuButton'
import MenuItem from '@mui/joy/MenuItem'
import Dropdown from '@mui/joy/Dropdown'
import IconButton from '@mui/joy/IconButton'
import MenuIcon from '@mui/icons-material/Menu'
import { PropsWithChildren } from 'react'

const DashboardLayout = (props: PropsWithChildren) => {
  // Your component logic goes here

  return (
    <Stack>
      <Box
        sx={() => ({
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          padding: 2,
          borderBottom: '1px solid #e0e0e0',
        })}
      >
        <Box>
          <p>Morse Code App</p>
        </Box>
        <Box>
          <Dropdown>
            <MenuButton
              slots={{ root: IconButton }}
              slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}
            >
              <MenuIcon />
            </MenuButton>
            <Menu>
              <MenuItem>Menu</MenuItem>
              <MenuItem>Sign Out</MenuItem>
              <MenuItem>User Profile</MenuItem>
            </Menu>
          </Dropdown>
        </Box>
      </Box>
      {props.children}
    </Stack>
  )
}

export default DashboardLayout
