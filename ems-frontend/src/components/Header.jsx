import React from "react";
import { Center, Heading } from "@chakra-ui/react";

const Header = () => {
  return (
    <div>
        <Center bg="teal" w="100%" p={4} color="white" alignItems='center'>
          <Heading as="h2" size='lg'>
            Employee Management System
          </Heading>
        </Center>
    </div>
  );
};

export default Header;
