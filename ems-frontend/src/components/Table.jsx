import {
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableContainer,
  Button,
  Heading,
  Center,
  HStack,
  useToast
} from "@chakra-ui/react";
import { useEffect, useState } from "react";
import { Employees, deleteEmployee } from "../service/EmployeeService";
import { useNavigate } from "react-router-dom";

const Tables = () => {
  const [employee, setEmployee] = useState([]);

  const navigator = useNavigate();

  const toast = useToast();

  useEffect(() => {
    getAllEmployees();
  }, []);

  function getAllEmployees() {
    Employees()
      .then((response) => {
        setEmployee(response.data);
      })
      .catch(error => {
        console.error(error);
      });
  }

  function updateEmployee(id) {
    navigator(`/edit-employee/${id}`);
  }

  function removeEmployee(id) {
    console.log(id);
    deleteEmployee(id)
      .then((response) => {
        console.log(response);
        getAllEmployees();
        toast({
          title: "Employee Deleted",
          description: `The employee with id: ${id} was successfully deleted.`,
          status: "success",
          duration: 3000, 
          isClosable: true,
        });
      })
      .catch(error => {
        console.error(error);
      })
  }

  return (
    <>
      <Center>
        <Heading as="h3">List of Employees</Heading>
      </Center>
      <TableContainer>
        <Button as="a" href="/add-employee" colorScheme="green" ml={5}>
          Add Employee
        </Button>
        <Table variant="simple" size="lg">
          {/* <TableCaption>Imperial to metric conversion factors</TableCaption> */}
          <Thead>
            <Tr>
              <Th>Employee Id</Th>
              <Th>Employee First Name</Th>
              <Th>Employee Last Name</Th>
              <Th>Employee Email Id</Th>
              <Th>Actions</Th>
            </Tr>
          </Thead>
          <Tbody>
            {employee.map((data) => (
              <Tr key={data.id}>
                <Td>{data.id}</Td>
                <Td>{data.firstName}</Td>
                <Td>{data.lastName}</Td>
                <Td>{data.email}</Td>
                <Td>
                  <HStack spacing={2}>
                    <Button
                      colorScheme="teal"
                      size="md"
                      onClick={() => updateEmployee(data.id)}
                    >
                      Update
                    </Button>
                    <Button
                      colorScheme="red"
                      size="md"
                      onClick={() => removeEmployee(data.id)}
                    >
                      Delete
                    </Button>
                  </HStack>
                </Td>
              </Tr>
            ))}
          </Tbody>
          {/* <Tfoot>
          <Tr>
            <Th>To convert</Th>
            <Th>into</Th>
            <Th isNumeric>multiply by</Th>
          </Tr>
        </Tfoot> */}
        </Table>
      </TableContainer>
    </>
  );
};

export default Tables;
