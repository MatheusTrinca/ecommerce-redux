import { MarkEmailReadOutlined } from '@mui/icons-material';
import { Box, Divider, IconButton, InputBase, Typography } from '@mui/material';
import React, { useState } from 'react';

const Subscribe = () => {
  const [email, setEmail] = useState('');

  return (
    <Box width="80%" margin="80px auto" textAlign="center">
      <IconButton>
        <MarkEmailReadOutlined fontSize="large" />
      </IconButton>
      <Typography>Subscribe To Out Newsletter</Typography>
      <Typography>
        and receive $20 cupon for your first order when you checkout
      </Typography>
      <Box
        p="2px 4px"
        m="15px auto"
        display="flex"
        alignItems="center"
        width="75%"
        bgcolor="#f2f2f2"
      >
        <InputBase
          value={email}
          onChange={e => setEmail(e.target.value)}
          sx={{ ml: 1, flex: 1 }}
          placeholder="Enter email"
        />
        <Divider orientation="vertical" sx={{ height: 28, m: 0.5 }} />
        <Typography sx={{ p: '10px', ':hover': { cursor: 'pointer' } }}>
          Subscribe
        </Typography>
      </Box>
    </Box>
  );
};

export default Subscribe;
