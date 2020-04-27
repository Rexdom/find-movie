import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import Button from '@material-ui/core/Button';
import Dialog from '@material-ui/core/Dialog';
import DialogActions from '@material-ui/core/DialogActions';
import DialogContent from '@material-ui/core/DialogContent';
import DialogContentText from '@material-ui/core/DialogContentText';
import DialogTitle from '@material-ui/core/DialogTitle';
import IconButton from '@material-ui/core/IconButton';
import CloseIcon from '@material-ui/icons/Close';
import Slide from '@material-ui/core/Slide';
import styles from '../styles/DialogStyle';

const Transition = React.forwardRef(function Transition(props, ref) {
  return <Slide direction="up" ref={ref} {...props} />;
});

const useStyles = makeStyles((theme) => ({
    ...styles(theme),
}));

export default function DetailDialog(props) {

  const {data, open, comments}=props;
  const classes = useStyles();

  const handleClose = () => {
    props.onClose();
  };

  return (
    <div>
      <Dialog
        open={open!=="close"}
        TransitionComponent={Transition}
        onClose={handleClose}
        fullWidth={true}
        maxWidth='xl'
        scroll='paper'
        style={{margin: '0 3%'}}
      >
        <DialogTitle>
            {data.name} - {data.date}
            <IconButton className={classes.closeButton} onClick={handleClose}>
                <CloseIcon />
            </IconButton>
        </DialogTitle>
        <DialogContent dividers>
          {open==='details' && 
          <>
            <DialogContentText>           
              Details....
            </DialogContentText>  
          </>}
          {open==='comments' &&
          <DialogContentText>           
            Comments...
          </DialogContentText>}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="primary">
            Add to Watch List
          </Button>
          <Button onClick={handleClose} color="primary">
            Comments
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
}