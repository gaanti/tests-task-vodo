import styled from 'styled-components';

export const OverviewItemImage = styled.img`
  height: 80vh;
  border-radius: 20px;
`;

interface OverviewItemSizeProps {
  size?: number
}
export const OverviewItemSize = styled.div<OverviewItemSizeProps>`
  width: ${(props) => (props.size ? `${props.size}px` : '45px')};
  height: ${(props) => (props.size ? `${props.size/3*2}px` : '30px')};
  padding: ${(props) => (props.size ? `${props.size/9}px` : '5px')};
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: center;
  background-color: black;
  color: white;
  cursor: pointer;
  border-radius: 10px;
  &:not(.activeSize):hover {
    scale: 1.05;
  }
  &:not(.activeSize) {
    background-color: #d3d3d3;
    color: black;
  }
`;

export const OverviewItemColor = styled.div`
  width: 35px;
  height: 35px;
  border-radius: 50%;
`;

