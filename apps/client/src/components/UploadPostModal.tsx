import { useState, type JSX } from "react";
import { Close, PhotoLibraryOutlined } from "@mui/icons-material";
import {
  Modal,
  Box,
  Typography,
  Button,
  IconButton,
  Avatar,
  TextField,
  Divider,
} from "@mui/material";

const modalStyle = {
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: 900,
  height: 600,
  bgcolor: "background.paper",
  borderRadius: "12px",
  boxShadow: 24,
  display: "flex",
  flexDirection: "column",
};

interface UploadPostModalProps {
  open: boolean;
  onClose: () => void;
}

const UploadPostModal = ({ open, onClose }: UploadPostModalProps): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");

  const reset = (): void => {
    if (previewUrl) {
      URL.revokeObjectURL(previewUrl);
    }
    setFile(null);
    setPreviewUrl(null);
    setCaption("");
  };

  const _handleClose = (): void => {
    reset();
    onClose();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>) => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const handleShare = () => {
    console.log("Uploading file:", file, "with caption:", caption);
    // TODO: after loading completes,
    _handleClose();
  };

  return (
    <Modal open={open} onClose={_handleClose}>
      <Box sx={modalStyle}>
        <Box
          sx={{
            height: 48,
            borderBottom: "1px solid",
            borderColor: "divider",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
            position: "relative",
          }}
        >
          <Typography fontWeight={600}>Create new post</Typography>

          <IconButton onClick={_handleClose} sx={{ position: "absolute", right: 8 }}>
            <Close />
          </IconButton>
        </Box>

        <Box sx={{ flex: 1, display: "flex" }}>
          <Box
            sx={{
              flex: 1,
              bgcolor: "black",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              cursor: "pointer",
            }}
            component="label"
          >
            {previewUrl ? (
              <img
                src={previewUrl}
                alt="preview"
                style={{
                  maxWidth: "100%",
                  maxHeight: "100%",
                  objectFit: "contain",
                }}
              />
            ) : (
              <Box
                sx={{
                  color: "white",
                  textAlign: "center",
                  display: "flex",
                  flexDirection: "column",
                  gap: 1,
                }}
              >
                <PhotoLibraryOutlined sx={{ fontSize: 64 }} />
                <Button
                  variant="contained"
                  component="label"
                  sx={{
                    mt: 2,
                    textTransform: "none",
                    borderRadius: "8px",
                    fontWeight: 600,
                  }}
                >
                  Select from computer
                  <input
                    hidden
                    type="file"
                    accept="image/*"
                    onChange={handleFileSelect}
                  />
                </Button>
              </Box>
            )}
          </Box>

          {file && (
            <Box
              sx={{
                width: 340,
                display: "flex",
                flexDirection: "column",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", p: 2, gap: 1 }}>
                <Avatar sx={{ width: 28, height: 28 }} />
                <Typography fontWeight={600}>username</Typography>
              </Box>

              <Divider />

              <Box sx={{ flex: 1, p: 2 }}>
                <TextField
                  placeholder="Write a caption..."
                  multiline
                  rows={6}
                  fullWidth
                  variant="standard"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  InputProps={{ disableUnderline: true }}
                />

                <Typography
                  variant="caption"
                  color="text.secondary"
                  sx={{ display: "block", textAlign: "right", mt: 1 }}
                >
                  {caption.length}/2,200
                </Typography>
              </Box>

              <Divider />

              <Box sx={{ p: 2 }}>
                <Button
                  fullWidth
                  variant="contained"
                  disabled={!file}
                  onClick={handleShare}
                  sx={{
                    textTransform: "none",
                    borderRadius: "8px",
                    fontWeight: 600,
                  }}
                >
                  Share
                </Button>
              </Box>
            </Box>
          )}
        </Box>
      </Box>
    </Modal>
  );
};

export default UploadPostModal;
