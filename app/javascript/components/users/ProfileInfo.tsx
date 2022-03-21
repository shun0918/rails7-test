import {
  Box,
  Button,
  styled,
  TableBody,
  TableCell,
  TableRow,
  TableHead,
  Table,
  TextField,
} from '@mui/material';
import React, { useEffect, useState } from 'react';
import { Profile } from '../../types/models/Profile';
import { User } from '../../types/models/User';

type Props = {
  user?: User;
  profile?: Profile;
  avatorUrl?: string;
  onSubmitEdit: (user: User, profile: Profile, avator?: File) => void;
};

const _LabelCell = styled(TableCell)({
  color: '#BDBDBD',
  fontSize: 18,
  paddingY: 4,
  paddingX: 4,
});
const _Field = styled(TextField)({
  fullWidth: true,
  valiant: 'outlined',
});

const ProfileInfo = ({ user, profile, avatorUrl, onSubmitEdit }: Props) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState<string>(profile?.name ?? '');
  const [bio, setBio] = useState<string>(profile?.bio ?? '');
  const [phone, setPhone] = useState<string>(profile?.phone ?? '');
  const [email, setEmail] = useState<string>(user?.email ?? '');
  const _onSubmitEdit = () => {
    onSubmitEdit(
      {
        email,
      },
      {
        name,
        bio,
        phone,
      },
    );
  };
  useEffect(() => {}, [user, profile, avatorUrl]);

  return (
    <Box sx={{ border: 1, borderColor: '#BDBDBD', borderRadius: 3 }}>
      <Table>
        <TableHead>
          <TableRow>
            <_LabelCell>Profile</_LabelCell>
            <TableCell>
              <Button
                variant={editMode ? 'outlined' : 'contained'}
                size="large"
                disableElevation
                onClick={() => setEditMode(!editMode)}
              >
                {editMode ? 'Cancel' : 'Edit'}
              </Button>
              {editMode ? (
                <Button variant="contained" size="large" disableElevation onClick={_onSubmitEdit}>
                  Save
                </Button>
              ) : null}
            </TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          <TableRow>
            <_LabelCell>Name</_LabelCell>
            <TableCell>
              {editMode ? (
                <_Field
                  onChange={(e) => {
                    setName(e.target.value);
                  }}
                  value={name}
                  label="Name"
                  type="text"
                />
              ) : (
                <span>{profile?.name}</span>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <_LabelCell>Bio</_LabelCell>
            <TableCell>
              {editMode ? (
                <_Field
                  onChange={(e) => {
                    setBio(e.target.value);
                  }}
                  value={bio}
                  label="Bio"
                  type="text"
                />
              ) : (
                <span>{profile?.bio}</span>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <_LabelCell>Phone</_LabelCell>
            <TableCell>
              {editMode ? (
                <_Field
                  onChange={(e) => {
                    setPhone(e.target.value);
                  }}
                  value={phone}
                  label="Phone"
                  type="text"
                />
              ) : (
                <span>{profile?.phone}</span>
              )}
            </TableCell>
          </TableRow>
          <TableRow>
            <_LabelCell>Email</_LabelCell>
            <TableCell>
              {editMode ? (
                <_Field
                  onChange={(e) => {
                    setEmail(e.target.value);
                  }}
                  value={email}
                  label="Email"
                  type="text"
                />
              ) : (
                <span>{user?.email}</span>
              )}
            </TableCell>
          </TableRow>
        </TableBody>
      </Table>
    </Box>
  );
};

export default ProfileInfo;
