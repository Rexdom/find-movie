const headerStyle = {
    absolute: {
      position: "absolute",
      zIndex: "1100"
    },
    fixed: {
      position: "fixed",
      zIndex: "1100"
    },
    container: {
      minHeight: "50px",
      flex: "1",
      alignItems: "center",
      justifyContent: "space-between",
      display: "flex",
      flexWrap: "nowrap"
    },
    flex: {
      flex: 1
    },
    title: {
      lineHeight: "30px",
      fontSize: "18px",
      borderRadius: "3px",
      textTransform: "none",
      color: "inherit",
      padding: "8px 16px",
      letterSpacing: "unset",
      "&:hover,&:focus": {
        color: "inherit",
        background: "transparent"
      }
    },
    appResponsive: {
      margin: "20px 10px"
    },
    // primary: {
    //   backgroundColor: primaryColor,
    //   color: "#FFFFFF",
    //   boxShadow:
    //     "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(156, 39, 176, 0.46)"
    // },
    // info: {
    //   backgroundColor: infoColor,
    //   color: "#FFFFFF",
    //   boxShadow:
    //     "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(0, 188, 212, 0.46)"
    // },
    // success: {
    //   backgroundColor: successColor,
    //   color: "#FFFFFF",
    //   boxShadow:
    //     "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(76, 175, 80, 0.46)"
    // },
    // warning: {
    //   backgroundColor: warningColor,
    //   color: "#FFFFFF",
    //   boxShadow:
    //     "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(255, 152, 0, 0.46)"
    // },
    // danger: {
    //   backgroundColor: dangerColor,
    //   color: "#FFFFFF",
    //   boxShadow:
    //     "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(244, 67, 54, 0.46)"
    // },
    // rose: {
    //   backgroundColor: roseColor,
    //   color: "#FFFFFF",
    //   boxShadow:
    //     "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(233, 30, 99, 0.46)"
    // },
    dark: {
      color: "#FFFFFF",
      backgroundColor: "#212121 !important",
      boxShadow:
        "0 4px 20px 0px rgba(0, 0, 0, 0.14), 0 7px 12px -5px rgba(33, 33, 33, 0.46)"
    },
    // drawerPaper: {
    //   border: "none",
    //   bottom: "0",
    //   transitionProperty: "top, bottom, width",
    //   transitionDuration: ".2s, .2s, .35s",
    //   transitionTimingFunction: "linear, linear, ease",
    //   width: drawerWidth,
    //   ...boxShadow,
    //   position: "fixed",
    //   display: "block",
    //   top: "0",
    //   height: "100vh",
    //   right: "0",
    //   left: "auto",
    //   visibility: "visible",
    //   overflowY: "visible",
    //   borderTop: "none",
    //   textAlign: "left",
    //   paddingRight: "0px",
    //   paddingLeft: "0",
    //   ...transition
    // }
};

export default headerStyle;
  