import { Box, Container, Typography } from '@mui/material';
import React, { useEffect, useState } from 'react';
import { apiClient } from '../../libs/api/client';
import { Profile } from '../../types/models/Profile';
import { User } from '../../types/models/User';
import { FormDataModel } from '../../types/utils/object/form-data-model';
import Header from '../global/Header';
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
    user: User;
    profile: Profile;
    avator: {
      url: string;
    };
  };
};
const ProfileMain = () => {
  const [user, setUser] = useState<User>();
  const [profile, setProfile] = useState<Profile>();
  const [avatorUrl, setAvatorUrl] = useState<string>();

  const fetchUserInfo = async () => {
    const res = await apiClient.get<ProfileRes['get']>('/users/me');
    if (!res.data) {
      console.error(res.errors);
      return;
    }
    setUser(res.data.user);
    setProfile(res.data.profile);
    setAvatorUrl(res.data.avator.url);
  };
  const onSubmitEdit = async ({ email }: User, { name, bio, phone }: Profile, avator?: File) => {
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
          source: avator,
        },
      },
      {
        model: 'user',
        data: {
          email,
        },
      },
    ];
    const res = await apiClient.upload<ProfileRes['post']>('/users/me', models);
    if (res.errors) {
      alert('Failed to update your profile. Please retry.');
      console.error(res.errors);
      return;
    }
    if (res.data) {
      setUser(res.data.user);
      setProfile(res.data.profile);
      setAvatorUrl(res.data.avator.url);
    }
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
          <ProfileInfo
            user={user}
            profile={profile}
            avatorUrl={avatorUrl}
            onSubmitEdit={onSubmitEdit}
          />
        </Container>
      </Box>
    </Box>
  );
};

export default ProfileMain;
