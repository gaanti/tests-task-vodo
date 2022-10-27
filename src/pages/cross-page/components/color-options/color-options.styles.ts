import styled from 'styled-components';

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

  &:not(.active):hover {
    scale: 1;
  }

  &:not(.active) {
    scale: 0.7;
  }
`;
