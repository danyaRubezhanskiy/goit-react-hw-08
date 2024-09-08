import { NavLink } from "react-router-dom";
import css from "./Navigation.module.css";
import { useSelector } from "react-redux";
import { selectIsLoggedIn } from "../../redux/auth/selectors";
import AuthNav from "../AuthNav/AuthNav";
import UserMenu from "../UserMenu/UseMenu";

const Navigation = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  return (
    <nav className={css.nav}>
      <NavLink className={css.link} to="/">
        Home
      </NavLink>

      {isLoggedIn ? (
        <>
          <NavLink className={css.link} to="/contacts">
            Contacts
          </NavLink>
          <UserMenu />
        </>
      ) : (
        <AuthNav />
      )}
    </nav>
  );
};

export default Navigation;
