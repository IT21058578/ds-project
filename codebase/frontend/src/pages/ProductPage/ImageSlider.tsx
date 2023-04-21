import * as React from 'react';
import { Box, Card, CardMedia } from '@mui/material';
import { styled } from '@mui/system';
import Carousel from 'react-material-ui-carousel';
import scrn1 from '../../../img/scrn1.png';
import scrn2 from '../../../img/scrn2.png';
import scrn3 from '../../../img/scrn3.png';


interface Image {
  id: number;
  image: string;
  title: string;
  description: string;
}

// Define the images for the slider
const images: Image[] = [
  {
    id: 1,
    image: scrn1,
    title: 'Product 1',
    description: 'Description for product 1',
  },
  {
    id: 2,
    image: scrn2,
    title: 'Product 2',
    description: 'Description for product 2',
  },
  {
    id: 3,
    image: scrn3,
    title: 'Product 3',
    description: 'Description for product 3',
  },
];

// Define custom styles for the slider components
const CustomCard = styled(Card)(({ theme }) => ({
  height: '20%',
  display: 'flex',
  flexDirection: 'column',
}));

function ImageSlider(): JSX.Element {
  return (
    <Box >
      <Carousel autoPlay={true} animation="slide">
        {images.map((image: Image) => (
          <CustomCard key={image.id}>
            <CardMedia
            component="img"
            height="450"
            image={image.image}
            alt={image.title}
          />
          </CustomCard>
        ))}
      </Carousel>
    </Box>
  );
}


export default ImageSlider;