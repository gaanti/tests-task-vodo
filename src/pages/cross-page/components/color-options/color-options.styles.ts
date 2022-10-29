import styled from 'styled-components';
import Card from '@mui/material/Card';

export const ColorOptionsWrapper = styled(Card)`
  display: flex;
  gap: 6px;
  padding: 7px;
  background-color: #c4c4c4 !important;
  flex-wrap: wrap;
  flex-direction: column;
  align-items: center;
`;

interface ColorCircleProps {
  color: string;
  size?: string;
}

export const ColorCircle = styled.div<ColorCircleProps>`
  display: inline-block;
  background-color: ${(props) => props.color};
  height: ${(props) => (props.size ? props.size : 20)}px;
  width: ${(props) => (props.size ? props.size : 20)}px;
  border-radius: 50%;
  cursor: pointer;

  &:not(.active-color):hover {
    scale: 1;
  }

  &:not(.active-color) {
    scale: 0.7;
  }
`;
