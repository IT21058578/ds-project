import { Done, Loop, StopCircle } from "@mui/icons-material";
import { Box, useTheme } from "@mui/material";

type Props = {
  type: keyof typeof TagTypes;
};

const TagTypes = {
  NOT_STARTED: {
    startIcon: <StopCircle sx={{ height: "1.1rem", width: "1.1rem" }} />,
    color: "#ffca2b",
    label: "Not Started",
  },
  IN_PROGRESS: {
    startIcon: <Loop sx={{ height: "1.1rem", width: "1.1rem" }} />,
    color: "#2b79ff",
    label: "In Progress",
  },
  FINISHED: {
    startIcon: <Done sx={{ height: "1.1rem", width: "1.1rem" }} />,
    color: "#84d044",
    label: "Finished",
  },
} as const;

const Tag = ({ type }: Props) => {
  const { color, label, startIcon } = TagTypes[type];
  const {
    palette: {
      common: { white },
    },
  } = useTheme();
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        gap: "4px",
        color: white,
        backgroundColor: color,
        padding: "4px",
        borderRadius: "4px",
        fontWeight: "600",
        textAlign: "center",
        width: "8rem",
      }}
    >
      {startIcon}
      {label}
    </Box>
  );
};

export default Tag;
