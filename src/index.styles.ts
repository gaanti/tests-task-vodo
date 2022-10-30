import styled from 'styled-components';

interface appWrapperProps {
  bgColor: string;
}

export const AppWrapper = styled.div<appWrapperProps>`
  background-color: ${(props) => props.bgColor};
  max-width: 100vw;
  display: flex;
  flex-direction: column;
  row-gap: 20px;
  height: auto;
  padding: 30px;
  @media (max-width: 690px) {
    padding: 2vh;
    @media (max-width: 385px) {
      padding: 1vh;
    }
  }
`;
