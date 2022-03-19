import { Button } from '@mui/material';
import React from 'react';
import { apiClient } from '../../libs/api/client';

const Header = () => {
  const onSignout = async () => {
    const res = await apiClient.delete('/logout');
    if (res.errors) {
      alert('Failed to sign out. Please try again.');
      return;
    }
    window.location.href = '/';
  };
  return (
    <div className="bg-gray-200">
      <div className="container py-4 mx-auto">
        <div className="flex items-center justify-between">
          <div>Rails Board</div>
          <Button onClick={onSignout} variant="contained" component="span">
            Sign out
          </Button>
        </div>
      </div>
    </div>
  );
};

export default Header;
