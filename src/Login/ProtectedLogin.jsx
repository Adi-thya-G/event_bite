import React, { useEffect } from 'react';
import { useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';

function ProtectedLogin({ children }) {
  const status = useSelector((state) => state.auth.status);
  const navigate = useNavigate();

  useEffect(() => {
    if (status) {
      navigate('/not-page-found'); // make sure this route exists
    }
  }, [status, navigate]);

  if (status) {
    return null; // or a loader if you want
  }

  return children;
}

export default ProtectedLogin;
