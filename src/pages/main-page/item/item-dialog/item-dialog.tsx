import { Modal } from '@mui/material';
import React from 'react';
import OverviewItem from '../item-page/overview-item';
import { product, productForCart } from '../../../../app/slices/cart/types';

function ItemDialog(props: {
  openItemModal: boolean;
  handleOpenItemModal(): void;
  handleCloseItemModal(): void;
  product: product;
  productExistingInCart?: productForCart;
  mode?: 'configure' | 'overview'
}) {
  return (
    <div>
      <Modal
        open={props.openItemModal}
        onClose={props.handleCloseItemModal}
        sx={{ display: 'flex', overflow: 'scroll' }}
        aria-labelledby="modal-modal-title"
        aria-describedby="modal-modal-description"
      >
        <OverviewItem
          handleCloseItemModal={props.handleCloseItemModal}
          product={props.product}
          productExistingInCart={props.productExistingInCart}
          mode = {props.mode}
        />
      </Modal>
    </div>
  );
}

export default ItemDialog;
