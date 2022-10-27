import Button from '@mui/material/Button';
import DialogTitle from '@mui/material/DialogTitle';
import Dialog from '@mui/material/Dialog';
import React from 'react';
import { Stack } from '@mui/material';

export default function SimpleDialogDemo(props: {
  open: boolean;
  setOpen: React.Dispatch<React.SetStateAction<boolean>>;
  deleteItemAction: (id: number) => void;
  itemId: number
}) {
  const { setOpen, open, deleteItemAction } = props;
  const closeDialog = () => props.setOpen(false);
  const approveAction = () => {
    props.deleteItemAction(props.itemId);
    closeDialog()
  };
  const cancelAction = () => {
    closeDialog();
  };

  return (
    <Dialog onClose={closeDialog} open={open}>
      <DialogTitle>Do you really want to delete this item from cart?</DialogTitle>
      <Stack direction="row" spacing={2} justifyContent="space-between">
        <Button onClick={() => cancelAction()}>No</Button>
        <Button onClick={() => approveAction()}>Yes</Button>
      </Stack>
    </Dialog>
  );
}
