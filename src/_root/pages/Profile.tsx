import { useUserContext } from '@/context/AuthContext';
import React from 'react';

export const Profile = () => {
  const { user } = useUserContext();
  return <div>Profile of {user.name}</div>;
};
