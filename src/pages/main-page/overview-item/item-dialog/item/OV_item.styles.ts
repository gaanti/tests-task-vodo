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

export const OverviewItemColor = styled.div`
  position: absolute;
  top: 0;
  left: 0;
`;
export const CloseItem = styled.div`
  position: absolute;
  top: 0;
  right: 0;
  cursor: pointer;
`;
