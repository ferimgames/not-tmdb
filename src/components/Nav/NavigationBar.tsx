import * as React from "react";
import Toolbar from "@mui/material/Toolbar";
import Typography from "@mui/material/Typography";
import MovieIcon from "@mui/icons-material/Movie";
import Link from "next/link";
import AppBar from "@mui/material/AppBar";
export default function NavigationBar() {
  return (
    <AppBar position="fixed" sx={{ zIndex: 2000 }}>
      <Toolbar sx={{ backgroundColor: "secondary.dark" }}>
        <Link href={"/"}>
          <MovieIcon
            sx={{ color: "background.paper", mr: 2, transform: "translateY(-2px)" }}
          />
        </Link>
      </Toolbar>
    </AppBar>
  );
}
