import React, { useState, useEffect } from "react";

//7. Create a React component that fetches a list of products from an e-commerce API endpoint using useEffect hook and displays the product name, description, price, and quantity on the screen using the useState hook. Add a button which allows the user to sort the products by price (lowest to highest).

// 8. Adding on to the previous question, There should be three buttons for this purpose: "Low to High", "High to Low", and "Reset". When the user clicks on "Low to High", the products should be sorted by price in ascending order. When the user clicks on "High to Low", the products should be sorted by price in descending order. When the user clicks on "Reset", the products should be displayed in their original order.
const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/products") {
        resolve({
          status: 200,
          message: "Success",
          data: {
            products: [
              {
                name: "Product 1",
                description: "This is the first product",
                price: 25.99,
                quantity: 10,
              },
              {
                name: "Product 2",
                description: "This is the second product",
                price: 19.99,
                quantity: 15,
              },
              {
                name: "Product 3",
                description: "This is the third product",
                price: 35.5,
                quantity: 5,
              },
              {
                name: "Product 4",
                description: "This is the fourth product",
                price: 49.99,
                quantity: 20,
              },
            ],
          },
        });
      } else {
        reject({
          status: 404,
          message: "Product list not found.",
        });
      }
    }, 2000);
  });
};
const Question7_8 = () => {
  const [productsData, setProductsData] = useState([]);
  const [productsData2, setProductsData2] = useState([]);
  const [loading, setLoading] = useState(true);
  const getData = async () => {
    try {
      const response = await fakeFetch("https://example.com/api/products");
      setProductsData(response.data.products);
      setProductsData2(response.data.products);
      setLoading(false);
    } catch (err) {
      console.log(err);
    }
  };
  useEffect(() => {
    getData();
  }, []);

  const SortByPrice = (value) => {
    if (value === "Reset") {
      setProductsData(productsData2);
      return;
    } else {
      const sortedData = [...productsData].sort((a, b) =>
        value === "LH" ? a.price - b.price : b.price - a.price
      );
      setProductsData(sortedData);
    }
  };
  return (
    <div>
      <p>{loading && "...Loading"}</p>
      <button onClick={() => SortByPrice("LH")}>Low to High</button>
      <button onClick={() => SortByPrice("HL")}>High to Low</button>
      <button onClick={() => SortByPrice("Reset")}>Reset</button>
      <ul>
        {productsData.map(({ name, description, price, quantity }) => {
          return (
            <li>
              <h1>{name}</h1>
              <p>{description}</p>
              <p>{price}</p>
              <p>{quantity}</p>
            </li>
          );
        })}
      </ul>
    </div>
  );
};

export default Question7_8;
