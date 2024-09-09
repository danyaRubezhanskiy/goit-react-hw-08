import ContactForm from "./ContactForm/ContactForm";
import ContactList from "./ContactList/ContactList";
import SearchBox from "./SearchBox/SearchBox";

const ContactsPage = () => {
  return (
    <div>
      <ContactForm></ContactForm>
      <SearchBox></SearchBox>
      <ContactList></ContactList>
    </div>
  );
};

export default ContactsPage;
