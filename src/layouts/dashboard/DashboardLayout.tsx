import Stack from '@mui/joy/Stack';
import Box from '@mui/joy/Box';
import { Menu, MenuButton, MenuItem } from '@mui/joy';
import {Dropdown} from '@mui/joy';
import { IconButton } from '@mui/joy';
import MenuIcon  from '@mui/icons-material/Menu';

const DashboardLayout = () => {
    // Your component logic goes here

    return (
        <Stack>
            <Box>
                <p>Morse Code App</p>
                <Dropdown>
                    <MenuButton
                        slots={{ root: IconButton }} slotProps={{ root: { variant: 'outlined', color: 'neutral' } }}>
                            <MenuIcon />
                    </MenuButton>
                    <Menu>
                        <MenuItem>Menu</MenuItem>
                        <MenuItem>Sign Out</MenuItem>
                        <MenuItem>User Profile</MenuItem>
                    </Menu>
                </Dropdown>
            </Box>
            <Box><p>Enter text to convert to Morse Code</p></Box>

        </Stack>
    );
};

export default DashboardLayout;