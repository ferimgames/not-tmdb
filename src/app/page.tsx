import * as React from "react";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import Button from "@mui/material/Button";

export const metadata = {
  title: "Movies for me",
  description: "Super description",
};

export default function HomePage() {
  return (
    <Box sx={{ display: "flex" }}>
      <Typography> Home</Typography>

      <Button variant="contained" LinkComponent={Link} href="/movie/asfd">
        Go to movie
      </Button>
    </Box>
  );
}
