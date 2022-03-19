import { Grid } from '@mui/material';
import React from 'react';
import { User } from '../../types/models/User';

type Props = {
  users: User[];
};

const UserList = ({ users }: Props) => {
  return (
    <div>
      {users && users.length
        ? users.map((user) => (
            <Grid key={user.email}>
              <Grid item>{user.email}</Grid>
              <Grid item>{user.password}</Grid>
            </Grid>
          ))
        : null}
    </div>
  );
};

export default UserList;
