"use client";

import { useNotifications } from "@/hooks/useNotifications";
import NotificationCard from "@/components/NotificationCard";
import { Container, Typography, Box, CircularProgress, Alert } from "@mui/material";

export default function AllNotifications() {
  const { notifications, viewedIds, loading, markAsViewed } = useNotifications();

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" gutterBottom>All Notifications</Typography>

      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", mt: 4 }}>
          <CircularProgress />
        </Box>
      ) : notifications.length === 0 ? (
        <Alert severity="info">No notifications found.</Alert>
      ) : (
        notifications.map((n) => (
          <NotificationCard
            key={n.ID}
            notification={n}
            isNew={!viewedIds.has(n.ID)}
            onClick={markAsViewed}
          />
        ))
      )}
    </Container>
  );
}
