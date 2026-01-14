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
  Slider,
} from "@mui/material";
import Cropper, { type Area } from "react-easy-crop";

interface UploadPostModalProps {
  open: boolean;
  onClose: () => void;
}

const getCroppedImg = (imageSrc: string, pixelCrop: Area): Promise<Blob> => {
  return new Promise((resolve, reject) => {
    const image = new Image();
    image.src = imageSrc;
    image.crossOrigin = "anonymous";
    image.onload = () => {
      const canvas = document.createElement("canvas");
      canvas.width = pixelCrop.width;
      canvas.height = pixelCrop.height;
      const ctx = canvas.getContext("2d");
      if (!ctx) return reject(new Error("Canvas context not found"));

      ctx.drawImage(
        image,
        pixelCrop.x,
        pixelCrop.y,
        pixelCrop.width,
        pixelCrop.height,
        0,
        0,
        pixelCrop.width,
        pixelCrop.height,
      );

      canvas.toBlob((blob) => {
        if (blob) resolve(blob);
        else reject(new Error("Failed to create cropped image"));
      }, "image/jpeg");
    };
    image.onerror = (err) => reject(err);
  });
};

const modalStyle = {
  position: "absolute" as const,
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
  overflow: "hidden",
  outline: "none",
  "&:focus": {
    outline: "none",
  },
  "&:focus-visible": {
    outline: "none",
  },
};

const UploadPostModal = ({ open, onClose }: UploadPostModalProps): JSX.Element => {
  const [file, setFile] = useState<File | null>(null);
  const [previewUrl, setPreviewUrl] = useState<string | null>(null);
  const [caption, setCaption] = useState("");

  const [crop, setCrop] = useState<{ x: number; y: number }>({ x: 0, y: 0 });
  const [zoom, setZoom] = useState<number>(1);
  const [croppedAreaPixels, setCroppedAreaPixels] = useState<Area | null>(null);

  const reset = (): void => {
    if (previewUrl) URL.revokeObjectURL(previewUrl);
    setFile(null);
    setPreviewUrl(null);
    setCaption("");
    setCrop({ x: 0, y: 0 });
    setZoom(1);
    setCroppedAreaPixels(null);
  };

  const _handleClose = (): void => {
    reset();
    onClose();
  };

  const handleFileSelect = (e: React.ChangeEvent<HTMLInputElement>): void => {
    const selected = e.target.files?.[0];
    if (!selected) return;

    setFile(selected);
    setPreviewUrl(URL.createObjectURL(selected));
  };

  const onCropComplete = (_croppedArea: Area, croppedPixels: Area): void => {
    setCroppedAreaPixels(croppedPixels);
  };

  const handleShare = async (): Promise<void> => {
    if (!file || !croppedAreaPixels || !previewUrl) return;

    try {
      const croppedBlob = await getCroppedImg(previewUrl, croppedAreaPixels);
      const croppedFile = new File([croppedBlob], file.name, { type: file.type });

      console.log("Uploading cropped file:", croppedFile, "with caption:", caption);

      _handleClose();
    } catch (err) {
      console.error("Failed to crop image:", err);
    }
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

        <Box sx={{ flex: 1, display: "flex", overflow: "hidden" }}>
          <Box
            sx={{
              flex: 1,
              bgcolor: "#000",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              position: "relative",
              height: "100%",
            }}
            component="label"
          >
            {previewUrl ? (
              <Box sx={{ width: "100%", height: "100%", position: "relative" }}>
                <Cropper
                  image={previewUrl}
                  crop={crop}
                  zoom={zoom}
                  aspect={4 / 5}
                  onCropChange={setCrop}
                  onZoomChange={setZoom}
                  onCropComplete={onCropComplete}
                  cropShape="rect"
                  showGrid={false}
                />

                <Box sx={{ position: "absolute", bottom: 16, left: 16, right: 16 }}>
                  <Slider
                    value={zoom}
                    min={1}
                    max={3}
                    step={0.01}
                    onChange={(_, value) => setZoom(value as number)}
                  />
                </Box>
              </Box>
            ) : (
              <Box
                sx={{
                  color: "black",
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
                height: "100%",
              }}
            >
              <Box sx={{ display: "flex", alignItems: "center", p: 2, gap: 1 }}>
                <Avatar sx={{ width: 28, height: 28 }} />
                <Typography fontWeight={600}>username</Typography>
              </Box>

              <Divider />

              <Box sx={{ flex: 1, p: 2, overflowY: "auto" }}>
                <TextField
                  placeholder="Write a caption..."
                  multiline
                  rows={6}
                  fullWidth
                  variant="standard"
                  value={caption}
                  onChange={(e) => setCaption(e.target.value)}
                  slotProps={{
                    htmlInput: { maxLength: 2200 },
                    input: { disableUnderline: true },
                  }}
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
                  sx={{ textTransform: "none", borderRadius: "8px", fontWeight: 600 }}
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
