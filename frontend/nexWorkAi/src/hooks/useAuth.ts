import { useMutation } from '@tanstack/react-query';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { authService } from '../api/services/authService';
import { logout, setCredentials } from '../store/slices/authSlice';

export const useLogin = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return useMutation({
    mutationFn: authService.login,
    onSuccess: (data) => {
      dispatch(setCredentials(data));
      navigate('/');
    },
  });
};

export const useLogout = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  return () => {
    dispatch(logout());
    navigate('/login');
  };
};
