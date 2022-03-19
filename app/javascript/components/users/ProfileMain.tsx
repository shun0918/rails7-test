import { Box, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { apiClient } from '../../libs/api/client';
import { Profile } from '../../types/models/Profile';
import { User } from '../../types/models/User';
import { FormDataModel } from '../../types/utils/object/form-data-model';
import Header from '../global/Header';
import ProfileEditer from './ProfileEditer';
import ProfileInfo from './ProfileInfo';

type ProfileRes = {
  get: {
    user: User;
    profile: Profile;
    avator: {
      url: string;
    };
  };
  post: {
    success: boolean;
  };
};
const ProfileMain = () => {
  const [user, setUser] = useState<User>();
  const [profile, setProfile] = useState<Profile>();

  const [name, setName] = useState<string>('');
  const [bio, setBio] = useState<string>('');
  const [phone, setPhone] = useState<string>('');
  const [avatorUrl, setAvatorUrl] = useState<string>();
  const [image, setImage] = useState<File>();

  const fetchUserInfo = async () => {
    const res = await apiClient.get<ProfileRes['get']>('/users/profile/me');
    if (!res.data) {
      console.error(res.errors);
      return;
    }
    if (res.data.profile) {
      setName(res.data.profile.name || '');
      setBio(res.data.profile.bio || '');
      setPhone(res.data.profile.phone || '');
    }
    setUser(res.data.user);
    setProfile(res.data.profile);
    setAvatorUrl(res.data.avator.url);
  };
  const updateProfile = async () => {
    const models: FormDataModel[] = [
      {
        model: 'profile',
        data: {
          name,
          bio,
          phone,
        },
      },
      {
        model: 'user_file',
        data: {
          source: image,
        },
      },
    ];
    const res = await apiClient.upload<ProfileRes['post']>('/users/profile/me', models);
    if (res.errors) {
      alert('Failed to update your profile. Please retry.');
      console.error(res.errors);
      return;
    }
    fetchUserInfo();
  };
  const onSubmitEdit = () => {
    updateProfile();
  };
  useEffect(() => {
    fetchUserInfo();
  }, []);
  return (
    <Box>
      <Header />
      <Box sx={{ paddingY: 8 }}>
        <Container maxWidth="lg">
          <Typography variant="h1" component="h1" sx={{ fontSize: 48, marginBlockEnd: 4 }}>
            Profile
          </Typography>
          <ProfileInfo user={user} profile={profile} avatorUrl={avatorUrl} />
          <ProfileEditer
            name={name}
            bio={bio}
            phone={phone}
            image={image}
            onChangeName={setName}
            onChangeBio={setBio}
            onChangePhone={setPhone}
            onChangeImage={setImage}
            onSubmitEdit={onSubmitEdit}
          />
        </Container>
      </Box>
    </Box>
  );
};

export default ProfileMain;
