"use client";

import { AppBar, Toolbar, Typography, Button, Box } from "@mui/material";
import Link from "next/link";

export default function Navbar() {
  return (
    <AppBar position="static">
      <Toolbar>
        <Typography variant="h6" sx={{ flexGrow: 1 }}>
          Campus Notifications
        </Typography>
        <Box>
          <Button color="inherit" component={Link} href="/">All</Button>
          <Button color="inherit" component={Link} href="/priority">Priority</Button>
        </Box>
      </Toolbar>
    </AppBar>
  );
}
