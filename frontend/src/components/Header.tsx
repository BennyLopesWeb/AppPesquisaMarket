import React from "react";

const Header = () => {
  return (
    <header className="bg-white shadow-md p-4 flex justify-between items-center">
      <h1 className="text-xl font-bold">Dashboard</h1>
      <button className="text-sm text-red-500 hover:underline">
        Sair
      </button>
    </header>
  );
};

export default Header;
