import { MediaElement } from "@/types/MediaElement";
import {
  Box,
  Card,
  Link,
  Typography,
  Rating,
  CircularProgress,
  Grid,
} from "@mui/material";

import NextLink from "next/link";
import React from "react";
import { motion } from "framer-motion";
import CircularWithValueLabel from "./UI/CircularProgress";
import { red } from "@mui/material/colors";
interface Props {
  img: string;
  title: string;
  rating: number;
  url: string;
}

const MediaCard: React.FC<Props> = ({ img, title, rating, url }) => {
  return (
    <Link component={NextLink} href={url} sx={{ textDecoration: "none" }}>
      <Box
        sx={{ width: 300 }}
        component={motion.div}
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        viewport={{ once: true }}
      >
        <Card
          component={motion.div}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Card
            sx={{
              backgroundImage: `url(${img})`,
              backgroundSize: "contain",
              height: 450,
              display: "flex",
              flexDirection: "column-reverse",
              alignItems: "flex-end",
            }}
          ></Card>
          <Grid
            container
            spacing={1}
            sx={{ background: "black", px: 2, py: 1, alignItems: "center" }}
          >
            <Grid item xs={3}>
              <CircularWithValueLabel value={rating * 10} sx={{color:red[700]}} />
            </Grid>
            <Grid item xs={9}>
              <Typography variant="body1" color={"white"}>
                {title}
              </Typography>
            </Grid>
          </Grid>
        </Card>
      </Box>
    </Link>
  );
};

export default MediaCard;
