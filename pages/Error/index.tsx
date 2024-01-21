import { Box, Button, Card, Grid, Typography } from "@mui/material";
import Image from "next/image";
import Link from "next/link";

const ErrorPage = () => {
  return (
    <Card
      sx={{
        p: 2,
        m: 2,
        backgroundColor: "secondary.dark",
        textAlign: "center",
      }}
    >
      <Typography variant="h3">Opps.... Seems like you are lost</Typography>
      <Box
        sx={{
          borderRadius: 200,
          overflow: "hidden",
          height: 500,
          width: 500,
          mx: "auto",
          my: 2,
        }}
      >
        <Image
          src="/imgs/desert.svg"
          title="Page not found"
          alt="The page you are looking for is not here"
          width={0}
          height={0}
          sizes="100vw"
          style={{
            width: "100%",
            height: "auto",
          }}
        />
      </Box>
      <Typography
        variant="body1"
        style={{ fontStyle: "italic", textAlign: "center" }}
      >
        This is not the Droids you are looking for
      </Typography>
      <Link href={"/"}>
        <Button variant="contained">Click here to get back on track</Button>
      </Link>
    </Card>
  );
};

export default ErrorPage;
