import { useState, useEffect } from "react";
import { User, columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import axios from "axios";

async function getData(): Promise<User[]> {
  // Fetch data from your API here.
  return [
    {
      id: "728ed52f",
      name: "vigaca",
      email: "pending",
      city: "m@example.com",
    },
    {
      id: "728ed52fe",
      name: "vigaca",
      email: "example@gmail.com",
      city: "m@example.com",
    },
    {
      id: "728ed52fe",
      name: "vigaca",
      email: "example@gmail.com",
      city: "m@example.com",
    },
    {
      id: "728ed52fe",
      name: "vigaca",
      email: "example@gmail.com",
      city: "m@example.com",
    },
    {
      id: "728ed52fe",
      name: "vigaca",
      email: "example@gmail.com",
      city: "m@example.com",
    },
    {
      id: "728ed52fe",
      name: "vigaca",
      email: "example@gmail.com",
      city: "m@example.com",
    },
    {
      id: "728ed52fe",
      name: "vigaca",
      email: "example@gmail.com",
      city: "m@example.com",
    },
    {
      id: "728ed52fe",
      name: "vigaca",
      email: "example@gmail.com",
      city: "m@example.com",
    },
    {
      id: "728ed52fe",
      name: "vigaca",
      email: "example@gmail.com",
      city: "m@example.com",
    },
    {
      id: "728ed52fe",
      name: "vigaca",
      email: "example@gmail.com",
      city: "m@example.com",
    },
    {
      id: "728ed52fe",
      name: "ragaca",
      email: "example@gmail.com",
      city: "m@example.com",
    },
    // ...
  ];
}

const UsersTable = () => {
  const [data, setData] = useState<User[] | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const apiUrl = "https://jsonplaceholder.typicode.com/users";
    const userObj = {};

    async function fetchData() {
      try {
        const response = await axios.get(apiUrl);
        const newObj = response.data.map((user: {}) => {
          console.log(user);
          const obj: User = {
            id: "",
            name: "",
            email: "",
            city: "",
          };
          obj.id = user.id;
        });
        const result = await getData();
        setData(result);
      } catch (error) {
        // Handle error
        console.error("Error fetching data:", error);
      }
    }

    fetchData();
  }, []);

  return (
    <div className="container mx-auto py-10">
      {data ? <DataTable columns={columns} data={data} /> : <p>Loading...</p>}
    </div>
  );
};

export default UsersTable;
