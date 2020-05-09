const HeaderStyle = function(theme, fade){
  return {
    appBar: {
        transition: "all 500ms ease",
        left:'0px',
        boxSizing:'content-box',
    },
    transparent: {
        backgroundColor: "transparent !important",
        color: "#FFFFFF",
        boxShadow: 'none',
    },
    opaque: {
        color: theme.palette.text.primary,
        backgroundColor: theme.palette.background.paper,
        boxShadow:
          "0 4px 18px 0px rgba(0, 0, 0, 0.12), 0 7px 10px -5px rgba(0, 0, 0, 0.15)"
    },
    toolbar: {
        borderBottom: `1px solid `,
        minHeight: '64px',
        display:'flex'
    },
    toolbarTitle: {
        flex: 2,
    },
    search: {
        position: 'relative',
        borderRadius: theme.shape.borderRadius,
        backgroundColor: fade(theme.palette.background.default, 0.4),
        '&:hover': {
          backgroundColor: fade(theme.palette.background.default, 0.8),
        },
        marginLeft: 0,
        marginRight: theme.spacing(0.5),
        transition: theme.transitions.create('width'),
        '&:focus-within': {
            [theme.breakpoints.up('sm')]: {
                width:'350px',
            },
            [theme.breakpoints.up('md')]: {
                width:'500px',
            },
            backgroundColor: fade(theme.palette.background.default, 0.6),
        },
        [theme.breakpoints.down('sm')]: {
            flex:1,
        },
        [theme.breakpoints.up('sm')]: {
            width:'250px',
        },
    },
    searchIcon: {
        padding: theme.spacing(0, 2),
        height: '100%',
        position: 'absolute',
        pointerEvents: 'none',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
    },
    inputBase: {
        width:'100%'
    },
    inputInput: {
        padding: theme.spacing(1, 1, 1, 0),
        color: theme.palette.text.primary,
        // vertical padding + font size from searchIcon
        paddingLeft: `calc(1em + ${theme.spacing(4)}px)`,
        width: '100%',
    },
    IconList: {
        display: 'flex',
    },
    IconButton: {
        height: '100%',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        color:'inherit',
    },
    MenuItem: {
        cursor:"default",
    },
    toolbarSpacing: {
        marginRight: `2rem`,
    },
    toolbarSecondary: {
        justifyContent: 'space-between',
        overflowX: 'auto',
        minHeight: '64px'
    },
    toolbarLink: {
        padding: theme.spacing(1),
        flexShrink: 0,
    },
  }
};

export default HeaderStyle;
  