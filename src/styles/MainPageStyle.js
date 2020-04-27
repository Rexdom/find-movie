const MainPageStyle = function(theme, fade) {
    return {
        backgroundRoot:{
            display: 'flex',
            alignItems: 'start',
            justifyContent: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            overflow: 'hidden',
            width: '100vw',
            height:'calc(100vw * 0.5)',
            [theme.breakpoints.down('xs')]: {
                height:'70vh'
            },
        },
        background: {
            width: '100vw',
            [theme.breakpoints.down('xs')]: {
                width: 'auto',
                height:'75vh'
            },
        },
        nobackground:{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: fade(theme.palette.divider, 0.4),
            height:'128px', 
            width:'100vw',
        },
        checkLoading: {
            height: '60px',
            position: 'absolute',
        },
        progressive: {
            animation: `$blur 500ms steps(5, end)` 
        },
        "@keyframes blur": {
            "0%": {
                filter: 'blur(15px)',
            },
            "100%": {
                filter: 'blur(0)',
            }
        },
        withImg: {
            marginTop: 'calc(100vw * 0.5625 - 70px)',
            [theme.breakpoints.down('xs')]: {
                marginTop:'calc(75vh)'
            },
        },
        withoutImg: {
            marginTop: '150px',
        },
        root: {
            display: 'flex',
            justifyContent: 'center',
            flexWrap: 'wrap',
            '& > *': {
                [theme.breakpoints.up('xs')]: {
                margin: theme.spacing(1),
                width: theme.spacing(16),
                height: theme.spacing(31),
                },
                [theme.breakpoints.up('sm')]: {
                margin: theme.spacing(2),
                width: theme.spacing(19),
                height: theme.spacing(35.5),
                },
                [theme.breakpoints.up('md')]: {
                margin: theme.spacing(3),
                width: theme.spacing(26),
                height: theme.spacing(46),
                },
                [theme.breakpoints.up('lg')]: {
                margin: theme.spacing(4),
                width: theme.spacing(30),
                height: theme.spacing(52),
                },
            }
        }
    }
};

export default MainPageStyle;
  