import React, { useEffect, useState } from "react";
import {
  FormControl,
  FormLabel,
  Input,
  Box,
  Center,
  Button,
  Spacer,
  Heading,
  Alert,
  AlertIcon,
  useToast,
} from "@chakra-ui/react";
import {
  createEmployee,
  getEmployee,
  updateEmployee,
} from "../service/EmployeeService";
import { useNavigate, useParams } from "react-router-dom";

const EmpComp = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");

  const {id} = useParams();

  const toast = useToast();

  const [errors, setErrors] = useState({
    firstName: "",
    lastName: "",
    email: "",
  });

  const navi = useNavigate();

  useEffect(() => {
    if (id) {
      getEmployee(id)
        .then((response) => {
          setFirstName(response.data.firstName);
          setLastName(response.data.lastName);
          setEmail(response.data.email);
        })
        .catch((error) => {
          console.error(error);
        });
    }
  }, [id]);

  function saveOrUpdateEmployee(e) {
    e.preventDefault();

    if (validateForm()) {
      const employee = { firstName, lastName, email };
      console.log(employee);

      if (id) {
        updateEmployee(id, employee)
          .then((response) => {
            console.log(response.data);
            toast({
              title: "Employee Updated",
              description: `The employee with id: ${id} was successfully updated.`,
              status: "success",
              duration: 5000, 
              isClosable: true,
            });
            navi("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      } else {
        createEmployee(employee)
          .then((response) => {
            console.log(response.data);
            toast({
              title: "Employee Created",
              description: `New employee successfully created.`,
              status: "success",
              duration: 5000, 
              isClosable: true,
            });
            navi("/employees");
          })
          .catch((error) => {
            console.error(error);
          });
      }
    }

    setFirstName("");
    setLastName("");
    setEmail("");
  }

  function validateForm() {
    let valid = true;

    const errCopy = { ...errors };

    if (firstName.trim()) {
      errCopy.firstName = "";
    } else {
      errCopy.firstName = "First name is required";
      valid = false;
    }
    // if(lastName.trim()){
    //   errCopy.lastName = '';
    // }
    // else {
    //   errCopy.lastName = 'last name is required';
    //   valid = false;
    // }
    if (email.trim()) {
      errCopy.email = "";
    } else {
      errCopy.email = "email is required";
      valid = false;
    }

    setErrors(errCopy);

    return valid;
  }

  function pageTitle() {
    if (id) {
      return (
        <Heading as="h2" mb={8}>
          Update Employee
        </Heading>
      );
    } else {
      return (
        <Heading as="h2" mb={8}>
          Add Employee
        </Heading>
      );
    }
  }

  return (
    <>
      <Center>
        <Box maxW="lg" mt={20}>
          {pageTitle()}
          <FormControl isRequired>
            <FormLabel>First name</FormLabel>
            <Input
              placeholder="First name"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value.trim())}
            />
            {errors.firstName && (
              <Alert status="error">
                <AlertIcon />
                {errors.firstName}
              </Alert>
            )}
          </FormControl>
          <Spacer />
          <FormControl>
            <FormLabel>Last name</FormLabel>
            <Input
              placeholder="Last name"
              value={lastName}
              onChange={(e) => setLastName(e.target.value.trim())}
            />
          </FormControl>
          <Spacer />
          <FormControl isRequired>
            <FormLabel>Email address</FormLabel>
            <Input
              placeholder="email"
              value={email}
              onChange={(e) => setEmail(e.target.value.trim())}
            />
            {errors.email && (
              <Alert status="error">
                <AlertIcon />
                {errors.email}
              </Alert>
            )}
          </FormControl>
          <Spacer />
          <Button
            type="submit"
            onClick={saveOrUpdateEmployee}
            colorScheme="green"
            mt={5}
          >
            Submit
          </Button>
        </Box>
      </Center>
    </>
  );
};

export default EmpComp;
