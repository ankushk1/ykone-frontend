import React, { useEffect, useState } from "react";
import Header from "../components/Header";
import { IClient } from "../utils/interfaces";
import apiCall from "../utils/apiService";
import InfoCard from "../components/InfoCard";
import { PaginationControl } from "react-bootstrap-pagination-control";

const MainPage = () => {
  const [clientData, setClientData] = useState<IClient[]>([]);
  const [clientDataCopy, setClientDataCopy] = useState<IClient[]>([]);
  const [loading, setLoading] = useState(true);
  const [page, setPage] = useState(1);
  const [searchInput, setSearchInput] = useState("");

  const fetchClients = async () => {
    const apiResposne = await apiCall("http://localhost:8000/clients");
    setClientData(apiResposne.data?.clients);
    setClientDataCopy(apiResposne.data?.clients);
    setLoading(false);
  };

  useEffect(() => {
    fetchClients();
  }, []);

  useEffect(() => {
    if (!searchInput) {
      setClientData(clientDataCopy);
    } else {
      const filteredData = clientData.filter((elem) => {
        return (
          elem.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          elem.name.toLowerCase().includes(searchInput.toLowerCase()) ||
          elem.cin.includes(searchInput)
        );
      });
      setClientData(filteredData);
    }
  }, [searchInput]);

  console.log(page);
  return (
    <div className="main-page-container">
      <Header />
      <div className="ml-2">
        <input
          className="w-[20%] mb-3 relative m-0 block flex-auto rounded border border-solid border-neutral-200 bg-white px-3 py-[0.25rem] text-base font-normal leading-[1.6] outline-none placeholder:text-neutral-800 
          "
          placeholder="Search"
          type="search"
          value={searchInput}
          onChange={(e) => setSearchInput(e.target.value)}
        />
      </div>

      {loading ? (
        <div className="flex flex-col justify-center items-center h-[90vh]">
          <div className="loader"></div>
        </div>
      ) : (
        <>
          <div className="flex justify-center 2xl:justify-start flex-wrap gap-5 ">
            {!clientData.length ? (
              <p className="text-3xl ml-3 text-bold">No Client Found</p>
            ) : (
              clientData
                .slice((page - 1) * 6, (page - 1) * 6 + 6)
                .map((elem, idx) => (
                  <div key={`client_${idx}`}>
                    <InfoCard {...elem} />
                  </div>
                ))
            )}
          </div>
          <div className="mt-4">
            <PaginationControl
              page={page}
              between={6}
              total={clientData.length}
              limit={6}
              changePage={(page) => {
                setPage(page);
              }}
              ellipsis={2}
            />
          </div>
        </>
      )}
    </div>
  );
};

export default MainPage;
