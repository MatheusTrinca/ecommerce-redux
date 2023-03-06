import { useMediaQuery } from '@mui/material';
import React, { useCallback, useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { setItems } from '../../state';

const ShoppingList = () => {
  const dispatch = useDispatch();
  const [value, setValue] = useState('all');
  const items = useSelector(state => state.cart.items);
  const isNonMobile = useMediaQuery('(min-width:600px)');

  console.log('items', items);

  function handleChange(event, newValue) {
    setValue(newValue);
  }

  const getItems = useCallback(async () => {
    const items = await fetch(
      'http://localhost:1337/api/items?populate=image',
      { method: 'GET' }
    );
    const itemsJson = await items.json();
    dispatch(setItems(itemsJson.data));
  }, [dispatch]);

  useEffect(() => {
    getItems();
  }, [getItems]);

  const topRatedItems = items.filter(
    item => item.attributes.category === 'topRated'
  );

  const newArrivalItems = items.filter(
    item => item.attributes.category === 'newArrivals'
  );

  const bestSellersItems = items.filter(
    item => item.attributes.category === 'bestSellers'
  );

  return <div>ShoppingList</div>;
};

export default ShoppingList;
