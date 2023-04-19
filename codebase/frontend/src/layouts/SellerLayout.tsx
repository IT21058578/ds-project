import { Box, Stack } from "@mui/material";
import React from "react";
import { Outlet } from "react-router-dom";
import SellerNavBar from "./SellerLayout/SellerNavBar";

type Props = { children?: React.ReactNode };

const SellerLayout = ({ children }: Props) => {
  return (
    <Stack display="flex" direction="row">
      <SellerNavBar />
      <Box
        flexGrow={1}
        sx={{
          height: "100vh",
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        {children}
        <Outlet />
      </Box>
    </Stack>
  );
};

export default SellerLayout;
