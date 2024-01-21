import { Box, Card, Link, Typography, Grid, Skeleton } from "@mui/material";
import NextLink from "next/link";
import React, { useState } from "react";
import { motion } from "framer-motion";
import CircularRating from "./UI/CircularRating";
import Image from "next/image";

interface Props {
  img: string;
  title: string;
  rating: number;
  url: string;
}
const MediaCard: React.FC<Props> = ({ img, title, rating, url }) => {
  const [imgIsLoading, setImageIsLoading] = useState(true);
  return (
    <Link
      component={NextLink}
      href={url}
      sx={{ textDecoration: "none" }}
      data-testid={`test_${title}`}
    >
      <Box
        sx={{
          width: "100%",
          height: "auto",
        }}
      >
        <Card
          component={motion.div}
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          viewport={{ once: true }}
          whileHover={{ scale: 1.1 }}
          whileTap={{ scale: 0.9 }}
        >
          <Box
            sx={{
              width: "100%",
              height: "100%",
              overflow: "hidden",
            }}
          >
            {imgIsLoading && (
              <Skeleton
                variant="rectangular"
                sx={{
                  height: { md: 369, xs: 274 },
                  width: { md: 259, xs: 182 },
                }}
              />
            )}
            <Image
              src={img}
              title={title}
              alt={`Poster for ${title}`}
              width={0}
              height={0}
              sizes="100vw"
              style={{
                width: imgIsLoading ? "1px" : "100%",
                height: imgIsLoading ? "1px" : "auto",
                display: imgIsLoading ? "hidden" : "block",
              }}
              onLoad={() => {
                setImageIsLoading(false);
              }}
            />
          </Box>
          <Grid
            container
            spacing={1}
            sx={{ background: "black", px: 2, py: 1, alignItems: "center" }}
          >
            <Grid item xs={3}>
              <CircularRating
                value={rating * 10}
                sx={{ color: "primary.main" }}
              />
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
