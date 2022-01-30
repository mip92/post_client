/*
    const {login} = useContext(Context)
    if (login.isAuth) return (
        <div>
            <NavLink to="/posts">Мои посты</NavLink>
            <button onClick={()=>login.logout()}>Выйти</button>
            {children}
        </div>
    );
    else return (
        <div>
            <NavLink to="/registration">Регистрация</NavLink>
            <NavLink to="/login">Войти</NavLink>
            {children}
        </div>
    )
};*/

import { useNavigate } from 'react-router-dom';
import * as React from 'react';
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
import {observer} from "mobx-react-lite";
import {FC, useContext, useEffect, useState} from "react";
import { Context } from '..';
interface page{
    text:string,
    url:string
}

const settings = ['My Posts', 'Logout'];


const Header: FC = ({children}) => {
    const {login} = useContext(Context)
    const [pages, setPage] = useState<page[]>([
        {text:'Posts', url:'/posts'},
        {text:'Users', url:'/users'}])

    useEffect(()=>{
        if (login.isAuth)  setPage([
            {text:'Posts', url:'/posts'},
            {text:'Users', url:'/users'}])
        else  setPage([
            {text:'Registration', url:'/registration'},
            {text:'Login', url:'/login'}
        ])
    },[login.isAuth])
    const navigate = useNavigate();
    const [anchorElNav, setAnchorElNav] = React.useState<null | HTMLElement>(null);
    const [anchorElUser, setAnchorElUser] = React.useState<null | HTMLElement>(null);
    const handleOpenNavMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElNav(event.currentTarget);
    };
    const handleOpenUserMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorElUser(event.currentTarget);
    };
    const goTo = (page:page) =>{
        navigate(page.url);
        setAnchorElNav(null);
    }
    const handleCloseNavMenu = () => {
        setAnchorElNav(null);
    };

    const handleCloseUserMenu = () => {
        setAnchorElUser(null);
    };

    return (
        <div>
            <AppBar position="static">
                <Container maxWidth="xl">
                    <Toolbar disableGutters>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{mr: 2, display: {xs: 'none', md: 'flex'}}}
                        >
                            POST
                        </Typography>

                        <Box sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}>
                            <IconButton
                                size="large"
                                aria-label="account of current user"
                                aria-controls="menu-appbar"
                                aria-haspopup="true"
                                onClick={handleOpenNavMenu}
                                color="inherit"
                            >
                                <MenuIcon/>
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
                                    display: {xs: 'block', md: 'none'},
                                }}
                            >
                                {pages.map((page, key) => (
                                    <MenuItem key={key} onClick={()=>goTo(page)}>
                                        <Typography textAlign="center">{page.text}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                        <Typography
                            variant="h6"
                            noWrap
                            component="div"
                            sx={{flexGrow: 1, display: {xs: 'flex', md: 'none'}}}
                        >
                            LOGO
                        </Typography>
                        <Box sx={{flexGrow: 1, display: {xs: 'none', md: 'flex'}}}>
                            {pages.map((page, key) => (
                                <Button
                                    key={key}
                                    onClick={()=>goTo(page)}
                                    sx={{my: 2, color: 'white', display: 'block'}}
                                >
                                    {page.text}
                                </Button>
                            ))}
                        </Box>

                        <Box sx={{flexGrow: 0}}>
                            <Tooltip title="Open settings">
                                <IconButton onClick={handleOpenUserMenu} sx={{p: 0}}>
                                    <Avatar alt="Remy Sharp" src="/static/images/avatar/2.jpg"/>
                                </IconButton>
                            </Tooltip>
                            <Menu
                                sx={{mt: '45px'}}
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
                                    <MenuItem key={setting} onClick={handleCloseUserMenu}>
                                        <Typography textAlign="center">{setting}</Typography>
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Toolbar>
                </Container>
            </AppBar>
            {children}
        </div>
    );
};
export default observer(Header);