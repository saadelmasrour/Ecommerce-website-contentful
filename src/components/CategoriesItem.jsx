import { Link } from "react-router-dom";
import { useEffect, useState } from "react";
import * as contentful from "contentful";

const client = contentful.createClient({
  space: "e9dwau7vjbs6",
  accessToken: "d9ymuC2EDYPqlUt3i6oihIk1vW_q90jJeGbNxefiLtg",
});

function CategoriesItem() {
  const [items, setItems] = useState([]);

  useEffect(() => {
    // Fetch data from Contentful
    client
      .getEntries({
        content_type: "products",
      })
      .then((response) => {
        setItems(response.items);
      })
      .catch((error) => console.error("Error fetching data from Contentful:", error));
  }, []);

  return (
    <>
      <div className="proud-container">
        <div className="container">
          <div className="products-grid">
            {items.map((item) => (
              <div key={item.sys.id} className="product normal">
                <Link to={`/categories/product/${item.fields.id}`}>
                  <div className="product-header">
                    <img src={item.fields.img.fields.file.url} alt="product1" />
                  </div>
                  <div className="product-details">
                    <p>{item.fields.descriprtion}</p>
                    <p className="item-price">{item.fields.price}$</p>
                  </div>
                </Link>
              </div>
            ))}
          </div>
        </div>
      </div>
    </>
  );
}

export default CategoriesItem;




