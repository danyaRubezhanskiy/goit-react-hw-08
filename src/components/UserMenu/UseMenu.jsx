import { useDispatch, useSelector } from "react-redux";
import { selectAuthUser } from "../../redux/auth/selectors";
import css from "./UserMenu.module.css";
import { apiLogout } from "../../redux/auth/operation";

const UserMenu = () => {
  const user = useSelector(selectAuthUser);
  const dispatch = useDispatch();

  const onLogout = () => {
    dispatch(apiLogout());
  };

  return (
    <div className={css.userMenu}>
      <p>Welcome, {user.name}!</p>
      <button onClick={onLogout} className={css.submitButton}>
        Logout
      </button>
    </div>
  );
};

export default UserMenu;
