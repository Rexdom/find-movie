const DialogStyle = function(theme){
    return {
        backdrop:{
            maxWidth:'780px', 
            width:'100%'
        },
        movieName:{
            maxWidth:'calc(100% - 25px)'
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
        content: {
            minHeight: '30vh',
        },
        description: {
            marginBottom: '15px',
        },
        scoreWrapper: {
            marginBottom: '15px',
            display: 'flex',
        },
        score: {
            display: 'flex',
            margin: '0 5px',
            alignItems: 'center',
        },
        scoreIcon: {
            width: '25px',
            height: '25px',
            margin: '0 2px',
        },
        contentBackground: {
            backgroundColor: theme.palette.divider,
            marginBottom: '15px',
        },
        mediaContainer: {
            display:'flex',
            position:'relative',
            justifyContent:'center',
            alignItems:'center',
            padding:'0 3%',
        },
        outerWrapper: {
            minHeight:'10vh',
            width:'70vw',
            overflow:'hidden',
            textAlign: 'center'
        },
        innerWrapper: {
            display:'inline-flex',
            transition:'transform 1s',
            textAlign: 'center'
        },
        arrowBack: {
            position:'absolute',
            left:0,
        },
        arrowForward: {
            position:'absolute',
            right:0,
        },
        offerContainer: {
            padding:'3%'
        },
        commentUser:{
            lineHeight:'0.8',
            fontSize:'1.2rem',
        },
        commentInput: {
            flex:1,
            marginRight:'auto',
            minWidth: '100px'
        }
    }
}

export default DialogStyle