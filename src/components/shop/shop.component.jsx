import { useContext, Fragment } from "react";
import './shop.styles.scss';

import ProductCard from "../product-card/product.card.component";

import { CategoriesContext } from "../../context/categories.context";

const Shop = () => {

  const { categoriesMap } = useContext(CategoriesContext);

  return(
    <Fragment>
      {
        Object.keys(categoriesMap).map(title => (
          <Fragment key={title}>
            <h2>{title}</h2>
            <div className="products-container">
              {categoriesMap[title].map(product => (
                <ProductCard key = {product.id} id={product.id} product={product}/>
              ))}
            </div>
          </Fragment>
        ))
      }
    </Fragment>
  )
}

export default Shop;