import { NavigateNext } from "@mui/icons-material";
import {
  Box,
  Breadcrumbs,
  Grid,
  Link,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import { NavigateOptions, useNavigate } from "react-router-dom";

type Props = {
  title?: string;
  breadcrumbOptions?: { label: string; to?: string; state?: NavigateOptions }[];

  /** Can freely use `<Grid item />`. As children are inside a grid. */
  children?: React.ReactNode;
};

const AdminPageBox = ({ title, breadcrumbOptions, children }: Props) => {
  const navigate = useNavigate();

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      sx={{ width: "98%", height: "97%", overflow: "hidden" }}
    >
      <Paper elevation={3} sx={{ width: "100%", height: "100%" }}>
        <Box
          sx={{
            width: "100%",
            height: "100%",
          }}
        >
          <Grid
            container
            direction="column"
            justifyContent="start"
            alignItems="stretch"
            position="relative"
            sx={{
              height: "100%",
              padding: "1.5rem",
            }}
          >
            <Grid item>
              <Breadcrumbs
                separator={<NavigateNext fontSize="small" />}
                sx={{ marginBottom: "0.75rem" }}
              >
                {breadcrumbOptions?.map((item, idx) =>
                  !item.to ? (
                    <div key={idx}>{item.label}</div>
                  ) : (
                    <Link
                      key={idx}
                      underline="hover"
                      sx={{ ":hover": { cursor: "pointer" } }}
                      onClick={() => navigate(item.to || "", item.state)}
                    >
                      {item.label}
                    </Link>
                  )
                )}
              </Breadcrumbs>
              <Stack
                direction="row"
                justifyContent="space-between"
                alignItems="center"
                sx={{ marginBottom: "1rem" }}
              >
                <Typography variant="h5" sx={{ fontWeight: "600" }}>
                  {title}
                </Typography>
              </Stack>
            </Grid>
            {children}
          </Grid>
        </Box>
      </Paper>
    </Box>
  );
};

export default AdminPageBox;
