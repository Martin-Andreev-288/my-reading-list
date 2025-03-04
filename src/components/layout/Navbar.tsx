import { useLogout } from "@/hooks/useLogout";

function Navbar() {
  const { logout } = useLogout();

  return (
    <nav className="bg-white shadow-sm rounded-lg mx-4 mt-4">
      <div className="max-w-7xl mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <span className="text-2xl">📚</span>
            <h1 className="text-xl font-semibold text-gray-800 hover:text-gray-900 transition-colors">
              My Reading List
            </h1>
          </div>

          <div className="flex items-center space-x-4">
            <span className="text-gray-600 text-sm">Username</span>
            <button
              className="text-gray-600 hover:text-gray-900 text-sm font-medium transition-colors"
              onClick={logout}
            >
              Logout
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}

export default Navbar;
