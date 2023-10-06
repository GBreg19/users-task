import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers } from "@/store/users-slice";
import ErrorMessage from "@/components/error-message";
import Layout from "../components/layout";
import Loader from "../components/loader";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

const PersonalPage = () => {
  const { usersData, loading, error } = useAppSelector((state) => state.users);
  const navigate = useNavigate();
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
        <Card>
          <CardHeader>
            <CardTitle>{user.name}</CardTitle>
            <CardDescription>{user.email}</CardDescription>
          </CardHeader>
          <CardContent>
            <p>City: {user.address.city}</p>
            <p>
              Address:{" "}
              {user.address.street +
                ", " +
                user.address.suite +
                " " +
                user.address.geo.lat +
                user.address.geo.lng}
            </p>
            <p>Zip: {user.address.zipcode}</p>
          </CardContent>
          <CardFooter>
            <Button className="bg-yellow-700" onClick={() => navigate("/")}>
              Back
            </Button>
          </CardFooter>
        </Card>
      ) : (
        !loading && !error && <div>No user data available.</div>
      )}
    </Layout>
  );
};

export default PersonalPage;
