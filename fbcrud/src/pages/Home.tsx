import { useEffect, useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { toast } from "react-toastify";
// import { v4 as uuidv4 } from "uuid";
import "./Home.css";

const Home = () => {
  const [data, setData] = useState([]);

  const loadData = async () => {
    // Get Data
    const res = await axios.get("http://localhost:3000/");
    setData(res.data);
  };

  useEffect(() => {
    loadData();
  }, []);

  const deleteContact = (id: any) => {
    if (window.confirm("Are you Sure delete this?")) {
      // Delete Data
      axios.delete(`http://localhost:3000/delete/${id}`);
      toast.success("Contact Deleted successfully");
      setTimeout(() => loadData(), 500);
    }
  };

  return (
    <div style={{ marginTop: "150px" }}>
      <Link to="/adduser">
        <button className="btn btn-contact">Add User</button>
      </Link>
      <table className="styled-table">
        <thead>
          <tr>
            <th style={{ textAlign: "center" }}>No.</th>
            <th style={{ textAlign: "center" }}>Name</th>
            <th style={{ textAlign: "center" }}>Email</th>
            <th style={{ textAlign: "center" }}>Phone</th>
            <th style={{ textAlign: "center" }}>Action</th>
          </tr>
        </thead>
        <tbody>
          {data.map((item: any, index) => {
            return (
              <tr key={index}>
                <th scope="row">{index + 1}</th>
                <td>{item.name}</td>
                <td>{item.email}</td>
                <td>{item.phone}</td>
                <td>
                  <Link to={`/update/${item.id}`}>
                    <button className="btn btn-edit">Edit</button>
                  </Link>
                  <button
                    className="btn btn-delete"
                    onClick={() => deleteContact(item.id)}
                  >
                    Delete
                  </button>
                  <Link to={`/view/${item.id}`}>
                    <button className="btn btn-view">View</button>
                  </Link>
                </td>
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
};

export default Home;
