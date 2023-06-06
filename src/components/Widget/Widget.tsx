import React from 'react';
import { Box } from '@mui/system';



function Widget(): React.ReactElement {
  return (
    <Box className='widget' sx={{ width: 340, height: '100%' }}>
      <iframe
        className='widgetIframe'
        title='facebook-post'
        width='100%'
        height='100%'
        style={{ border: 'none', overflow: 'hidden' }}

        allowFullScreen={true}
        allow='autoplay; clipboard-write; encrypted-media; picture-in-picture; web-share'></iframe>widget
    </Box>
  );
}

export default Widget;
