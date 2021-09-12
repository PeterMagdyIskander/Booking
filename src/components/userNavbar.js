import { NavLink } from "react-router-dom";
const UserNavbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/properties">Browser Properties</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default UserNavbar;
