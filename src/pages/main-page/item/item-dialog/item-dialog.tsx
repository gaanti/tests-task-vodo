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
      <Modal
        open={props.openItemModal}
        onClose={props.handleCloseItemModal}
        sx={{display:'flex', overflow: 'scroll'}}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <OverviewItem id={props.product.id} handleCloseItemModal={props.handleCloseItemModal}/>
      </Modal>
    </div>
  );
}

export default ItemDialog;