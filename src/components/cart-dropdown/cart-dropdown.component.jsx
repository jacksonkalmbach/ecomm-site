import { useContext } from 'react';
import { CartContext } from '../../context/cart.context';
import { useNavigate } from 'react-router-dom';

import CartItem from '../cart-item/cart-item.component';
import Button from '../button/button.component';

import { CartDropdownContainer, CartItems, EmptyMessage } from './cart-dropdown.styles.jsx';

const CartDropdown = () => {

  const { cartItems } = useContext(CartContext);
  const navigate = useNavigate();

  const goToCheckoutHandler = () => {
    navigate('/checkout')
  }

  return(
    <CartDropdownContainer>
      <CartItems>
        { 
          cartItems.length ? cartItems.map(item => <CartItem key={item.id} cartItem={item}/>) 
          : <EmptyMessage>Your cart is empty</EmptyMessage> 
        }
      </CartItems>
      {
        cartItems.length ? <Button onClick={goToCheckoutHandler}>Checkout</Button> : <></>
      }
    </CartDropdownContainer>
  )
};

export default CartDropdown;