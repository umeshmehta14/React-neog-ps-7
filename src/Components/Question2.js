import React,{useState, useEffect} from 'react'
// Create a React component that fetches user data from an API endpoint using useEffect hook and displays the user's name, email, and phone number on the screen using the useState hook. Add a button which toggles the display of the user's address (street, suite, city, zipCode).
const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/user") {
        resolve({
          status: 200,
          message: "Success",
          data: {
            name: "John Doe",
            email: "john.doe@example.com",
            phone: "+1 555-555-5555",
            address: {
              street: "123 Main St",
              suite: "Suite 456",
              city: "Anytown",
              zipcode: "12345"
            }
          }
        });
      } else {
        reject({
          status: 404,
          message: "User not found."
        });
      }
    }, 2000);
  });
};



const Question2 = () => {
    const [userData, setUserData] =  useState({});
    const [loading, setLoading] =  useState(true);
    const [click, setClick] =  useState(false);
    const getData = async()=>{
        try {
            const response = await fakeFetch("https://example.com/api/user")
            setUserData(response.data);
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getData();
    },[])
  return (
    <div>
      <p>{loading && "...Loading"}</p>
      <div>
        <p>Name:{userData.name}</p>
        <p>Email:{userData.email}</p>
        <p>Phone:{userData.phone}</p>
      </div>
      <button onClick={()=> setClick(!click)}>{click ? "Hide Address":"Show Address"}</button>
      <div>{click &&
        <>
        <p>{userData.address.street}</p>
        <p>{userData.address.suite}</p>
        <p>{userData.address.city}</p>
        <p>{userData.address.zipcode}</p>
        </>
      }
      </div>
      
    </div>
  )
}

export default Question2
