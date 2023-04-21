import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogContentText,
  DialogTitle,
} from "@mui/material";

type Props = {
  isOpen?: boolean;
  setIsOpen?: (arg0: boolean) => void;
  onConfirm?: () => void;
};

const DeleteConfirmationModal = ({
  isOpen = false,
  setIsOpen = () => {},
  onConfirm = () => {},
}: Props) => {
  return (
    <Dialog open={isOpen}>
      <DialogTitle>Are you sure?</DialogTitle>
      <DialogContent>
        <DialogContentText>
          Are you sure you want to delete this item? This action is permanent.
          The item will not be recoverable.
        </DialogContentText>
      </DialogContent>
      <DialogActions>
        <Button variant="outlined" onClick={() => setIsOpen(false)}>
          Cancel
        </Button>
        <Button variant="contained" onClick={() => onConfirm()}>
          Confirm
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default DeleteConfirmationModal;
