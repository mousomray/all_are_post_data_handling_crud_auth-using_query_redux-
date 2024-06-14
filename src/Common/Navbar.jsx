import * as React from 'react';
import { toast } from 'react-toastify';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import Typography from '@mui/material/Typography';
import Menu from '@mui/material/Menu';
import MenuIcon from '@mui/icons-material/Menu';
import Container from '@mui/material/Container';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import Tooltip from '@mui/material/Tooltip';
import MenuItem from '@mui/material/MenuItem';
import FitnessCenterIcon from '@mui/icons-material/FitnessCenter';
import { Link } from 'react-router-dom';
import { useNavigate } from 'react-router-dom';

import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../Auth/authslice';

const pages = ['Home', 'Addproduct', 'Showproduct'];
const settings = ['Profile', 'Account', 'Dashboard', 'Logout'];


// Function For Profile Picture
export const profile_pic = (kkr) => {
    return `https://wtsacademy.dedicateddevelopers.us` + `/uploads/user/profile_pic/${kkr}`;
}


function ResponsiveAppBar() {
    const dispatch = useDispatch();
    const { Logouttoggle } = useSelector((state) => state?.Auth);
    const name = localStorage.getItem("name");
    const proimg = localStorage.getItem("proimg") // Get Profile picture from local storage
    const navigate = useNavigate()

    const handleLogout = () => {
        dispatch(logout())
        navigate("/login")
    }

    const [anchorElNav, setAnchorElNav] = React.useState(null);
    const [anchorElUser, setAnchorElUser] = React.useState(null);

    const handleOpenNavMenu = (event) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event) => {
        setAnchorElUser(event.currentTarget);
    };

    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <>
            <AppBar position="fixed" sx={{ backgroundColor: 'blue' }}>
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <FitnessCenterIcon sx={{ display: { xs: 'none', md: 'flex' }, mr: 1, fontSize: '50px' }} />
                        <Typography
                            variant="h6"
                            noWrap
                            component={Link}
                            to="/"
                            sx={{
                                mr: 2,
                                display: { xs: 'none', md: 'flex' },
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            REDUXCRUD
                        </Typography>

                        <Box sx={{ flexGrow: 1, display: { xs: 'flex', md: 'none' } }}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon />
                            </IconButton>
                            <Menu
                                id="menu-appbar"
                                anchorEl={anchorElNav}
                                anchorOrigin={{
                                    vertical: 'bottom',
                                    horizontal: 'left',
                                }}
                                keepMounted
                                transformOrigin={{
                                    vertical: 'top',
                                    horizontal: 'left',
                                }}
                                open={Boolean(anchorElNav)}
                                onClose={handleCloseNavMenu}
                                sx={{
                                    display: { xs: 'block', md: 'none' },
                                }}
                            >
                                {pages.map((page) => (
                                    <MenuItem key={page} onClick={handleCloseNavMenu}>
                                        <Link to={page === 'Home' ? '/' : `/${page.toLowerCase()}`} style={{ textDecoration: 'none', color: 'inherit' }}>
                                            <Typography textAlign="center">{page}</Typography>
                                        </Link>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>

                        <Typography
                            variant="h5"
                            noWrap
                            component="a"
                            href="#app-bar-with-responsive-menu"
                            sx={{
                                mr: 2,
                                display: { xs: 'flex', md: 'none' },
                                flexGrow: 1,
                                fontFamily: 'monospace',
                                fontWeight: 700,
                                letterSpacing: '.3rem',
                                color: 'inherit',
                                textDecoration: 'none',
                            }}
                        >
                            REDUXCRUD
                        </Typography>
                        <Box sx={{ flexGrow: 1, display: { xs: 'none', md: 'flex' }, justifyContent: 'flex-end' }}>
                            {pages.map((page) => (
                                <Button
                                    key={page}
                                    component={Link}
                                    to={page === 'Home' ? '/' : `/${page.toLowerCase()}`}
                                    sx={{ my: 2, color: 'white', display: 'block' }}
                                >
                                    {page}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{ flexGrow: 0 }}>
                            {Logouttoggle ? (
                                <>
                                    <Tooltip title="Open settings">
                                        <IconButton onClick={handleOpenUserMenu} sx={{ p: 0 }}>
                                            <Avatar alt={name} src={
                                                proimg
                                                    ? profile_pic(proimg)
                                                    : "error"
                                            } />
                                        </IconButton>
                                    </Tooltip>
                                    <Menu
                                        sx={{ mt: '45px' }}
                                        id="menu-appbar"
                                        anchorEl={anchorElUser}
                                        anchorOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        keepMounted
                                        transformOrigin={{
                                            vertical: 'top',
                                            horizontal: 'right',
                                        }}
                                        open={Boolean(anchorElUser)}
                                        onClose={handleCloseUserMenu}
                                    >
                                        {settings.map((setting) => (
                                            <MenuItem key={setting} onClick={setting === 'Logout' ? handleLogout : handleCloseUserMenu}>
                                                {setting === 'Profile' ? (
                                                    <Typography textAlign="center">Profile: {name}</Typography>
                                                ) : (
                                                    <Typography textAlign="center">
                                                        <Link to={`/${setting.toLowerCase()}`}>{setting}</Link>
                                                    </Typography>
                                                )}
                                            </MenuItem>
                                        ))}

                                    </Menu>
                                </>
                            ) : (
                                <Button component={Link} to="/login" sx={{ color: 'inherit', textDecoration: 'none' }}>
                                    Login
                                </Button>
                            )}
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
        </>
    );
}

export default ResponsiveAppBar;