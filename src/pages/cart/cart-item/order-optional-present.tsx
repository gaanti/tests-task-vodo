import React from 'react';
import { OptionalPresent } from '../cart-page.styles';

function OrderOptionalPresent(props: {imageUrl: string}) {
  return (
    <div>
      <OptionalPresent
        src={props.imageUrl}
      />
    </div>
  );
}

export default OrderOptionalPresent;
