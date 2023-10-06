import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers } from "@/store/users-slice";
import ErrorMessage from "@/components/error-message";
import Layout from "../components/layout";
import Loader from "../components/loader";
import UserCard from "@/components/user-card";

const PersonalPage = () => {
  const { usersData, loading, error } = useAppSelector((state) => state.users);
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers(Number(params.userId)));
  }, [dispatch, params.userId]);

  const user = usersData[0];

  return (
    <Layout>
      {loading && !error && <Loader />}{" "}
      {error && <ErrorMessage errorMessage={error} />}
      {!loading && !error && usersData && usersData.length > 0 ? (
        <UserCard user={user} />
      ) : (
        !loading && !error && <div>No user data available.</div>
      )}
    </Layout>
  );
};

export default PersonalPage;
