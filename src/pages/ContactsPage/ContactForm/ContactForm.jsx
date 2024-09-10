import { Formik, Form, Field } from "formik";
import css from "./ContacForm.module.css";
import * as Yup from "yup";
import { ErrorMessage } from "formik";
import { useDispatch, useSelector } from "react-redux";
import { apiAddContact } from "../../../redux/contacts/operation";
import { selectIsLoggedIn } from "../../../redux/auth/selectors";

const ContactForm = () => {
  const isLoggedIn = useSelector(selectIsLoggedIn);
  const FeedbackSchema = Yup.object().shape({
    name: Yup.string()
      .min(3, "Too Short!")
      .max(50, "Too Long!")
      .required("Required"),
    number: Yup.number().required("Required").min(3, "Too Short!"),
  });

  const dispatch = useDispatch();

  const handleSubmit = (values, actions) => {
    dispatch(apiAddContact(values));
    actions.resetForm();
  };

  return (
    <Formik
      initialValues={{
        name: "",
        number: "",
      }}
      onSubmit={handleSubmit}
      validationSchema={FeedbackSchema}
    >
      <Form className={css.form}>
        <label className={css.label} htmlFor="contactName">
          <span>Name</span>
          <Field
            className={css.input}
            type="text"
            name="name"
            id="contactName"
          />
          <ErrorMessage
            className={css.errorMessage}
            name="name"
            component="span"
          />
        </label>
        <label className={css.label} htmlFor="contactNumber">
          <span>Number</span>
          <Field
            className={css.input}
            type="number"
            name="number"
            id="contactNumber"
          />
          <ErrorMessage
            className={css.errorMessage}
            name="number"
            component="span"
          />
        </label>
        <button className={css.submit} type="submit">
          Add Contact
        </button>
      </Form>
    </Formik>
  );
};

export default ContactForm;
