const LogInDialogStyle = function (theme) {
  return {
    warning: {
      margin: "0 30px 10px",
    },
    root: {
      margin: "0 30px 15px 30px",
      display: "flex",
      flexDirection: "column",
    },
    input: {
      marginBottom: "10px",
    },
    inputPass: {
      marginBottom: "5px",
    },
    button: {
      margin: "5px",
    },
    loading: {
      margin: "5px",
      alignSelf: "center",
    },
    message: {
      alignSelf: "center",
      marginTop: "20px",
    },
  };
};

export default LogInDialogStyle;
