import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { IClient } from "../utils/interfaces";
import apiCall from "../utils/apiService";
import InfoCard from "../components/InfoCard";

const MainPage = () => {
  const [clientData, setClientData] = useState<IClient[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchClients = async () => {
    const apiResposne = await apiCall("http://localhost:8000/clients");
    setClientData(apiResposne.data?.clients);
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  return (
    <div className="main-page-container">
      <Header />
      {loading ? (
        <div className="flex flex-col justify-center items-center h-[90vh]">
          <div className="loader"></div>
        </div>
      ) : (
        <div className="flex justify-center 2xl:justify-start flex-wrap gap-5 ">
          {clientData.slice(0, 50).map((elem, idx) => (
            <div key={`client_${idx}`}>
              <InfoCard {...elem} />
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default MainPage;
