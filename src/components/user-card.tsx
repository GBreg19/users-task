import { UsersObject, isEditing } from "@/store/users-slice";

import {
  FaFacebook,
  FaSquareTwitter,
  FaLinkedin,
  FaSquareInstagram,
} from "react-icons/fa6";
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
import { Link, useNavigate } from "react-router-dom";

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
      navigate("/users-task/");
    }
  };

  return (
    user && (
      <Card className="w-full max-w-lg">
        <CardHeader className="text-center">
          <CardTitle>{user.name}</CardTitle>
          <CardContent className="text-sm text-slate-500">
            {user.email}
          </CardContent>
          <CardDescription>
            Lorem ipsum dolor sit amet consectetur adipisicing elit. Adipisci
            pariatur maxime iure sapiente cupiditate quis, consequuntur
            voluptatibus molestiae numquam rerum praesentium corporis
            dignissimos debitis, aliquam quam deserunt ex fugit harum!
          </CardDescription>
        </CardHeader>
        <CardContent className="text-center">
          <p>
            Address: {user.address.city} ({user.address.street})
          </p>
        </CardContent>
        <CardContent className="flex justify-center gap-5">
          <Link
            to={`https://www.facebook.com/`}
            target="_"
            className="text-3xl text-blue-500 hover:text-blue-400 cursor-pointer"
          >
            <FaFacebook />
          </Link>
          <Link
            to={`https://twitter.com/home`}
            target="_"
            className="text-3xl text-blue-300 hover:text-blue-200 cursor-pointer"
          >
            <FaSquareTwitter />
          </Link>
          <Link
            to={`https://www.linkedin.com/feed/`}
            target="_"
            className="text-3xl text-blue-600 hover:text-blue-500 cursor-pointer"
          >
            <FaLinkedin />
          </Link>
          <Link
            to={`https://www.instagram.com/`}
            target="_"
            className="text-3xl text-red-600 hover:text-red-500 cursor-pointer"
          >
            <FaSquareInstagram />
          </Link>
        </CardContent>
        <CardFooter className="flex gap-2 justify-center">
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
