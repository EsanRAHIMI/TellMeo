import React from 'react';
import { Card, CardContent, CardActions, Typography } from '@mui/material';

const CustomCard = ({ title, children, actions }) => {
  return (
    <Card variant="outlined" sx={{ backgroundColor: '#ffffff', color: '#000000', mb: 4 }}>
      <CardContent>
        {title && (
          <Typography variant="h5" component="h2" gutterBottom sx={{ color: '#000000' }}>
            {title}
          </Typography>
        )}
        {children}
      </CardContent>
      {actions && <CardActions>{actions}</CardActions>}
    </Card>
  );
};

export default CustomCard;
