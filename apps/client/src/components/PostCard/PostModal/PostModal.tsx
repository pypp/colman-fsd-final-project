import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Typography,
  IconButton,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import ChatBubbleOutlineIcon from "@mui/icons-material/ChatBubbleOutline";
import type { Post } from "../../../types";

interface Props {
  post: Post;
  open: boolean;
  onClose: () => void;
}

export const PostModal = ({ post, open, onClose }: Props) => {
  return (
    <Dialog open={open} onClose={onClose} maxWidth="xs" fullWidth>
      <DialogTitle
        sx={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}
      >
        {post.title}
        <IconButton onClick={onClose}>
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent dividers>
        {post.imageUrl && (
          <img
            src={post.imageUrl}
            alt={post.title}
            style={{ width: "100%", borderRadius: 8, marginBottom: 16 }}
          />
        )}

        <Typography variant="body1">{post.body}</Typography>
        <Typography variant="caption" color="text.secondary" mt={2}>
          {post.createdAt}
        </Typography>
      </DialogContent>

      <DialogActions>
        <IconButton>
          <FavoriteBorderIcon />
        </IconButton>
        <IconButton>
          <ChatBubbleOutlineIcon />
        </IconButton>
      </DialogActions>
    </Dialog>
  );
};
