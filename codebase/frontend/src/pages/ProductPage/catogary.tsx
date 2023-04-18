import * as React from 'react';
import Button from '@mui/material/Button';

interface ButtonCategoryProps {
  categories: string[];
  onCategorySelect: (category: string) => void;
  selectedCategory: string;
}


export const ButtonCategory: React.FC<ButtonCategoryProps> = ({ categories, onCategorySelect, selectedCategory }) => {

  
  return (
    <div >
      <Button
        variant="outlined"
        sx={{
          borderWidth: '3px',
          fontSize: '1rem',
          borderRadius: '10px',
          borderColor: 'green', // Add a green border color
          color: 'green', // Set the button text color to green
          '&:hover': {
            backgroundColor: 'green', // Change the background color on hover
            color: 'white', // Change the text color on hover
          },
          margin: "8px",
        }}
        onClick={() => onCategorySelect("")}
      >
        All Products
      </Button>
      {categories.map((category) => (
        <Button
          key={category}
          variant="outlined"
          sx={{
            borderWidth: '3px',
            fontSize: '1rem',
            borderRadius: '10px',
            borderColor: 'green', // Add a green border color
            color: 'green', // Set the button text color to green
            '&:hover': {
              backgroundColor: 'green', // Change the background color on hover
              color: 'white', // Change the text color on hover
            },
            margin: "8px",
          }}
          onClick={() => onCategorySelect(category)}
        >
          {category}
        </Button>
      ))}
    </div>
  );
};