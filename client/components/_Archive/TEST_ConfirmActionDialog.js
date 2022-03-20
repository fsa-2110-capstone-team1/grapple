import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import { useDispatch } from "react-redux";

export default function ButtonWithAlertDialog({
  buttonSize,
  buttonVariant,
  buttonDisabled,
  buttonText,
  dialogTitle,
  dialogText,
  disagreeText,
  agreeText,
  dispatchAction,
  dispatchParams,
}) {
  const dispatch = useDispatch();

  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleSubmit = () => {
    console.log(dispatchParams);
    if (dispatchAction) {
      dispatch(dispatchAction(dispatchParams));
    }
    setOpen(false);
  };

  return (
    <div>
      <Button
        variant={buttonVariant}
        size={buttonSize}
        onClick={handleClickOpen}
        disabled={buttonDisabled}
      >
        {buttonText}
      </Button>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
      >
        {dialogTitle && (
          <DialogTitle id="alert-dialog-title">{dialogTitle}</DialogTitle>
        )}
        {dialogText && (
          <DialogContent>
            <DialogContentText id="alert-dialog-description">
              {dialogText}
            </DialogContentText>
          </DialogContent>
        )}
        <DialogActions>
          {disagreeText && (
            <Button onClick={handleClose}>{disagreeText}</Button>
          )}
          {agreeText && (
            <Button onClick={handleSubmit} autoFocus>
              {agreeText}
            </Button>
          )}
        </DialogActions>
      </Dialog>
    </div>
  );
}
