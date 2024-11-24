import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import PropTypes from "prop-types";
import { useAuth } from "../contexts/AuthContext";

const ProtectedRoute = ({ children }) => {
    const navigate = useNavigate();
    const { isAuthenticated } = useAuth();

    useEffect(() => {
        if(!isAuthenticated) navigate("/");
    }, [isAuthenticated, navigate]);

    return isAuthenticated ? children : null;
}

ProtectedRoute.propTypes = {
    children: PropTypes.any
};

export default ProtectedRoute;