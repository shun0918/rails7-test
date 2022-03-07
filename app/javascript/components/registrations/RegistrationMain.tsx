
import { Grid, TextField } from '@mui/material';
import Button from '@mui/material/Button';
import { Box } from '@mui/system';
import React, { useEffect, useState } from "react";
import { apiClient } from '../../libs/api/client';
import { User } from '../../types/models/User';
import UserList from './UserList';

const RegistrationMain = () => {

    const [users, setUsers] = useState<User[]>([]);
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const show = async () => {
        const res = await apiClient.get<User[]>('/registrations/show');
        setUsers(res || []);
    }
    const onSignup = async () => {
        const res = await apiClient.post<User>('/registrations/signup', {
            email,
            password,
        });
        console.log(res);
    }
    const onChangeEmail = (event: React.ChangeEvent<HTMLInputElement>) => {
        setEmail(event.target.value);
    }
    const onChangePassword = (event: React.ChangeEvent<HTMLInputElement>) => {
        setPassword(event.target.value);
    }
    useEffect(() => {
        show();
    }, []);
    return (
        <div className="h-screen flex items-center justify-center">
            <div className="mx-auto border border-gray-300 rounded-lg">
                <Box padding={7} component="form" sx={{
                    width: 473,
                }}>
                    <Grid container spacing={2}>
                        <Grid item xs={12}>
                            <TextField onChange={onChangeEmail} label="Email" fullWidth variant="outlined" />
                        </Grid>
                        <Grid item xs={12}>
                            <TextField onChange={onChangePassword} label="Password" fullWidth variant="outlined" type="password"/>
                        </Grid>
                        <Grid item xs={12}>
                            <Button variant="contained" size="large" fullWidth disableElevation onClick={onSignup}>Signup now</Button>
                        </Grid>
                    </Grid>
                </Box>
                <Box>
                    <UserList users={users}/>
                </Box>
            </div>
        </div>
    )
};

export default RegistrationMain;