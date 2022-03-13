import React, { useEffect, useState } from "react";
import { apiClient } from "../../libs/api/client";
import { User } from '../../types/models/User';

type Res = {
    users: User
}
const ProfileMain = () => {
    const [user, setUser] = useState({});
    const profile = async () => {
        const res = await apiClient.get<Res>('/')
        if(!res.data) {
            console.error(res.errors);
            return
        }
        setUser(res.data);
    }
    useEffect(() => {
        profile;
    },[])
    return (
        <div>Profile</div>
    )
};

export default ProfileMain;