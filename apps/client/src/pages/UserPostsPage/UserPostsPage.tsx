import { Grid } from "@mui/material";
import { mockPosts } from "../../mock/data.mock";
import { PostCard } from "../../components/PostCard/PostCard";

export const UserPostsPage = () => {
  return (
      <Grid container maxWidth="md" spacing={1}>
        {mockPosts.map((post) => (
          <Grid size={{ xs: 12, sm: 6, md: 4 }} key={post.id}>
            <PostCard post={post} />
          </Grid>
        ))}
      </Grid>
  );
};
