import axios from "axios";
import { use, useEffect, useState } from "react";
import { BounceLoader } from "react-spinners";
import './contactTable.css'
import { useDispatch } from "react-redux";
import { logout } from "../../features/user/userSlice";

const ContactTable = () => {
  const [contacts, setContacts] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const dispatch = useDispatch();

  const getAllContacts = () => {
    setIsLoading(true);

    const config = {
      headers: {
        Authorization: localStorage.getItem("token")
      }
    };

    axios.get('https://api.priyank.space/api/v1/admin/getAllContacts', config)
      .then((data) => {
        setContacts(data.data.contactData)
        setIsLoading(false);
      })
      .catch((err) => {
        console.log(err);
        if(err.response.status === 403) {
          console.log("expired token")
          dispatch(logout());
        }
        setIsLoading(false);
      });
  }

  useEffect(() => {
    if (!localStorage.getItem("token")) {
      console.log("token not available");
      setIsLoading(false);
    } else {
      getAllContacts();
    }
  }, [])

  return (
    <div className="contact-table-container">
      <h2 className="contact-table-title">Contact Submissions</h2>
      {isLoading ? (
        <div className="loading-spinner-container">
          <BounceLoader color="#1f2937" size={80} />
        </div>
      ) : (
        <div className="table-wrapper">
          <table className="modern-table">
            <thead>
              <tr>
                <th className="th-srno">Sr No</th>
                <th className="th-name">Name</th>
                <th className="th-email">Email</th>
                <th className="th-message">Message</th>
                <th className="th-status">Status</th>
              </tr>
            </thead>
            <tbody>
              {
                contacts?.map((contact, index) => (
                  <tr key={contact._id}>
                    <td>{index + 1}</td>
                    <td>{contact.name}</td>
                    <td>{contact.email}</td>
                    <td>{contact.message}</td>
                    <td>
                      <select
                        value={contact.status}
                        className="status-dropdown-modern"
                      >
                        <option value="pending">Pending</option>
                        <option value="inprocess">In Process</option>
                        <option value="completed">Completed</option>
                        <option value="hold">Hold</option>
                      </select>
                    </td>
                  </tr>
                ))
              }
            </tbody>
          </table>
        </div>
      )
      }
    </div>
  );
};

export default ContactTable;