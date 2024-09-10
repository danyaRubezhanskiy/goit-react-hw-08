import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import css from "./RegistrationPage.module.css";
import { useDispatch } from "react-redux";
import { apiRegister } from "../../redux/auth/operations";

const RegistrationPage = () => {
  const dispatch = useDispatch();

  const validationSchema = Yup.object({
    email: Yup.string()
      .email("Некорректный email")
      .required("Поле email обязательно"),
    password: Yup.string()
      .min(6, "Пароль должен содержать минимум 6 символов")
      .required("Поле пароль обязательно"),
  });

  const initialValues = {
    name: "",
    email: "",
    password: "",
  };

  const handleSubmit = (values) => {
    console.log(values);
    dispatch(apiRegister(values));
  };

  return (
    <div className={css.formContainer}>
      <h2 className={css.formTitle}>Регистрация</h2>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={handleSubmit}
      >
        <Form className={css.form}>
          <div className={css.formGroup}>
            <label htmlFor="name" className={css.label}>
              Name
            </label>
            <Field type="name" name="name" id="name" className={css.input} />
          </div>

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
        </Form>
      </Formik>
    </div>
  );
};

export default RegistrationPage;
