import { NavLink } from "react-router-dom";
const OwnerNavbar = () => {
  return (
    <div>
      <nav>
        <ul>
          <li>
            <NavLink to="/notification">Notification</NavLink>
          </li>

          <li>
            <NavLink to="/EditDelete">Edit/Delete</NavLink>
          </li>

          <li>
            <NavLink to="/properties">Browser Properties</NavLink>
          </li>
          <li>
            <NavLink to="/AddProperty">Add Property</NavLink>
          </li>
        </ul>
      </nav>
    </div>
  );
};
export default OwnerNavbar;
