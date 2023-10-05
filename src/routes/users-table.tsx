import { useEffect } from "react";
import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import Loader from "../components/loader";
import ErrorMessage from "@/components/error-message";
import Card from "@/components/card";
import { fetchUsers } from "@/store/users-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";

const UsersTable = () => {
  const { usersData, loading, error } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
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
