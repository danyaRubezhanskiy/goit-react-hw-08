import { useSelector } from "react-redux";
import { selectAuthUser } from "../../redux/auth/selectors";
import css from "./UserMenu.module.css";

const UserMenu = () => {
  const user = useSelector(selectAuthUser);

  return (
    <div className={css.userMenu}>
      <p>Welcome, {user.name}!</p>
      <button className={css.submitButton}>Logout</button>
    </div>
  );
};

export default UserMenu;
