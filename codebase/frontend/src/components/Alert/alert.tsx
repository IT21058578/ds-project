import * as React from 'react';
import Button from '@mui/material/Button';
import Dialog from '@mui/material/Dialog';
import DialogActions from '@mui/material/DialogActions';
import DialogContent from '@mui/material/DialogContent';
import DialogContentText from '@mui/material/DialogContentText';
import DialogTitle from '@mui/material/DialogTitle';
import Alert from '@mui/material/Alert';
import Slide from '@mui/material/Slide';
import { TransitionProps } from '@mui/material/transitions';
import AddShoppingCartTwoToneIcon from '@mui/icons-material/AddShoppingCartTwoTone';
import CloseIcon from '@mui/icons-material/Close';

const Transition = React.forwardRef(function Transition(
  props: TransitionProps & {
    children: React.ReactElement<any, any>;
  },
  ref: React.Ref<unknown>,
) {
  return <Slide direction="left" ref={ref} {...props}/>;
});

export default function AlertDialogSlide() {
  const [open, setOpen] = React.useState(false);

  const handleClickOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
               <Button
                  onClick={handleClickOpen}
                  sx={{
                    color: 'red', 
                  }}
                  >
                    <AddShoppingCartTwoToneIcon/>
              </Button>
      <Dialog
        open={open}
        TransitionComponent={Transition}
        keepMounted
        onClose={handleClose}
        aria-describedby="alert-dialog-slide-description"
      >
        <DialogContent>
           <Alert
        action={
          <Button color="inherit" size="small" onClick={handleClose}>
            <CloseIcon/>
          </Button>
        }
      >
        This is item is added to cart — check out your cart!
      </Alert>
        </DialogContent>
      </Dialog>
    </div>
  );
}