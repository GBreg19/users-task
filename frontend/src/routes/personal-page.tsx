import { useEffect } from "react";
import { useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers } from "@/store/users-slice";
import ErrorMessage from "@/components/error-message";
import Loader from "../components/loader";
import UserCard from "@/components/guest-card";
import Container from "@/components/container";
import PageBadge from "@/components/page-badge";

const PersonalPage = () => {
  const { usersData, loading, error } = useAppSelector((state) => state.users);
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers({ actionType: "GET", id: params.userId }));
  }, []);

  return (
    <Container>
      <PageBadge title="Guest profile" />
      {loading && !error && <Loader />}{" "}
      {error && <ErrorMessage errorMessage={error} />}
      {!loading && !error && usersData && usersData.length > 0
        ? usersData.map((user) => <UserCard key={user._id} user={user} />)
        : !loading && !error && <div>No user data available.</div>}
    </Container>
  );
};

export default PersonalPage;
