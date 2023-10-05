import { useEffect } from "react";
import { columns } from "../components/columns";
import { DataTable } from "../components/data-table";
import Loader from "../components/loader";
import ErrorMessage from "@/components/error-message";
import Layout from "@/components/layout";
import { fetchUsers } from "@/store/users-slice";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import UserTable from "@/components/user-table";

const UsersTable = () => {
  const { usersData, loading, error, deleting, editing } = useAppSelector((state) => state.users);
  const dispatch = useAppDispatch();

  console.log(deleting, editing)

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  return (
    <Layout>
      {loading && <Loader />}
      {!loading && error && <ErrorMessage errorMessage={error} />}
      {!loading && !error && <UserTable />}
      {/* {!loading && !error && <DataTable columns={columns} data={usersData} />} */}
    </Layout>
  );
};

export default UsersTable;
