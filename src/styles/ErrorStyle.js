const ErrorStyle = function(theme, fade) {
    return {
        headerBackground:{
            position: 'absolute',
            top: 0,
            left: 0,
            backgroundColor: fade(theme.palette.divider, 0.4),
            height:'128px', 
            width:'100vw',
        },
        message:{
            marginTop:'150px',
        }
    }
}


export default ErrorStyle;