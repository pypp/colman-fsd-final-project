import { useState } from "react";
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
import type { Post } from "@repo/types";
import { PostModal } from "./PostModal/PostModal";

interface Props {
  post: Post;
}

export const PostCard = ({ post }: Props) => {
  const [open, setOpen] = useState(false);

  return (
    <>
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
            sx={{ cursor: "pointer" }}
            onClick={() => setOpen(true)}
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

      <PostModal post={post} open={open} onClose={() => setOpen(false)} />
    </>
  );
};
