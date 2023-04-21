import React, { useState } from 'react';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import Button from '@mui/material/Button';
import {
  Box,
  TextField,
} from '@mui/material';

//card
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import CardMedia from '@mui/material/CardMedia';
import {  CardActionArea, CardActions } from '@mui/material';
import RatingBar from './RatingBar';
import { IReview } from '../../types';


 export const Review: React.FC<IReview> =({review,rating}) =>{
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [openAddRevieDialog, setOpenAddRevieDialog] = useState(false);
  const [addedReview, setAddedReview] = useState(review);
  const [addedRating, setAddedRating] = useState(rating);

  const handleEditName = () => {
    // TODO: implement functionality to edit first and last name
  };

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <div>
      <Button variant="outlined" color="secondary" aria-describedby={id}  onClick={handleClick}>
        Add a Review
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>
          <Card sx={{ maxWidth: 345 }}>
              <CardActionArea>
              <CardMedia
                component="img"
                height="140"
                image="https://www.pngitem.com/pimgs/m/43-434027_product-beauty-skin-care-personal-care-liquid-tree.png"
                alt="green iguana"
              />
              <CardContent>
                <Typography gutterBottom variant="h5" component="div">
                  Add your review
                </Typography>

                <RatingBar/>

                <TextField
                  fullWidth
                  label="Review"
                  value={addedReview}
                  onChange={(e) => setAddedReview(e.target.value)}
                  margin="normal"
                  variant="outlined"
                /> 
                <Box sx={{ display: 'flex', justifyContent: 'flex-end', mt: 2 }}>
                  <Button color="secondary" variant="text" onClick={handleClose}>
                      Cancel
                  </Button>
                  <Button color="primary" variant="contained" onClick={handleEditName} sx={{ ml:2 }}>
                      Save
                  </Button>
                </Box>
              </CardContent>
            </CardActionArea>     
        </Card>
        </Typography>
      </Popover>
    </div>
  );
}


const ReviewPopup: React.FC = () => {
  return (
    <div>
      <Review userID="user1" productName="kottamalli" rating={4.5} review="Good!..."  />
    </div>
  );
};

export default ReviewPopup;
