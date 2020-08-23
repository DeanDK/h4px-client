import React from "react";
import { Box } from "@chakra-ui/core";

interface Props {
  children: React.ReactNode;
  variant?: "small" | "regular";
}

export const Wrapper: React.FC<Props> = ({ children, variant = "regular" }) => {
  return (
    <Box
      maxW={variant === "regular" ? "800px" : "400px"}
      mx='auto'
      w='100%'
      mt={8}>
      {children}
    </Box>
  );
};
