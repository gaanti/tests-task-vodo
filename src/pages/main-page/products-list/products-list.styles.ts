import CardMedia from '@mui/material/CardMedia';
import styled from '@mui/styled-engine-sc';
import Masonry from '@mui/lab/Masonry';

export const StyledCardMedia: typeof CardMedia = styled(CardMedia)`
  //object-position: 0% 10%;
  cursor: pointer;
  object-position: center 10%;
`;
export const StyledMasonryList = styled(Masonry)`
  margin-left: 0!important;
  align-content: center!important;
`;

