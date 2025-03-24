import { useState } from "react";
import "./App.css";
import Tables from "./components/Table";
import Header from "./components/Header";
import Footer from "./components/Footer";
import { Box } from "@chakra-ui/react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import EmpComp from "./components/EmpComp";

function App() {
  return (
    <>
      <Box display="flex" flexDirection="column" minHeight="100vh" gap={4}>
        <BrowserRouter>
          <Header />

          <Routes>
            <Route path="/" element= { <Tables /> } />
            <Route path="/employees" element= { <Tables /> } />
            <Route path="/add-employee" element= { <EmpComp /> } />
            <Route path="/edit-employee/:id" element= { <EmpComp /> } />
          </Routes>
          
          <Footer />
        </BrowserRouter>
      </Box>
    </>
  );
}

export default App;
