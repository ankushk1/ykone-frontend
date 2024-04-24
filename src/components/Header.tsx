import { useNavigate } from "react-router-dom";

const Header = () => {

  const navigate = useNavigate();

  return (
    <div className="flex justify-between items-center bg-white rounded-2xl shadow py-3 px-4 mt-3 mb-4">
      <div className="text-3xl font-semibold">Client List</div>
      <button className="btn btn-primary btn" onClick={() => navigate('/create')}>Create New Client</button>
    </div>
  );
};

export default Header;
