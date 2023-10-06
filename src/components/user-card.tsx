import { UsersObject, isEditing } from "@/store/users-slice";

import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { useAppDispatch } from "@/store/hooks";
import { useNavigate } from "react-router-dom";

interface CardProps {
  user: UsersObject | null;
  modal?: boolean;
  setIsEditing?: React.Dispatch<React.SetStateAction<boolean>>;
}

const UserCard = ({ user, modal, setIsEditing = () => {} }: CardProps) => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();

  const onUserDetailsClose = () => {
    if (modal) {
      dispatch(isEditing(false));
    } else {
      navigate("/");
    }
  };

  return (
    user && (
      <Card>
        <CardHeader>
          <CardTitle>{user.name}</CardTitle>
          <CardDescription>{user.email}</CardDescription>
        </CardHeader>
        <CardContent>
          <p>City: {user.address.city}</p>
          <p>Address: {user.address.street}</p>
        </CardContent>
        <CardFooter className="flex gap-2">
          <Button
            onClick={onUserDetailsClose}
            className="bg-cyan-950 hover:bg-cyan-800"
          >
            Back
          </Button>
          {modal && (
            <Button
              onClick={() => setIsEditing(true)}
              className="bg-cyan-950 hover:bg-cyan-800"
            >
              Edit
            </Button>
          )}
        </CardFooter>
      </Card>
    )
  );
};

export default UserCard;
