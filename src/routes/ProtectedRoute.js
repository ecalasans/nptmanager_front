import { Navigate } from 'react-router-dom';

const ProtectedRoute = ({ children }) => {
    const auth = JSON.parse(localStorage.getItem('auth')) || {};

    return auth.user ? <>{children}</> : < Navigate to="/login/" />;
}

export default ProtectedRoute;