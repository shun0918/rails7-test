import { Grid, Link, TextField, Typography } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import React, { useEffect, useState } from 'react';
import { apiClient } from '../../libs/api/client';
import { useParams } from '../../utils/query';

const RegistrationMain = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [hasCreateAccount, sethasCreateAccount] = useState(false);
  const setRegistrationType = () => {
    const params = useParams();
    if (params.get('type') === 'signup') sethasCreateAccount(true);
  };
  const enter = () => {
    window.location.href = '/users';
  };
  const userParams = () => ({
    email,
    password,
  });
  const signup = async () => {
    const res = await apiClient.post<{
      success?: boolean;
    }>('/registrations/signup', userParams());
    if (res.errors) {
      console.error(res.errors.errors?.message);
      setError(res.errors.errors?.message ?? '');
      return;
    }
    enter();
  };
  const login = async () => {
    const res = await apiClient.post<{
      success?: boolean;
    }>('/login', userParams());
    if (res.errors) {
      console.error(res.errors.errors?.message);
      setError(res.errors.errors?.message ?? '');
      return;
    }
    enter();
  };
  const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
    setEmail(event.target.value);
  };
  const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
    setPassword(event.target.value);
  };
  const onSubmit = () => {
    hasCreateAccount ? signup() : login();
  };
  useEffect(() => {
    setRegistrationType();
  }, []);
  return (
    <div className="h-screen flex items-center justify-center">
      <div className="mx-auto border border-gray-300 rounded-lg">
        <Box
          padding={7}
          component="form"
          sx={{
            width: 473,
          }}
        >
          <Typography variant="h1" mb={2} fontSize={16}>
            {hasCreateAccount ? 'Sign up' : 'Login'}
          </Typography>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <TextField onChange={onChangeEmail} label="Email" fullWidth variant="outlined" />
            </Grid>
            <Grid item xs={12}>
              <TextField
                onChange={onChangePassword}
                label="Password"
                fullWidth
                variant="outlined"
                type="password"
              />
            </Grid>
            <Grid item xs={12}>
              <Button
                variant="contained"
                size="large"
                fullWidth
                disableElevation
                onClick={onSubmit}
              >
                {hasCreateAccount ? 'Create account' : 'Login'}
              </Button>
            </Grid>
            <Grid item xs={12}>
              <div className="text-red-500">{error}</div>
            </Grid>
          </Grid>
          <div>
            {hasCreateAccount ? (
              <Link href="/login">Already have Account: Login</Link>
            ) : (
              <Link href="/?type=signup">Create account</Link>
            )}
          </div>
        </Box>
      </div>
    </div>
  );
};

export default RegistrationMain;
