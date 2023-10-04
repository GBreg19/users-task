import { useState, useEffect } from "react";
import { User, columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import axios from "axios";
import Loader from "../components/loader";
import ErrorMessage from "@/components/error-message";
import Card from "@/components/card";

const UsersTable = () => {
  const [usersData, setUsersData] = useState<User[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string>("");

  interface FetchedUser {
    id: number;
    name: string;
    email: string;
    address: {
      city: string;
    };
  }

  useEffect(() => {
    const apiUrl = "https://jsonplaceholder.typicode.com/users";
    setLoading(true);

    async function fetchData() {
      try {
        const response = await axios.get<FetchedUser[]>(apiUrl);

        const convertedUserObj = response.data.map((user) => {
          const obj: User = {
            id: user.id.toString(),
            name: user.name,
            email: user.email,
            city: user.address.city,
          };
          return obj;
        });

        setUsersData(convertedUserObj);
        setLoading(false);
      } catch (error) {
        setLoading(false);
        if (error instanceof Error) {
          setError(error.message);
        } else {
          setError("An error occured");
        }
      }
    }

    fetchData();
  }, []);

  return (
    <Card>
      {loading && <Loader />}
      {!loading && error && <ErrorMessage errorMessage={error} />}
      {!loading && !error && <DataTable columns={columns} data={usersData} />}
    </Card>
  );
};

export default UsersTable;
