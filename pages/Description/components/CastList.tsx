import Image from "next/image";
import { Box, Card, List, ListItem, Typography } from "@mui/material";
interface Props {
  title?: string;
  maxAmount?: number;
  cast: {
    id: number;
    name: string;
    character: string;
    profile_path: string;
  }[];
}

const CastList: React.FC<Props> = ({ title, cast, maxAmount = 10 }) => {
  const sliceCast = cast.slice(0, maxAmount);
  return (
    <Box sx={{ width: "100%", overflow: "auto" }}>
      <List
        sx={{
          display: "inline-flex",
          alignItems: "flex-start",
        }}
      >
        {sliceCast.map((person) => (
          <ListItem key={`person_${person.id}`}>
            <Card sx={{ width: 140, backgroundColor: "#b3b3b3" }}>
              <Box
                sx={{
                  height: 210,
                  backgroundImage: "url('/imgs/no-profile-picture-icon.svg')",
                  backgroundPosition: "center",
                  backgroundRepeat: "no-repeat",
                }}
              >
                {person.profile_path && (
                  <Image
                    src={`https://image.tmdb.org/t/p/original/${person.profile_path}`}
                    title={person.name}
                    alt={person.character}
                    width={140}
                    height={210}
                    style={{ width: "100%", height: "auto" }}
                  />
                )}
              </Box>
              <Card sx={{ color: "text.secondary", p: 0.5 }}>
                <Typography variant="body1" sx={{ fontWeight: "700" }}>
                  {person.name}
                </Typography>
                <Typography variant="body2">{person.character}</Typography>
              </Card>
            </Card>
          </ListItem>
        ))}
      </List>
    </Box>
  );
};

export default CastList;
