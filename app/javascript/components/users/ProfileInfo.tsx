import {
  Box,
  Button,
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
import UploadButton from '../ui/buttons/UploadButton';

type Props = {
  user?: User;
  profile?: Profile;
  avatorUrl?: string;
  onSubmitEdit: (user: User, profile: Profile, avator?: File) => void;
};

const _Row: React.FC<{ name: string }> = ({ name, children }) => {
  return (
    <TableRow>
      <TableCell sx={{ color: '#BDBDBD', fontSize: 18, padding: 4 }}>{name}</TableCell>
      <TableCell>{children}</TableCell>
    </TableRow>
  );
};

const ProfileInfo: React.FC<Props> = ({ user, profile, avatorUrl, onSubmitEdit }) => {
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState<string>(profile?.name ?? '');
  const [bio, setBio] = useState<string>(profile?.bio ?? '');
  const [phone, setPhone] = useState<string>(profile?.phone ?? '');
  const [email, setEmail] = useState<string>(user?.email ?? '');
  const [avator, setAvator] = useState<File>();
  const [newAvatorUrl, setNewAvatorUrl] = useState<string>('');
  const createAvatorUrl = () => {
    if (!avator) return;
    const reader = new FileReader();
    reader.onload = (event) => {
      if (typeof event?.target?.result === 'string') {
        setNewAvatorUrl(event.target.result);
      }
    };
    reader.readAsDataURL(avator);
  };
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
      avator,
    );
  };
  useEffect(() => {
    const initValues = () => {
      setName(profile?.name ?? '');
      setBio(profile?.bio ?? '');
      setPhone(profile?.phone ?? '');
      setEmail(user?.email ?? '');
    };
    initValues();
  }, [user, profile, avatorUrl]);
  useEffect(() => {
    createAvatorUrl();
  }, [avator]);

  return (
    <Box sx={{ border: 1, borderColor: '#BDBDBD', borderRadius: 3 }}>
      <Table>
        <TableHead>
          <_Row name="Profile">
            <Button
              variant={editMode ? 'outlined' : 'contained'}
              size="large"
              disableElevation
              onClick={() => setEditMode(!editMode)}
            >
              {editMode ? 'Cancel' : 'Edit'}
            </Button>
            {editMode ? (
              <Button
                sx={{ marginLeft: 2 }}
                variant="contained"
                size="large"
                disableElevation
                onClick={_onSubmitEdit}
              >
                Save
              </Button>
            ) : null}
          </_Row>
        </TableHead>
        <TableBody>
          <_Row name="Avator">
            {avatorUrl && !newAvatorUrl ? (
              <img
                src={avatorUrl}
                className="object-contain object-center"
                width="84"
                height="84"
              />
            ) : null}
            {newAvatorUrl ? (
              <img
                src={newAvatorUrl}
                className="object-contain
                    object-center"
                width="84"
                height="84"
              />
            ) : null}
            {editMode ? (
              <div className="mt-4">
                <UploadButton
                  onChange={(e) => {
                    setAvator(e.target.files?.item(0) ?? undefined);
                  }}
                />
              </div>
            ) : null}
          </_Row>
          <_Row name="Name">
            {editMode ? (
              <TextField
                variant="outlined"
                fullWidth
                onChange={(e) => {
                  setName(e.target.value);
                }}
                value={name}
                label="Name"
                type="text"
              />
            ) : (
              <p>{profile?.name}</p>
            )}
          </_Row>
          <_Row name="Bio">
            {editMode ? (
              <TextField
                variant="outlined"
                fullWidth
                onChange={(e) => {
                  setBio(e.target.value);
                }}
                value={bio}
                label="Bio"
                type="text"
              />
            ) : (
              <p>{profile?.bio}</p>
            )}
          </_Row>
          <_Row name="Phone">
            {editMode ? (
              <TextField
                variant="outlined"
                fullWidth
                onChange={(e) => {
                  setPhone(e.target.value);
                }}
                value={phone}
                label="Phone"
                type="text"
              />
            ) : (
              <p>{profile?.phone}</p>
            )}
          </_Row>
          <_Row name="Email">
            {editMode ? (
              <TextField
                variant="outlined"
                fullWidth
                onChange={(e) => {
                  setEmail(e.target.value);
                }}
                value={email}
                label="Email"
                type="text"
              />
            ) : (
              <p>{user?.email}</p>
            )}
          </_Row>
        </TableBody>
      </Table>
    </Box>
  );
};

export default ProfileInfo;
