import { Box, Center, Text } from "@chakra-ui/react";
import React from "react";

const Footer = () => {
  return (
    <div>
      <Box as="footer" bg="gray.200" position="relative" bottom="0" width="100%" >
        <Center>
          <Text color="black" fontSize="md" pt={3}>All rights reserved 2024 by akhil</Text>
        </Center>
      </Box>
    </div>
  );
};

export default Footer;
