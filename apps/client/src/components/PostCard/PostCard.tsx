import {
  Card,
  CardContent,
  CardMedia,
  Typography,
  CardActions,
  IconButton,
} from "@mui/material";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import type { Post } from "../../types";

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  return (
    <Card
      sx={{
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      {post.imageUrl && (
        <CardMedia
          component="img"
          height="160"
          image={post.imageUrl}
          alt={post.title}
        />
      )}

      <CardContent sx={{ flexGrow: 1 }}>
        <Typography variant="h6" gutterBottom>
          {post.title}
        </Typography>

        <Typography variant="body2" color="text.secondary">
          {post.body}
        </Typography>
      </CardContent>

      <CardActions>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
      </CardActions>
    </Card>
  );
};
