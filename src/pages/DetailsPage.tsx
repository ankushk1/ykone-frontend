import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { IClient } from "../utils/interfaces";
import apiCall from "../utils/apiService";
import Modal from "react-bootstrap/Modal";

const DetailsPage = () => {
  const params = useParams();
  const [data, setData] = useState<IClient | null>(null);
  const [modalShow, setModalShow] = useState(false);
  const [loading, setLoading] = useState(true);

  const navigate = useNavigate();

  const fetchClient = async () => {
    const apiResposne = await apiCall(
      `http://localhost:8000/clients/${params.id}`
    );
    setData(apiResposne.data?.client);
    setLoading(false);
  };

  useEffect(() => {
    fetchClient();
  }, []);

  const handleDelete = async () => {
    const apiResposne = await apiCall(
      `http://localhost:8000/clients/${params.id}`,
      "DELETE"
    );
    if (apiResposne.status === 200) {
      navigate("/");
    } else {
      console.log("Error Deleting client");
    }
  };

  return (
    <>
      {loading ? (
        <div className="flex flex-col justify-center items-center h-[90vh]">
          <div className="loader"></div>
        </div>
      ) : (
        data && (
          <div className="flex flex-col justify-center items-center h-[100vh]">
            <div className="fs-1 mb-5 font-bold text-gray-700">
              Client Details
            </div>
            <div className="w-[50%]  flex flex-col  bg-white rounded-2xl shadow p-4">
              <div className="row text-md ">
                <div className="col font-semibold">Client Name</div>
                <div className="col">{data.name}</div>
              </div>
              <hr />
              <div className="row ">
                <div className="col font-semibold">CIN</div>
                <div className="col">{data.cin}</div>
              </div>
              <hr />
              <div className="row ">
                <div className="col font-semibold">Email</div>
                <div className="col">{data.email}</div>
              </div>
              <hr />
              <div className="row ">
                <div className="col font-semibold">Address</div>
                <div className="col ">{data.address?.address}</div>
              </div>
              <hr />
              <div className="row ">
                <div className="col font-semibold">Pin Code</div>
                <div className="col">{data.address?.pinCode}</div>
              </div>
              <hr />
              <div className="row ">
                <div className="col font-semibold">State</div>
                <div className="col">{data.address?.state}</div>
              </div>
              <hr />
              <div className="row ">
                <div className="col font-semibold">Country</div>
                <div className="col">{data.address?.country}</div>
              </div>
            </div>
            <div className="buttons mt-5 ">
              <div
                className="btn btn-secondary mr-3 text-white"
                onClick={() => navigate("/create", { state: data })}
              >
                Update
              </div>
              <div
                className="btn btn-danger"
                onClick={() => setModalShow(true)}
              >
                Delete
              </div>
            </div>
          </div>
        )
      )}
      <Modal
        size="lg"
        aria-labelledby="contained-modal-title-vcenter"
        centered
        show={modalShow}
      >
        <div className="flex flex-col items-center justify-around p-4 h-[30vh]">
          <div className="text-2xl text-gray-700 text-center">
            Are you sure you want to delete
            <p>{data && data.name}?</p>
          </div>
          <div className="buttons">
            <div className="btn btn-danger mr-5" onClick={handleDelete}>
              Delete
            </div>
            <div className="btn btn-dark" onClick={() => setModalShow(false)}>
              Cancel
            </div>
          </div>
        </div>
      </Modal>
    </>
  );
};

export default DetailsPage;
