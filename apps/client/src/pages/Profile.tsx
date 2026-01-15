import { Container } from "@mui/material";
import { ProfileHeader } from "../components/Profile/ProfileHeader/ProfileHeader";
import { useParams } from "react-router-dom";
import type { UserProfile } from "@repo/types";
import { ProfilePosts } from "../components/Profile/ProfilePosts/ProfilePosts";
import { useQuery } from "@tanstack/react-query";
import { getUserByUsername } from "../api/user";

export const Profile = () => {
  const { username } = useParams();

  const {
    data: profileData,
    isLoading,
    isError,
  } = useQuery<UserProfile, Error>({
    queryKey: ["user", username],
    queryFn: () => getUserByUsername(username!),
    enabled: !!username,
    retry: false,
  });

  if (isLoading) return <Container disableGutters>Loading...</Container>;

  if (isError || !profileData)
    return <Container disableGutters>User not found</Container>;

  return (
    <Container disableGutters>
      {isLoading
        ? "loading.."
        : profileData != null && (
            <>
              <ProfileHeader user={profileData} />
              <ProfilePosts />
            </>
          )}
    </Container>
  );
};

export default Profile;
