import React, {useState, useEffect} from 'react'
// Create a React component that fetches a list of users from an API endpoint using useEffect hook and displays the name, email, and website of each user on the screen using the useState hook. Add a dropdown which filters the users by company name.
const fakeFetch = (url) => {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      if (url === "https://example.com/api/users") {
        resolve({
          status: 200,
          message: "Success",
          data: [
            { name: "John Doe", email: "john@example.com", website: "example.com", company: "ABC Inc" },
            { name: "Jane Doe", email: "jane@example.com", website: "example.com", company: "XYZ Corp" },
            { name: "Bob Smith", email: "bob@example.com", website: "example.com", company: "ABC Inc" },
            { name: "Alice Brown", email: "alice@example.com", website: "example.com", company: "ACME Corp" },
            { name: "Charlie Green", email: "charlie@example.com", website: "example.com", company: "XYZ Corp" },
          ]
        });
      } else {
        reject({
          status: 404,
          message: "Users list not found."
        });
      }
    }, 2000);
  });
};

const Question4 = () => {
    const [usersData, setUsersData] =  useState([]);
    const [usersData2, setUsersData2] =  useState([]);
    const [loading, setLoading] =  useState(true);
    const companyList = ["All",...new Set(usersData2.map(({company})=> company))];
    const getData = async()=>{
        try {
            const response = await fakeFetch("https://example.com/api/users")
            setUsersData(response.data);
            setUsersData2(response.data);
            setLoading(false)
        } catch (err) {
            console.log(err)
        }
    }
    useEffect(()=>{
        getData();
    },[])

    const SortByCompanyName = (event)=>{

        const choosedCompanyName = event.target.value;
        if(choosedCompanyName === "All")
        {
            setUsersData(usersData2);
        }
        else{
            const filterYear = usersData2.filter(({company})=> company === choosedCompanyName)
            setUsersData(filterYear);
        }

    }
  return (
    <div>
      <p>{loading && "...Loading"}</p>
      <h1>Users</h1>
      <span>Filter By Company:</span>
      <select onChange={SortByCompanyName}>
        {
            companyList.map((companyName)=> <option value={companyName}>{companyName}</option>)
        }
      </select>
      <ul>
        {
            usersData.map(({name, email, website, company})=>{
                return <li>
                    <p>Name:{name}</p>
                    <p>Email:{email}</p>
                    <p>Website:{website}</p>
                    <p>Company:{company}</p>
                </li>
            })
        }
      </ul>
    </div>
  )
}

export default Question4
