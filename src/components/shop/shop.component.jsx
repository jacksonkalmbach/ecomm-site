import { useContext, Fragment } from "react";
import './shop.styles.scss';

import CategoryPreview from '../category-preview/category-preview.component'

import { CategoriesContext } from "../../context/categories.context";

const Shop = () => {

  const { categoriesMap } = useContext(CategoriesContext);

  return(
    <div className="shop-container">
      {
        Object.keys(categoriesMap).map(title => {
          const products = categoriesMap[title];
          return <CategoryPreview key={title} title={title} products={products} />
        })
      }
    </div>
  )
}

export default Shop;