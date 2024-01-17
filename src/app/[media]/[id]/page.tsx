import * as React from "react";
import Container from "@mui/material/Container";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";
import DescriptionPage from "pages/Description";

export const metadata = {
  title: "Description page",
  description: "Amazing description",
};

export default function Page() {
  return <DescriptionPage title="Test" />;
}
