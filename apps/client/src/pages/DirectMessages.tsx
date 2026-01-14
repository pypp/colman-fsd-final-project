import type { JSX } from "react";
import {
  Box,
  List,
  ListItemButton,
  ListItemAvatar,
  ListItemText,
  Avatar,
  Typography,
  TextField,
  IconButton,
} from "@mui/material";
import { SendOutlined } from "@mui/icons-material";
import { useState } from "react";

interface Conversation {
  id: number;
  name: string;
  avatar: string;
  lastMessage: string;
  messages: { sender: "me" | "them"; text: string }[];
}

// TODO: this will be in the db
const conversations: Conversation[] = [
  {
    id: 1,
    name: "Alice",
    avatar: "https://i.pravatar.cc/150?img=1",
    lastMessage: "See you soon!",
    messages: [
      { sender: "them", text: "Hey, how are you?" },
      { sender: "me", text: "Good! You?" },
      { sender: "them", text: "See you soon!" },
    ],
  },
  {
    id: 2,
    name: "Bob",
    avatar: "https://i.pravatar.cc/150?img=2",
    lastMessage: "Thanks!",
    messages: [
      { sender: "me", text: "Did you get the file?" },
      { sender: "them", text: "Yes, thanks!" },
    ],
  },
];

const DirectMessages = (): JSX.Element => {
  const [selectedConversation, setSelectedConversation] = useState<Conversation | null>(
    conversations[0],
  );
  const [newMessage, setNewMessage] = useState("");

  const handleSend = () => {
    if (!newMessage.trim() || !selectedConversation) return;

    // Add message to conversation
    selectedConversation.messages.push({ sender: "me", text: newMessage });
    setNewMessage("");
    setSelectedConversation({ ...selectedConversation });
  };

  return (
    <Box
      sx={{
        display: "flex",
        height: "100%",
        backgroundColor: "#fafafa",
        border: "1px solid #dbdbdb",
      }}
    >
      <Box
        sx={{
          width: 300,
          borderRight: "1px solid #dbdbdb",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "#fff",
        }}
      >
        <Typography
          variant="h6"
          sx={{ p: 2, borderBottom: "1px solid #dbdbdb", fontWeight: 600 }}
        >
          Direct Messages
        </Typography>

        <List sx={{ overflowY: "auto", flexGrow: 1 }}>
          {conversations.map((conv) => (
            <ListItemButton
              key={conv.id}
              selected={selectedConversation?.id === conv.id}
              onClick={() => setSelectedConversation(conv)}
              sx={{
                "&.Mui-selected": {
                  backgroundColor: "#f0f0f0",
                },
              }}
            >
              <ListItemAvatar>
                <Avatar src={conv.avatar} />
              </ListItemAvatar>
              <ListItemText
                primary={conv.name}
                secondary={
                  <Typography noWrap variant="body2" color="text.secondary">
                    {conv.lastMessage}
                  </Typography>
                }
              />
            </ListItemButton>
          ))}
        </List>
      </Box>

      <Box
        sx={{
          flexGrow: 1,
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
        }}
      >
        <Box sx={{ flexGrow: 1, p: 2, overflowY: "auto" }}>
          {selectedConversation ? (
            selectedConversation.messages.map((msg, idx) => (
              <Box
                key={idx}
                sx={{
                  display: "flex",
                  justifyContent: msg.sender === "me" ? "flex-end" : "flex-start",
                  mb: 1,
                }}
              >
                <Box
                  sx={{
                    p: 1.5,
                    maxWidth: "70%",
                    borderRadius: 2,
                    backgroundColor: msg.sender === "me" ? "#e0f7fa" : "#fff",
                    border: msg.sender === "them" ? "1px solid #e0e0e0" : "none",
                  }}
                >
                  <Typography variant="body2">{msg.text}</Typography>
                </Box>
              </Box>
            ))
          ) : (
            <Typography variant="body2" color="text.secondary" sx={{ mt: 2 }}>
              Select a conversation
            </Typography>
          )}
        </Box>

        {selectedConversation && (
          <Box
            sx={{
              p: 1,
              display: "flex",
              borderTop: "1px solid #dbdbdb",
              backgroundColor: "#fff",
            }}
          >
            <TextField
              fullWidth
              placeholder="Message..."
              size="small"
              variant="outlined"
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              onKeyDown={(e) => {
                if (e.key === "Enter") handleSend();
              }}
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: 20,
                  backgroundColor: "#f0f0f0",
                },
              }}
            />
            <IconButton onClick={handleSend} color="primary" sx={{ ml: 1 }}>
              <SendOutlined />
            </IconButton>
          </Box>
        )}
      </Box>
    </Box>
  );
};

export default DirectMessages;
