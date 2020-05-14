import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import CircularProgress from "@material-ui/core/CircularProgress";
import Dialog from "@material-ui/core/Dialog";
import DialogTitle from "@material-ui/core/DialogTitle";
import TextField from "@material-ui/core/TextField";
import styles from "../styles/LogInDialogStyle";
import Typography from "@material-ui/core/Typography";
import Link from "@material-ui/core/Link";

const useStyles = makeStyles((theme) => ({
  ...styles(theme),
}));

export default function AlertDialogSlide(props) {
  const { open, onClose, changeLogIn } = props;
  const [type, setType] = useState("Log In");
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [repassword, setRepassword] = useState("");
  const [err, setErr] = useState({});
  const classes = useStyles();

  function switchType(e) {
    e.preventDefault();
    if (!loading) {
      setErr({});
      setEmail("");
      setPassword("");
      setRepassword("");
      setType(type === "Log In" ? "Sign Up" : "Log In");
    }
  }

  function changeEmail(e) {
    setEmail(e.target.value);
  }

  function changePassword(e) {
    setPassword(e.target.value);
  }

  function changeRepassword(e) {
    setRepassword(e.target.value);
  }

  function handleSubmit(e) {
    e.preventDefault();
    let error = {};
    setLoading(true);
    if (!email.length) error.email = "Email cannot be empty";
    else if (!email.match(/^[\S]+@[\S]{2,}\.[\S]{2,}$/))
      error.email = "Invalid email format";
    if (!password) error.password = "Password cannot be empty";
    else if (password.length < 6) error.password = "Invalid password";
    if (type === "Sign Up") {
      if (repassword !== password)
        error.repassword = "The re-enter password is different";
    }
    setErr(error);
    if (Object.keys(error).length) setLoading(false);
    else {
      fetch(`/api/user/${type === "Log In" ? "login" : "signup"}`, {
        method: "post",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          email,
          password,
        }),
      })
        .then((res) => {
          return res.json();
        })
        .then((json) => {
          if (json.status === "ok") {
            changeLogIn(json.token);
            onClose();
          } else {
            setErr({ server: json.err });
            setPassword("");
            setRepassword("");
          }
          setLoading(false);
        })
        .catch((err) => {
          console.log(err);
          setErr({ server: err.toString() });
          setLoading(false);
        });
    }
  }

  function handleClose() {
    if (!loading) {
      onClose();
      setType("Log In");
      setPassword("");
      setRepassword("");
      setErr({});
    }
  }

  return (
    <div>
      <Dialog open={open} onClose={handleClose} fullWidth={true} scroll="body">
        <DialogTitle>{type}</DialogTitle>
        {err.server && (
          <Typography className={classes.warning} color="error">
            {err.server}
          </Typography>
        )}
        {type === "Log In" && (
          <form className={classes.root}>
            <TextField
              id="email-input"
              label="Email"
              helperText={err.email || null}
              type="eamil"
              className={classes.input}
              value={email}
              onChange={changeEmail}
              error={err.email ? true : false}
            />
            <TextField
              id="standard-password-input"
              label="Password"
              helperText={err.password || null}
              type="password"
              autoComplete="current-password"
              className={classes.input}
              value={password}
              onChange={changePassword}
              error={err.password ? true : false}
            />
            {loading ? (
              <CircularProgress className={classes.loading} />
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleSubmit}
              >
                Log In
              </Button>
            )}
            <Typography variant="body1" className={classes.message}>
              {`No account yet? Create one `}
              <Link
                onClick={switchType}
                component="button"
                variant="body1"
                color="primary"
              >
                here
              </Link>
            </Typography>
          </form>
        )}
        {type === "Sign Up" && (
          <form className={classes.root}>
            <TextField
              id="new-email-input"
              label="Email"
              helperText={err.email || null}
              type="eamil"
              className={classes.input}
              value={email}
              onChange={changeEmail}
              error={err.email ? true : false}
            />
            <TextField
              id="new-standard-password-input"
              label="Password"
              type="password"
              helperText={
                err.password || "Password should have at least 6 characters"
              }
              className={classes.inputPass}
              value={password}
              onChange={changePassword}
              error={err.password ? true : false}
            />
            <TextField
              id="re-enter-password-input"
              label="Re-enter your password"
              type="password"
              helperText={err.repassword || null}
              className={classes.input}
              value={repassword}
              onChange={changeRepassword}
              error={err.repassword ? true : false}
            />
            {loading ? (
              <CircularProgress className={classes.loading} />
            ) : (
              <Button
                type="submit"
                variant="contained"
                color="primary"
                className={classes.button}
                onClick={handleSubmit}
              >
                Sign Up
              </Button>
            )}
            <Typography variant="body1" className={classes.message}>
              {`Have account alreday? `}
              <Link
                onClick={switchType}
                component="button"
                variant="body1"
                color="primary"
              >
                Log In
              </Link>
            </Typography>
          </form>
        )}
      </Dialog>
    </div>
  );
}
