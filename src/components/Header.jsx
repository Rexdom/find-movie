import React, {useState, useEffect} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import Hidden from '@material-ui/core/Hidden';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import MenuIcon from '@material-ui/icons/Menu';
import IconButton from '@material-ui/core/IconButton';
import SettingsIcon from '@material-ui/icons/Settings';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import BookmarksIcon from '@material-ui/icons/Bookmarks';
import AssignmentIndIcon from '@material-ui/icons/AssignmentInd';
import ExitToAppIcon from '@material-ui/icons/ExitToApp';
import LogInDialog from './LogInDialog';
import styles from '../styles/HeaderStyle';
import {makeStyles, fade} from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const useStyles = makeStyles(theme => ({
    ...styles(theme, fade),
}));

export default function Header(props) {
    const classes = useStyles();
    const { sections, title, router, mode, toggleMode, showName, toggleShowName, isLogIn , changeLogIn } = props;
    const [input, setInput] = useState('');
    const [openLogIn, setOpenLogIn] = useState(false);
    const [anchorEl, setAnchorEl] = useState(null);
    const [anchorEl2, setAnchorEl2] = useState(null);

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 20,
    });

    useEffect(() => {
        window.scrollTo(0, window.scrollY-1);
    },[]);

    function handleChange(e) {
        setInput(e.target.value);
    }

    function submit(e) {
        e.preventDefault();
        if (input.match(/^[\d\w\s\-+*?#@$&()"']+$/)) router.push('/search/[keyword]',`/search/${encodeURIComponent(input)}`);
        else return
    }

    function openMenu(e) {
        setAnchorEl(e.currentTarget)
    }

    function openMenu2(e) {
        setAnchorEl2(e.currentTarget)
    }

    function closeMenu() {
        setAnchorEl(null)
    }

    function closeMenu2() {
        setAnchorEl2(null)
    }

    function displayLogInForm() {
        setOpenLogIn(true)
    }

    function closeLogInForm() {
        setOpenLogIn(false)
    }

    function logout(){
        changeLogIn(null);
    }

  return (
    <React.Fragment>
        <AppBar 
            color='transparent'
            className={`${trigger?classes.opaque:classes.transparent} ${classes.appBar}`}
        >
            <Toolbar className={classes.toolbar}>
                <Typography
                    component="h2"
                    variant="h5"
                    color="inherit"
                    align="left"
                    noWrap
                    className={classes.toolbarTitle}
                >
                {title}
                </Typography>
                <Hidden xsDown>
                    <form onSubmit={submit} className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            className={classes.inputBase}
                            classes={{
                                input: classes.inputInput,
                            }}
                            value={input}
                            onChange={handleChange}
                        />
                    </form>
                </Hidden>
                <Hidden smUp>
                    <IconButton onClick={openMenu2} className={classes.IconButton}>
                        <MenuIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl2}
                        keepMounted
                        open={Boolean(anchorEl2)}
                        onClose={closeMenu2}
                    >
                        {sections.map(section => (
                        <MenuItem key={section.title}>
                            <Link
                                href={section.url}
                                as={section.url_as?section.url_as:undefined}
                                scroll
                            >
                                <Typography color="inherit">{section.title}</Typography>
                            </Link>
                        </MenuItem>
                        ))}
                    </Menu>
                </Hidden>
                <div className={classes.IconList}>
                    <IconButton onClick={openMenu} className={classes.IconButton}>
                        <SettingsIcon />
                    </IconButton>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={closeMenu}
                    >
                        <MenuItem className={classes.MenuItem}>
                            <FormControlLabel
                                control={<Switch
                                    checked={mode}
                                    name="DarkMode"
                                    color="primary"
                                />}
                                onChange={toggleMode}
                                label="Dark Mode"
                            />
                        </MenuItem>
                        <MenuItem className={classes.MenuItem}>
                            <FormControlLabel
                                control={<Switch
                                    checked={showName}
                                    name="ShowName"
                                    color="primary"
                                />}
                                onChange={toggleShowName}
                                label="Show movie name"
                            />
                        </MenuItem>
                    </Menu>
                    {isLogIn===false && 
                    <IconButton onClick={displayLogInForm} className={classes.IconButton}>
                        <AssignmentIndIcon />
                    </IconButton>}
                    {isLogIn && 
                    <>
                        <Link
                            href='/watchlist'
                            passHref
                            scroll
                        >
                            <IconButton className={classes.IconButton}>
                                <BookmarksIcon />
                            </IconButton>
                        </Link>    
                        <IconButton onClick={logout} className={classes.IconButton}>
                            <ExitToAppIcon />
                        </IconButton>
                    </>}    
                </div>
            </Toolbar>
            <Toolbar component="nav" className={classes.toolbarSecondary}>
                <Hidden smUp>
                    <form onSubmit={submit} className={classes.search}>
                        <div className={classes.searchIcon}>
                            <SearchIcon />
                        </div>
                        <InputBase
                            placeholder="Search…"
                            className={classes.inputBase}
                            classes={{
                                input: classes.inputInput,
                            }}
                            value={input}
                            onChange={handleChange}
                        />
                    </form>
                </Hidden>
                <Hidden xsDown>
                    {sections.map(section => (
                    <Link
                        key={section.title}
                        href={section.url}
                        as={section.url_as?section.url_as:undefined}
                        passHref
                        scroll
                    >
                        <Button 
                            component="a"
                            color="inherit"
                            className={classes.toolbarLink}
                        >{section.title}</Button>
                    </Link>
                    ))}
                </Hidden>
            </Toolbar>
        </AppBar> 
        <LogInDialog open={openLogIn} onClose={closeLogInForm} changeLogIn={changeLogIn}/>
    </React.Fragment>
  );
}