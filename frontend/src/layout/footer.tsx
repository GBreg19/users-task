import { Link } from "react-router-dom";
import {
  FaFacebook,
  FaSquareTwitter,
  FaLinkedin,
  FaSquareInstagram,
} from "react-icons/fa6";

const Footer = () => {
  return (
    <>
      <div className="bg-indigo-600">
        <span className="flex justify-center py-7 gap-2">
          <Link
            to={`https://www.facebook.com/`}
            target="_"
            className="text-2xl hover:text-3xl transition duration-2000 ease-in hover:text-blue-600 bg-slate-100 w-11 h-11 cursor-pointer flex justify-center items-center rounded-full"
          >
            <FaFacebook />
          </Link>
          <Link
            to={`https://twitter.com/home`}
            target="_"
            className="text-2xl hover:text-3xl transition duration-2000 ease-in hover:text-blue-400 bg-slate-100 w-11 h-11 cursor-pointer flex justify-center items-center rounded-full"
          >
            <FaSquareTwitter />
          </Link>
          <Link
            to={`https://www.linkedin.com/feed/`}
            target="_"
            className="text-2xl hover:text-3xl transition duration-2000 ease-in hover:text-blue-800 bg-slate-100 w-11 h-11 cursor-pointer flex justify-center items-center rounded-full"
          >
            <FaLinkedin />
          </Link>
          <Link
            to={`https://www.instagram.com/`}
            target="_"
            className="text-2xl hover:text-3xl transition duration-2000 ease-in hover:text-red-500 bg-slate-100 w-11 h-11 cursor-pointer flex justify-center items-center rounded-full"
          >
            <FaSquareInstagram />
          </Link>
        </span>
      </div>
      <div className="bg-indigo-700 flex justify-center py-3">
        <p className="text-white font-Noto-LightIta"> &copy; <em id="date">2023</em> Copyright - Giorgi Bregvadze</p>
      </div>
    </>
  );
};

export default Footer;
