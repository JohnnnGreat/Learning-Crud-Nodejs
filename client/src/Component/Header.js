import React from "react";
import { Link } from "react-router-dom";
function Header() {
  return (
    <div className="p-4 bg-green-400 flex justify-center items-center">
      <Link className="text-white font-bold underline mr-4" to="/">
        Back Home
      </Link>
      <Link className="text-white font-bold underline " to="/add">
        Add New User
      </Link>
    </div>
  );
}

export default Header;
