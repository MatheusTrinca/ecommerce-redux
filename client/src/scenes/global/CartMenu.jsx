import React from 'react';
import { Box, Button, Divider, IconButton, Typography } from '@mui/material';
import styled from '@emotion/styled';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { Add, Close, Remove } from '@mui/icons-material';
import {
  setIsCartOpen,
  removeFromCart,
  decreaseCount,
  increaseCount,
} from '../../state';
import { shades } from '../../theme';

const FlexBox = styled(Box)`
  display: flex;
  align-items: center;
  justify-content: center;
`;

const CartMenu = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const { cart, isCartOpen } = useSelector(state => state.cart);

  const totalPrice = cart.reduce((total, item) => {
    return total + item.count * item.attributes.price;
  }, 0);

  return (
    <Box
      display={isCartOpen ? 'block' : 'none'}
      bgcolor="rgba(0, 0, 0, 0.4)"
      position="fixed"
      width="100%"
      height="100%"
      zIndex={10}
      left="0"
      top="0"
      overflow="auto"
    >
      {/* MODAL */}
      <Box
        position="fixed"
        right="0"
        bottom="0"
        width="max(400px, 30%)"
        height="100%"
        bgcolor="white"
      >
        <Box padding="30px" overflow="auto" height="100%">
          {/* HEADER */}
          <FlexBox mb="15px">
            <Typography variant="h3">SHOPPING BAG ({cart.length})</Typography>
            <IconButton onClick={() => dispatch(setIsCartOpen({}))}>
              <Close />
            </IconButton>
          </FlexBox>

          {/* CART LIST */}
          <Box>
            {cart.map(item => (
              <Box key={`${item.attributes.name}-${item.id}`}>
                <FlexBox p="15px 0">
                  <Box flex="1 1 40%">
                    <img
                      src={`http://localhost:1337${item?.attributes?.image?.data?.attributes?.formats?.medium?.url}`}
                      alt={item?.name}
                      width="123px"
                      height="164px"
                    />
                  </Box>
                  <Box flex="1 1 60%">
                    {/* Item name */}
                    <FlexBox mb="5px">
                      <Typography fontWeight="bold">
                        {item.attributes.name}
                      </Typography>
                      <IconButton
                        onClick={() =>
                          dispatch(removeFromCart({ id: item.id }))
                        }
                      >
                        <Close />
                      </IconButton>
                    </FlexBox>
                    <Typography>{item.attributes.description}</Typography>
                    {/* Amount */}
                    <FlexBox m="15px 0">
                      <Box
                        display="flex"
                        alignItems="center"
                        border={`1.5px solid ${shades.neutral[500]}`}
                      >
                        <IconButton
                          onClick={() =>
                            dispatch(decreaseCount({ id: item.id }))
                          }
                        >
                          <Remove />
                        </IconButton>
                        <Typography>{item.count}</Typography>
                        <IconButton
                          onClick={() =>
                            dispatch(increaseCount({ id: item.id }))
                          }
                        >
                          <Add />
                        </IconButton>
                      </Box>
                      {/* Price */}
                      <Typography fontWeight="bold">
                        ${item.attributes.price}
                      </Typography>
                    </FlexBox>
                  </Box>
                </FlexBox>
                <Divider />
              </Box>
            ))}
          </Box>

          {/* Actions */}
          <Box m="20px 0">
            <FlexBox m="20px 0">
              <Typography fontWeight="bold">SUBTOTAL</Typography>
              <Typography fontWeight="bold">$ {totalPrice}</Typography>
            </FlexBox>
            <Button
              sx={{
                bgcolor: shades.primary[400],
                color: 'white',
                borderRadius: 0,
                minWidth: '100%',
                padding: '20px 40px',
                m: '20px 0',
              }}
              onClick={() => {
                navigate('/checkout');
                dispatch(setIsCartOpen({}));
              }}
            >
              CHECKOUT
            </Button>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default CartMenu;
