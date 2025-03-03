function Navbar() {
  return (
    <nav className="text-white flex items-center px-5 py-2.5 bg-purple-800">
      <h1 className="mr-auto">My Reading List</h1>
      <ul>
        <li className="inline-block cursor-pointer ml-4 hover:underline">
          Username
        </li>
        <li className="inline-block cursor-pointer ml-4 hover:underline">
          Logout
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;
