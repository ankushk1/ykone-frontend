import React, { useEffect, useState } from "react";
import apiCall from "../utils/apiService";
import { useLocation, useNavigate } from "react-router-dom";

const CreateClient = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [inputs, setInputs] = useState({
    name: "",
    cin: "",
    email: "",
    address: {
      state: "",
      pinCode: "",
      address: "",
      country: ""
    }
  });

  useEffect(() => {
    if (location.state) {
      setInputs(location.state);
    }
  }, []);

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (location.state) {
      const apiResponse = await apiCall(
        `http://localhost:8000/clients/${location.state?._id}`,
        "POST",
        { contentType: "application/json" },
        inputs
      );
      if (apiResponse.status === 200) {
        navigate("/");
      } else {
        console.log("Error Updating user");
      }
    } else {
      const apiResponse = await apiCall(
        "http://localhost:8000/clients",
        "POST",
        { contentType: "application/json" },
        inputs
      );
      if (apiResponse.status === 200) {
        navigate("/");
      } else {
        console.log("Error Creating user");
      }
    }
  };

  return (
    <div className="flex flex-col justify-center items-center h-[100vh]">
      <div className="fs-1 mb-5 font-bold text-gray-700">
        {location.state ? "Update Client" : "Create Client"}
      </div>
      <div className="w-[70%]  flex flex-col  bg-white rounded-2xl shadow p-4">
        <form className="px-3" onSubmit={(e) => handleSubmit(e)}>
          <input
            name="companyName"
            className="form-control mb-3"
            placeholder="Client Name"
            value={inputs.name}
            onChange={(e) => setInputs({ ...inputs, name: e.target.value })}
            required
          ></input>
          <input
            name="email"
            className="form-control mb-3"
            placeholder="Client Email"
            type="email"
            value={inputs.email}
            onChange={(e) => setInputs({ ...inputs, email: e.target.value })}
            required
          ></input>
          <textarea
            className="form-control mb-3"
            placeholder="Address"
            value={inputs.address?.address}
            required
            onChange={(e) =>
              setInputs({
                ...inputs,
                address: {
                  ...inputs.address,
                  address: e.target.value
                }
              })
            }
          ></textarea>
          <div className="row mb-3">
            <div className="col-7">
              <input
                name="cin"
                className="form-control"
                placeholder="CIN"
                value={inputs.cin}
                minLength={21}
                required
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    cin: e.target.value
                  })
                }
              ></input>
            </div>
            <div className="col-5">
              <input
                name="pinCode"
                className="form-control"
                placeholder="Pin Code"
                value={inputs.address?.pinCode}
                minLength={6}
                required
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    address: {
                      ...inputs.address,
                      pinCode: e.target.value
                    }
                  })
                }
              ></input>
            </div>
          </div>
          <div className="row mb-3">
            <div className="col">
              <input
                name="state"
                className="form-control"
                placeholder="State"
                value={inputs.address?.state}
                required
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    address: {
                      ...inputs.address,
                      state: e.target.value
                    }
                  })
                }
              ></input>
            </div>
            <div className="col">
              <input
                name="country"
                className="form-control"
                placeholder="Country"
                required
                value={inputs.address?.country}
                onChange={(e) =>
                  setInputs({
                    ...inputs,
                    address: {
                      ...inputs.address,
                      country: e.target.value
                    }
                  })
                }
              ></input>
            </div>
          </div>
          <div className="flex justify-center mt-4">
            <input
              type="submit"
              value={location.state ? "Update Client" : "Create Client"}
              className={`btn ${location.state ? "btn-info" : "btn-success"} `}
            />
          </div>
        </form>
      </div>
    </div>
  );
};

export default CreateClient;
