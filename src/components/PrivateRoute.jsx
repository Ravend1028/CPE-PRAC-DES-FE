import { Navigate, Outlet } from "react-router"; 
import { useSelector } from "react-redux";

const PrivateRoute = () => {
  const { userInfo } = useSelector((state) => state.auth);

  return (
    userInfo ? <Outlet /> : <Navigate to='/' replace />
  )
}

export default PrivateRoute