import React, { useEffect, useState } from "react";
import { apiClient } from "../../libs/api/client";
import { Profile } from "../../types/models/Profile";
import { User } from '../../types/models/User';
import ProfileInfo from "./ProfileInfo";

type Res = {
    user: User
    profile: Profile
}
const ProfileMain = () => {
    const [user, setUser] = useState<User>();
    const [profile, setProfile] = useState<Profile>();

    const fetchUserInfo = async () => {
        const res = await apiClient.get<Res>('/users/profile/me');
        if(!res.data) {
            console.error(res.errors);
            return
        }
        setUser(res.data.user);
        setProfile(res.data.profile);
    };
    useEffect(() => {
        fetchUserInfo();
    },[]);
    return (
        <div>
            <ProfileInfo
                user={user}
                profile={profile}
            />
        </div>
    );
};

export default ProfileMain;