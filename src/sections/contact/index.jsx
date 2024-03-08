import './index.css';
import {useRef, useState} from "react";
import FormInput from "../../components/formInput/index.jsx";
import Heading from "../../components/heading/index.jsx";
import Text from "../../components/text/index.jsx";
import Button from "../../components/button/index.jsx";

const Contact = () => {
  const formRef = useRef();
  const [form, setForm] = useState({
    firstName: "",
    lastName: "",
    phoneNumber: "",
    service: "",
  });

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({ ...form, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    console.log("data", form)
  };

  return (
    <div className="contact">
      <div className="container">
        <div className="content">
          <Heading level={2} color="#000000">
            Contact
          </Heading>
          <Text color="#000000">
            Question or concerns? Just fill out the form below and our support team will get back to you within 24 hours
          </Text>
        </div>
        <div>
          <form
            ref={formRef}
            onSubmit={handleSubmit}
          >
            <div className="elements-in-line">
              <FormInput
                type="text"
                required
                name="firstName"
                value={form.firstName}
                onChange={handleChange}
                placeholder="First name"
              />
              <FormInput
                type="text"
                required
                name="lastName"
                value={form.lastName}
                onChange={handleChange}
                placeholder="Last name"
              />
            </div>
            <FormInput
              type="text"
              required
              style="full"
              name="phoneNumber"
              value={form.phoneNumber}
              onChange={handleChange}
              placeholder="Phone number"
            />
            <FormInput
              type="text"
              required
              style="full"
              name="service"
              value={form.service}
              onChange={handleChange}
              placeholder="What services are you intrested in?"
            />
            <Button
              type="submit"
              title="SUBMIT NOW"
              textColor="#FFFFFF"
              backgroundColor="#D52047"
            />
          </form>
        </div>
      </div>
    </div>
  )
};

export default Contact;
