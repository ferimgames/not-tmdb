import { Box, Typography } from "@mui/material";

interface Props {
  title: string;
}
const DescriptionPage: React.FC<Props> = ({title}) => {
  return <Box>

    <Typography>{title}</Typography>
  </Box>;
};

export default DescriptionPage;
