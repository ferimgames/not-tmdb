import { MediaSources } from "@/types/MediaSource";
import movieImage from "../../../public/imgs/assortment-cinema-elements-red-background-with-copy-space.jpg";
import { Box, Button, Card, Grid, Typography } from "@mui/material";
import shadows from "@mui/material/styles/shadows";
import Image from "next/image";
import { motion } from "framer-motion";
interface Props {
  onClickSourceHanlder: () => void;
  isLoading: boolean;
  source: MediaSources;
}
const Hero: React.FC<Props> = ({ onClickSourceHanlder, source, isLoading }) => {
  return (
    <Box
      sx={{
        pb: 2,
        pt: 2,
        mt: 2,
        mb: 2,
        borderRadius: 2,
        boxShadow: shadows[10],
        position: "relative",
        overflow: "hidden",
      }}
    >
      <Image
        src={movieImage}
        title="What do you want to see?"
        alt="What do you want to see?"
        style={{ width: "100%", height: "auto", position: "absolute", top: 0 }}
        priority
      />
      <Grid
        container
        sx={{
          position: "relative",
          zIndex: 1,
          p: 2,
          mt: 2,
        }}
      >
        <Grid item md={4} xs={12}>
          <Typography
            variant="h3"
            component={"h1"}
            sx={{ color: "text.primary" }}
          >
            What do you want to see?
          </Typography>
          <Button
            component={motion.button}
            onClick={onClickSourceHanlder}
            variant="contained"
            whileHover={{ scale: 1.1 }}
            whileTap={{ scale: 0.9 }}
            disabled={isLoading}
          >
            {source}
          </Button>
        </Grid>
        <Grid item md={8} xs={12}></Grid>
      </Grid>
    </Box>
  );
};

export default Hero;
