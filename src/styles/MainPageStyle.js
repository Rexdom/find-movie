const MainPageStyle = function(theme, fade) {
    return {
        backgroundRoot:{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            alignItems: 'center',
            position: 'absolute',
            top: 0,
            left: 0,
            overflow: 'hidden',
            width: '100vw',
            height:'50vw',
            [theme.breakpoints.down('xs')]: {
                height:'70vh'
            },
        },
        background: {
            position: 'absolute',
            top: 0,
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
        title:{
            fontFamily: 'Roboto,Helvetica,Arial,sans-serif',
            textTransform: 'capitalize',
            display: 'flex',
            justifyContent: 'center',
            alignItems: 'flex-end',
            position: 'absolute',
            left:0,
            top:0,
            width:'100vw',
            zIndex:'2',
            height:'50vw',
            [theme.breakpoints.down('xs')]: {
                height:'70vh'
            },
        },
        h1:{
            margin: '1%',
            fontWeight: '500',
            color: 'white',
            [theme.breakpoints.up('xs')]: {
                fontSize: '20vw',
                },
                [theme.breakpoints.up('sm')]: {
                fontSize: theme.spacing(15),
                },
                [theme.breakpoints.up('md')]: {
                fontSize: theme.spacing(21),
                },
                [theme.breakpoints.up('lg')]: {
                fontSize: theme.spacing(24),
                },
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
            marginTop: 'calc(100vw * 0.5625 - 50px)',
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
        },
        section:{
            marginBottom: '100px',
        }
    }
};

export default MainPageStyle;
  