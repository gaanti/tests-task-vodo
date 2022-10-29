import styled from 'styled-components';
import Card from '@mui/material/Card';

interface OV_itemCard_props {
  width: number;
}

export const OV_itemCard = styled(Card)<OV_itemCard_props>`
  max-width: ${(props) => props.width};
  position: relative;
  overflow: scroll;
`;
