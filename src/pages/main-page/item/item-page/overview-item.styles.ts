import styled from 'styled-components';
import CloseIcon from '@mui/icons-material/Close';


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

interface OverviewItemSizeProps {
  size?: number;
}

export const OverviewItemSize = styled.div<OverviewItemSizeProps>`
  width: ${(props) => (props.size ? `${props.size}px` : '45px')};
  height: ${(props) => (props.size ? `${(props.size / 3) * 2}px` : '30px')};
  padding: ${(props) => (props.size ? `${props.size / 9}px` : '5px')};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  flex-wrap: wrap;

  &:not(.activeSize):hover {
    scale: 1.05;
  }

  &:not(.activeSize) {
    background-color: #d3d3d3;
    color: black;
  }
`;
