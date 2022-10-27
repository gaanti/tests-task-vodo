import styled from 'styled-components';
import { Typography } from '@mui/material';

export const NavbarContainer = styled.div`
  width: 100%;
  height: 65px;
  background-color: black;
  color: white;
`;
export const PopOverCartItemDescription: typeof Typography = styled(Typography)`
  overflow: hidden;
  display: -webkit-box;
  -webkit-line-clamp: 2;
  -webkit-box-orient: vertical;
`;
