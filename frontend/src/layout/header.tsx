import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import Logo from "../assets/logo_transparent.png";
import { Link } from "react-router-dom";

const Header = () => {
  return (
    <div className="bg-indigo-600">
      <div className="flex items-center justify-between py-3 px-5 ">
        <Link to="/users-task/">
          <img src={Logo} width={130} />
        </Link>
        <Avatar>
          <AvatarImage src="https://github.com/shadcn.png" />
          <AvatarFallback>CN</AvatarFallback>
        </Avatar>
      </div>
    </div>
  );
};

export default Header;
