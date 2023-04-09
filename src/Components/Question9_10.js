import React,{useState, useEffect} from 'react'
//9. Create a React component that uses the useEffect hook to fetch the product data from the API endpoint using the fakeFetch function provided below. The component should use the useState hook to store the fetched data and a second state variable to store the sorted data. The sorted data should be sorted in descending order by rating.

// 10.Adding on to the previous question, Add a search bar to the component that allows users to filter the products by name. The search bar should update the list of displayed products in real-time as the user types. The search functionality should be case-insensitive.
const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/products") {
        resolve({
          status: 200,
          message: "Success",
          data: {
            products: [
              { name: "Color Pencils", price: 50, quantity: 40, rating: 4.5 },
              { name: "Sketchpens", price: 110, quantity: 20, rating: 3.8 },
              { name: "Eraser", price: 20, quantity: 20, rating: 4.2 },
              { name: "Sharpener", price: 22, quantity: 30, rating: 4.7 }
            ]
          }

        });
      } else {
        reject({
          status: 404,
          message: "Product list not found."
        });
      }
    }, 2000);
  });
};

const Question9_10 = () => {
    const [productsData, setProductsData] = useState([]);
    const [sortedProducts, setSortedProducts] = useState([]);
    const [searchValue, setSearchValue] = useState();
    const [loading, setLoading] = useState(true);

    const getData = async () => {
      try {
        const response = await fakeFetch("https://example.com/api/products");
        setProductsData(response.data.products);
        setLoading(false);
        setSortedProducts(() => [...response.data.products].sort((a, b) => b.rating - a.rating));

      } catch (err) {
        console.log(err);
      }
    };

    useEffect(() => {
      getData()
    }, []);

    const SearchItem = (event)=>{
        const currValue = event.target.value;
        setSearchValue(currValue);
        const SearchedArray = productsData.filter(({name}) => name.toLowerCase().includes(currValue.toLowerCase()));
        setSortedProducts(SearchedArray)
    }

    return (
      <div>
        <p>{loading && "...Loading"}</p>
        <h1>Products</h1>
        <label htmlFor="inp" >
            <input type="text" id="inp" onChange={SearchItem} placeholder='Search Here' style={{margin:"1rem"}}/>
        </label>
        <div>

            {
                sortedProducts.map(({name, price, quantity,rating}) =>{
                    console.log(name.split(new RegExp(`(${searchValue})`, "gi")))
                    return <div style={{border:"2px solid black", padding:"1rem"}}>
                    <p>{searchValue ? <p>
    {name
      .split(new RegExp(`(${searchValue})`, "gi"))
      .map((substring, index) =>
        substring.toLowerCase() === searchValue.toLowerCase() ? (
          <em style={{backgroundColor:"black",color:"white"}} key={index}>{substring}</em>
        ) : (
          <span key={index}>{substring}</span>
        )
      )}
  </p>
         : <p><strong>{name}</strong></p>}</p>
                    <p><strong>Price:{price}</strong></p>
                    <p><strong>Quantity:{quantity}</strong></p>
                    <p><strong>Rating:{rating}</strong></p>
                    </div>
                })
            }
        </div>
      
    </div>
  )
}

export default Question9_10
