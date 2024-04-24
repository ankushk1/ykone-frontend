import { Home, Mail } from "react-feather";
import { useNavigate } from "react-router-dom";
import { IClient } from "../utils/interfaces";

const InfoCard = ({
  _id,
  name,
  email,
  address: {  address }
}: IClient) => {
  const navigate = useNavigate();

  const handleRedirect = () => {
    navigate(`/details/${_id}`);
  };

  return (
    <div>
      <div className="w-[465px] h-[350px] flex flex-col justify-between bg-white rounded-2xl shadow">
        <div className="px-6 py-8 sm:p-10 sm:pb-6">
          <div className="flex flex-col items-center justify-center">
            <div>
              <h2 className="text-2xl tracking-tighter text-gray-800">
                {name}
              </h2>
              <p className=" flex items-start  mt-2 text-md text-gray-700">
                <Mail className="inline w-4 h-8 mr-2 pb-[6px] aspect-square" />
                {email}
              </p>
            </div>
            <div>
              <p className="flex items-start mt-2 text-sm text-gray-700">
                {" "}
                <Home className="inline w-9 aspect-square pb-[6px] mr-2" />
                {address}
              </p>
            </div>
          </div>
        </div>
        <div className="flex justify-center px-6 pb-8 sm:px-8">
          <div
            onClick={handleRedirect}
            className="flex items-center justify-center w-60 px-6 py-2.5 text-center text-white duration-200 bg-blue-600 border-2 rounded-full text-sm cursor-pointer"
          >
            View Details
          </div>
        </div>
      </div>
    </div>
  );
};

export default InfoCard;
