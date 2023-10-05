import { Button } from "@/components/ui/button";
import Layout from "../components/layout";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch, useAppSelector } from "@/store/hooks";
import { fetchUsers } from "@/store/users-slice";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

const PersonalPage = () => {
    const navigate = useNavigate()
  const params = useParams();
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(fetchUsers());
  }, []);

  const user = useAppSelector((state) =>
    state.users.usersData.find((user) => user.id.toString() === params.userId)
  );
  
  return (
    <Layout>
      {user && (
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
            <Button className="bg-yellow-700" onClick={() => navigate('/users')}>Back</Button>
          </CardFooter>
        </Card>
      )}
    </Layout>
  );
};

export default PersonalPage;
