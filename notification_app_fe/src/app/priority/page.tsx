"use client";

import { useState } from "react";
import { useNotifications } from "@/hooks/useNotifications";
import { getTopPriority } from "@/utils/priority";
import NotificationCard from "@/components/NotificationCard";
import {
  Container, Typography, Box, CircularProgress, Alert,
  FormControl, InputLabel, Select, MenuItem, TextField,
} from "@mui/material";

export default function PriorityInbox() {
  const { notifications, viewedIds, loading, markAsViewed } = useNotifications();
  const [limit, setLimit] = useState(10);
  const [typeFilter, setTypeFilter] = useState("All");

  const filtered = typeFilter === "All"
    ? notifications
    : notifications.filter((n) => n.Type === typeFilter);

  const priority = getTopPriority(filtered, viewedIds, limit);

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>Priority Inbox</Typography>

      <Box sx={{ display: "flex", gap: 2, mb: 3, alignItems: "center" }}>
        <FormControl sx={{ minWidth: 140 }}>
          <InputLabel>Type</InputLabel>
          <Select
            value={typeFilter}
            label="Type"
            onChange={(e) => setTypeFilter(e.target.value as string)}
          >
            <MenuItem value="All">All</MenuItem>
            <MenuItem value="Placement">Placement</MenuItem>
            <MenuItem value="Result">Result</MenuItem>
            <MenuItem value="Event">Event</MenuItem>
          </Select>
        </FormControl>
        <TextField
          label="Top N"
          type="number"
          value={limit}
          onChange={(e) => setLimit(Math.max(1, parseInt(e.target.value) || 10))}
          sx={{ width: 100 }}
        />
      </Box>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : priority.length === 0 ? (
        <Alert severity="info">No unread priority notifications.</Alert>
      ) : (
        priority.map((n) => (
          <NotificationCard
            key={n.ID}
            notification={n}
            isNew={true}
            onClick={markAsViewed}
          />
        ))
      )}
    </Container>
  );
}
