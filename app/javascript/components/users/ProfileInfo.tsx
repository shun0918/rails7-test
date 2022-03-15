import React from "react";
import { Profile } from "../../types/models/Profile";
import { User } from "../../types/models/User";

type Props = {
  user?: User,
  profile?: Profile
}

const ProfileInfo = ({ user, profile }: Props) => (
  <div>
      { user ? (
          <div>
              <div>User</div>
              <div>
                  <p>{user.email}</p>
                  <p>{user.password}</p>
              </div>
          </div>
      ) : null }
      { profile ? (
          <div>
              <div>Profile</div>
              <div>
                  <p>bio: {profile.bio}</p>
                  <p>name: {profile.name}</p>
                  <p>phone: {profile.phone}</p>
              </div>
          </div>
      ) : null }
  </div>
);

export default ProfileInfo;