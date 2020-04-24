import React, {useState, useEffect} from 'react';
import Toolbar from '@material-ui/core/Toolbar';
import Button from '@material-ui/core/Button';
import Typography from '@material-ui/core/Typography';
import Link from 'next/link';
import AppBar from '@material-ui/core/AppBar';
import InputBase from '@material-ui/core/InputBase';
import SearchIcon from '@material-ui/icons/Search';
import Menu from '@material-ui/core/Menu';
import MenuItem from '@material-ui/core/MenuItem';
import SettingsIcon from '@material-ui/icons/Settings';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Switch from '@material-ui/core/Switch';
import styles from '../styles/HeaderStyle';
import {makeStyles, fade} from '@material-ui/core/styles';
import useScrollTrigger from '@material-ui/core/useScrollTrigger';

const useStyles = makeStyles(theme => ({
    ...styles(theme, fade),
}));

export default function Header(props) {
    const classes = useStyles();
    const { sections, title, router, mode, toggleMode, showName, toggleShowName} = props;
    const [input, setInput] = useState('');
    const [anchorEl, setAnchorEl] = React.useState(null);

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
        if (input.match(/^[\d\w\s\-+*?$&()"']+$/)) router.push('/search/[keyword]',`/search/${encodeURIComponent(input)}`);
        else return
    }

    function openMenu(e) {
        setAnchorEl(e.currentTarget)
    }

    function closeMenu() {
        setAnchorEl(null)
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
                <div>
                    <Button onClick={openMenu} className={classes.MenuIcon}>
                        <SettingsIcon />
                    </Button>
                    <Menu
                        anchorEl={anchorEl}
                        keepMounted
                        open={Boolean(anchorEl)}
                        onClose={closeMenu}
                    >
                        <MenuItem className={classes.MenuItem}>
                            <FormControlLabel
                                control={<Switch
                                    checked={mode==="dark"}
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
                                    checked={showName==="true"}
                                    name="ShowName"
                                    color="primary"
                                />}
                                onChange={toggleShowName}
                                label="Show movie name"
                            />
                        </MenuItem>
                    </Menu>
                </div>
            </Toolbar>
            <Toolbar component="nav" className={classes.toolbarSecondary}>
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
            </Toolbar>
        </AppBar> 
    </React.Fragment>
  );
}