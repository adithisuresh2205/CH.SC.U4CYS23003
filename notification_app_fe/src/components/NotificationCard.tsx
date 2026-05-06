"use client";

import { Card, CardContent, Typography, Box, Chip } from "@mui/material";
import { Notification } from "@/utils/priority";

const TYPE_COLOR: Record<string, "success" | "info" | "warning"> = {
  Placement: "success",
  Result: "info",
  Event: "warning",
};

interface Props {
  notification: Notification;
  isNew: boolean;
  onClick: (id: string) => void;
}

export default function NotificationCard({ notification, isNew, onClick }: Props) {
  return (
    <Card
      onClick={() => onClick(notification.ID)}
      sx={{
        mb: 2,
        cursor: "pointer",
        borderLeft: isNew ? "5px solid #1976d2" : "5px solid transparent",
        bgcolor: isNew ? "#fff" : "#f5f5f5",
        transition: "box-shadow 0.2s",
        "&:hover": { boxShadow: 4 },
      }}
    >
      <CardContent>
        <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", mb: 1 }}>
          <Chip label={notification.Type} color={TYPE_COLOR[notification.Type] ?? "default"} size="small" />
          <Typography variant="caption" color="text.secondary">
            {new Date(notification.Timestamp).toLocaleString()}
          </Typography>
        </Box>
        <Typography variant="body1">{notification.Message}</Typography>
      </CardContent>
    </Card>
  );
}
