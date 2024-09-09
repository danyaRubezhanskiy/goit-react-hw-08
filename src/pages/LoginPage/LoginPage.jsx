import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./LoginPage.module.css";
import { useDispatch, useSelector } from "react-redux";
import { apiLogin } from "../../redux/auth/operation";
import { selectError } from "../../redux/auth/selectors";

const LoginPage = () => {
  const dispatch = useDispatch();
  const error = useSelector(selectError);

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Некорректный email")
      .required("Поле email обязательно"),
    password: Yup.string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .required("Поле пароль обязательно"),
  });

  const initialValues = {
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    dispatch(apiLogin(values));
  };

  return (
    <div className={css.formContainer}>
      <h2 className={css.formTitle}>Логин</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="email" className={css.label}>
              Email
            </label>
            <Field type="email" name="email" id="email" className={css.input} />
            <ErrorMessage name="email" component="div" className={css.error} />
          </div>

          <div className={css.formGroup}>
            <label htmlFor="password" className={css.label}>
              Password
            </label>
            <Field
              type="password"
              name="password"
              id="password"
              className={css.input}
            />
            <ErrorMessage
              name="password"
              component="div"
              className={css.error}
            />
          </div>

          <button type="submit" className={css.submitButton}>
            Зарегистрироваться
          </button>
          {error && <p>{error}</p>}
        </Form>
      </Formik>
    </div>
  );
};

export default LoginPage;
