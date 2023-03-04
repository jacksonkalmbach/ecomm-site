import { useContext } from 'react';

import { CartContext } from '../../context/cart.context';

import {CheckoutItemContainer} from './checkout-item.styles.jsx';


const CheckoutItem = ({cartItem}) => {

  const { id, name, imageUrl, price, quantity } = cartItem;
  const { clearItemFromCart, addItemToCart, removeItemFromCart } = useContext(CartContext);

  const clearItemHandler = () => clearItemFromCart(cartItem)
  const incrementQuantityHandler = () => addItemToCart(cartItem);
  const decrementQuantityHandler = () => removeItemFromCart(cartItem);

  return (
    <CheckoutItemContainer key={id} >
      <div className='image-container'>
        <img src={imageUrl} alt={name}/>
      </div>
      <span className='name'>{name}</span>
      <span className='quantity'>
        <div className='arrow' onClick={decrementQuantityHandler}>
          &#10094;
        </div>
        <span className='value'>{quantity}</span>
        <div className='arrow' onClick={incrementQuantityHandler}>
        &#10095;
        </div>
      </span>
      <span className='price'>${price}</span>
      <div className='remove-button' onClick={clearItemHandler}>&#10005;</div>
    </CheckoutItemContainer>
  )
};

export default CheckoutItem;