import { useAuthContext } from './useAuthContext';
import { WorkoutsContext } from '../context/WorkoutsContext';
import { useContext } from 'react';

export const useLogout = () => {
  const { dispatch } = useAuthContext();
  const { dispatch: dispatchWorkouts } = useContext(WorkoutsContext); // Use `useContext`

  const logout = () => {
    // remove user from storage
    localStorage.removeItem('user');

    // dispatch logout action
    dispatch({ type: 'LOGOUT' });
    dispatchWorkouts({ type: 'SET_WORKOUTS', payload: null });
  };

  return { logout };
};
