import React from "react";
import { useState, useEffect } from "react";
import { Container, Flex, Text, HStack, Link } from "@chakra-ui/react";
import {Button} from "@chakra-ui/react";
// import { useColorMode } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMdSunny, IoMdMoon } from 'react-icons/io';

const Navbar = () => {
  // const [colorMode, setColorMode] = useState("light");

  // // Step 1: Define a function to toggle the color mode
  // const toggleColorMode = () => {
  //   const newColorMode = colorMode === "light" ? "dark" : "light";
  //   setColorMode(newColorMode);
  // };

  // Step 1: Retrieve theme from localStorage or set default to "light"
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  // Step 2: Apply theme changes when the theme state updates
  useEffect(() => {
    document.body.style.backgroundColor = theme === "light" ? "#FFFFFF" : "#121212";
    document.body.style.color = theme === "light" ? "#000000" : "#E0E0E0";
    localStorage.setItem("theme", theme);
  }, [theme]);

  // Step 3: Function to toggle theme
  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };
      
  return (
    <Container maxW="1140px" px={4}>
      <Flex h={16} alignItems="center" justifyContent="space-between">
        <Text
          fontSize="xl"
          fontWeight="bold"
          textTransform="uppercase"
          textAlign="center"
          bgGradient={theme === "light" ? "linear(to-l, #7928CA, #FF0080)" : "linear(to-l, #BB86FC, #3700B3)"}
          bgClip="text"
        >
          My App
        </Text>

        <Link href="/" color={theme === "light" ? "black" : "#E0E0E0"}>Product Store</Link>

        <HStack spacing={2} alignItems="center">
          <Link href="/create">
            <PlusSquareIcon w={6} h={6} color={theme === "light" ? "grey" : "#BB86FC"} />
          </Link>

          <Button 
            onClick={toggleTheme} 
            bg={theme === "light" ? "gray.200" : "#1A1A1A"} 
            color={theme === "light" ? "black" : "#E0E0E0"}
            _hover={{ bg: theme === "light" ? "gray.300" : "#2A2A2A" }}
          >
            {theme === "light" ? <IoMdMoon /> : <IoMdSunny />}
          </Button>
        </HStack>
      </Flex>
    </Container>
      
  )
}

export default Navbar
