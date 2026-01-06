import { Box, Container } from "@mui/material";
import { ProfileHeader } from "../../components/Profile/ProfileHeader/ProfileHeader";
import { mockUsers } from "../../mock/data.mock";
import { useParams } from "react-router";
import { useEffect, useState } from "react";
import type { UserProfile } from "../../types";

export const Profile = () => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [profileData, setProfileData] = useState<UserProfile | undefined>();
  const { username } = useParams();

  useEffect(() => {
    // TODO: fetch data from the server
    const userData = mockUsers.find((user) => user.username === username);
    setIsLoading(false);
    if (!userData) {
      // TODO: redirect to 404
    }

    setProfileData(userData);
  }, [username]);

  return (
    <Container maxWidth="lg" sx={{ mt: 4 }}>
      {isLoading
        ? "loading.."
        : profileData != null && (
            <>
              <ProfileHeader user={profileData} />
            </>
          )}
    </Container>
  );
};

export default Profile;
