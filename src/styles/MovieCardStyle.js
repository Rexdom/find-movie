const MovieCardStyle = function(theme, fade){
    return {
        main: {
            width: '100%',
            height: '100%',
            color: theme.palette.text.secondary,
        },
        actionArea: {
            width: '100%',
            height: 'calc(100% - 56px)',
            backgroundColor: theme.palette.divider,
            '&:hover picture + p': {
                opacity: '0'
            },
        },
        media: {
            width: '100%',
            height: '100%',
        },
        showName: {
            [theme.breakpoints.up('xs')]: {
                fontSize:'12px',
                lineHeight:'22px',
            },
            [theme.breakpoints.up('sm')]: {
                fontSize:'14px',
                lineHeight:'22px',
            },
            [theme.breakpoints.up('md')]: {
                fontSize:'18px',
                lineHeight:'23px',
            },
            [theme.breakpoints.up('lg')]: {
                fontSize:'21px',
                lineHeight:'25px',
            },
            wordBreak: 'break-all',
            fontFamily: `'Roboto Mono', monospace`,
            overflow: 'hidden',
            position: 'absolute',
            maxHeight:'50px',
            top: '0',
            left: '0',
            right: '0',
            padding: '2px 1px',
            transition: 'opacity 500ms',
            backgroundColor: fade(theme.palette.background.paper, 0.7)
        },
        hideName: {
            display:'none'
        },
        actions: {
            height: '56px',
            padding: 0,
        },
        buttonLeft: {
            marginLeft: 'auto',
        }
    }
}

export default MovieCardStyle