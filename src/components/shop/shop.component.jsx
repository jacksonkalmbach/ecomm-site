import { useContext } from "react";
import './shop.styles.scss';

import ProductCard from "../product-card/product.card.component";

import { ProductsContext } from "../../context/products.context";

const Shop = () => {

  const { products } = useContext(ProductsContext);

  return(
    <div className="products-container">
      {products.map(product => (
        <ProductCard id={product.id} product={product}/>
      ))}
    </div>
  )
}

export default Shop;