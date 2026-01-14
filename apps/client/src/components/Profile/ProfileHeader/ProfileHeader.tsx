import { Avatar, Box, Button, Typography } from "@mui/material";
import type { UserProfile } from "@repo/types";

interface Props {
  user: UserProfile;
}

export const ProfileHeader = ({ user }: Props) => (
  <Box mb={5} mt={10}>
    <Box display="flex" alignItems="center" mt={-6} px={3}>
      <Avatar
        src={user.avatarUrl}
        sx={{
          width: 120,
          height: 120,
          border: "4px solid white",
        }}
      />

      <Box ml={3} flexGrow={1}>
        <Typography variant="h5">{user.name}</Typography>
        <Typography color="text.secondary">@{user.username}</Typography>

        {user.bio && <Typography mt={1}>{user.bio}</Typography>}
      </Box>

      {/* TODO:: check if user is not the current logged-in user */}
      <Button variant="contained">Follow</Button>
    </Box>
  </Box>
);
