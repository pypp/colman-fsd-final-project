import { Grid } from "@mui/material";
import { mockPosts } from "../../../mock/data.mock";
import { PostCard } from "../../PostCard/PostCard";

export const ProfilePosts = () => {
  return (
    <Grid sx={{display: "grid", gridTemplateColumns: { xs: "1fr", sm: "1fr 1fr", md: "1fr 1fr 1fr" }, gap: 1}}>
      {mockPosts.map((post) => (
        <PostCard key={post.id} post={post} />
      ))}
    </Grid>
  );
};
