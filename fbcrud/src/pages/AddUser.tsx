import { useState, useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import { toast } from "react-toastify";
import axios from "axios";
import "./AddUser.css";

const initialState = {
  name: "",
  email: "",
  phone: "",
};

const AddUser = () => {
  const [state, setState] = useState(initialState);
  const { name, email, phone } = state;

  const navigate = useNavigate();

  // const { id } = useParams();

  const handleSubmit = (e: any) => {
    e.preventDefault();
    if (!name || !email || !phone) {
      toast.error("Please provide input value");
    } else {
      //Post Data Create
      axios
        .post("http://localhost:3000/create", {
          name,
          email,
          phone,
        })
        .then(() => {
          setState({
            name: "",
            email: "",
            phone: "",
          });
        })
        .catch((err) => toast.error(err.response.data));
      toast.success("Contact Added Successfully");
      setTimeout(() => navigate("/"), 500);
    }
  };

  const handleInputChange = (e: any) => {
    const { name, value } = e.target;
    setState({ ...state, [name]: value });
  };

  return (
    <div>
      <form onSubmit={handleSubmit}>
        <label htmlFor="name">Name</label>
        <input
          type="text"
          id="name"
          name="name"
          placeholder="Enter your Name"
          value={name}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="email">Email</label>
        <input
          type="email"
          id="email"
          name="email"
          placeholder="Enter your Email"
          value={email}
          onChange={handleInputChange}
        />
        <br />
        <label htmlFor="text">Phone</label>
        <input
          type="number"
          id="phone"
          name="phone"
          placeholder="Enter Your Phone No"
          value={phone}
          onChange={handleInputChange}
        />
        <br />
        <input type="submit" value="Save" />
        <Link to="/">
          <input type="button" value="Go Back" />
        </Link>
      </form>
    </div>
  );
};

export default AddUser;
