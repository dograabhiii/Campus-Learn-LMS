import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

const Navbar = () => {
  const { isAuthenticated } = useAuth();
  const { logout } = useAuth();

  const user = JSON.parse(
    localStorage.getItem("user")
  );
  return (
    <nav  style={{ padding: "30px", display: "flex", justifyContent: "space-between", background: "white", color: "#1e3a8a" }} className="sticky top-0 z-50">
      <h1 className="text-3xl font-bold">CampusLearn</h1>
      <div style={{ display: "flex", gap: "20px", fontSize: "20px" }}>
        <Link to="/" className="nav-line" style={{ color: "#1e3a8a" }}>Home</Link>
        <Link to="/courses" className="nav-line" style={{ color: "#1e3a8a" }}>Courses</Link>
        {isAuthenticated ? null : (
          <>
            <Link to="/login" className="nav-line" style={{ color: "#1e3a8a" }}>Login</Link>
            <Link to="/register" className="nav-line" style={{ color: "#1e3a8a" }}>Register</Link>
          </>
        )}
        {isAuthenticated && (
          <>
            <Link to={
              user?.role === "instructor"
                ? "/instructor"
                : "/dashboard"
            }
              className="nav-line" style={{ color: "#1e3a8a" }}>Profile</Link>
            <Link to="/" onClick={logout} className="nav-line" style={{ color: "#1e3a8a" }}>Logout</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;