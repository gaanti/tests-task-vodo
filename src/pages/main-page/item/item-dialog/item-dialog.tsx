import { Button, Modal } from '@mui/material';
import React from 'react';
import OverviewItem from '../item-page/overview-item';
import { product } from '../../../../app/slices/cart/types';

function ItemDialog(props: {
  openItemModal: boolean;
  handleOpenItemModal(): void;
  handleCloseItemModal(): void;
  product: product;
}) {
  return (
    <div>
      <Button onClick={props.handleOpenItemModal}>Open modal</Button>
      <Modal
        open={props.openItemModal}
        onClose={props.handleCloseItemModal}
        sx={{display:'flex', overflow: 'scroll'}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <OverviewItem id={props.product.id} />
      </Modal>
    </div>
  );
  /*
  * return (
    <div>
      <Button onClick={props.handleOpenItemModal}>Open modal</Button>
      <Modal
        open={props.openItemModal}
        onClose={props.handleCloseItemModal}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <Box sx={style}>
          <Typography id="modal-modal-title" variant="h6" component="h2">
            Text in a modal
          </Typography>
          <Typography id="modal-modal-description" sx={{ mt: 2 }}>
            Duis mollis, est non commodo luctus, nisi erat porttitor ligula.
          </Typography>
        </Box>
      </Modal>
    </div>
  );*/
}

export default ItemDialog;