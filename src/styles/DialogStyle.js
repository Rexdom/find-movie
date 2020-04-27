const DialogStyle = function(theme){
    return {
        backdrop:{
            maxWidth:'780px', 
            width:'100%'
        },
        closeButton: {
            position: 'absolute',
            right: theme.spacing(1),
            top: theme.spacing(1),
            color: theme.palette.grey[500],
        },
    }
}

export default DialogStyle