import { Box, styled, Table, TableCell, TableRow } from '@mui/material';
import React from 'react';
import { Profile } from '../../types/models/Profile';
import { User } from '../../types/models/User';

type Props = {
  user?: User;
  profile?: Profile;
  avatorUrl?: string;
};

const _LabelCell = styled(TableCell)({
  color: '#BDBDBD',
  fontSize: 18,
  paddingY: 4,
  paddingX: 4,
});

const ProfileInfo = ({ user, profile, avatorUrl }: Props) => (
  <Box sx={{ border: 1, borderColor: '#BDBDBD', borderRadius: 3 }}>
    <Table>
      <TableRow>
        <_LabelCell>Avator</_LabelCell>
        <TableCell>
          {avatorUrl ? <img src={avatorUrl} width="84" height="84" alt="avator" /> : null}
        </TableCell>
      </TableRow>
      <TableRow>
        <_LabelCell>Name</_LabelCell>
        <TableCell>{profile?.name ?? ''}</TableCell>
      </TableRow>
      <TableRow>
        <_LabelCell>Bio</_LabelCell>
        <TableCell>{profile?.bio ?? ''}</TableCell>
      </TableRow>
      <TableRow>
        <_LabelCell>Phone</_LabelCell>
        <TableCell>{profile?.phone ?? ''}</TableCell>
      </TableRow>
      <TableRow>
        <_LabelCell>Email</_LabelCell>
        <TableCell>{user?.email ?? ''}</TableCell>
      </TableRow>
      <TableRow>
        <_LabelCell>Password</_LabelCell>
        <TableCell>********</TableCell>
      </TableRow>
    </Table>
  </Box>
);

export default ProfileInfo;
