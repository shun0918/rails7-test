
import Button from '@mui/material/Button';
import React, { useEffect, useState } from "react";

const RegistrationMain = () => {
    type User = {
        name: string;
        password: string;
    }
    const [users, setUsers] = useState<User>({ name: 'hoge', password: '********'});
    useEffect(() => {
        const show = async () => {
            const res = await fetch('/registrations/show');
            console.log(res);
            const json = await res.json() as User;
            console.log(json);
            setTimeout(() => {
                setUsers(json);
            },3000);
        }
        show();
    }, []);
    return (
        <div>
            <div className="app">Hello Rails!!!</div>
            <Button variant="contained" >clickme</Button>
            <div>
                <p>users: {users.name}</p>
                <p>password: {users.password}</p>
            </div>
        </div>
    )
};

export default RegistrationMain;