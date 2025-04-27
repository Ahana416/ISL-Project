// import React from "react";
// import { useState, useEffect } from "react";
// import { Container, Flex, Text, HStack, Link } from "@chakra-ui/react";
// import {Button} from "@chakra-ui/react";
// // import { useColorMode } from "@chakra-ui/react";
// import { PlusSquareIcon } from "@chakra-ui/icons";
// import { IoMdSunny, IoMdMoon } from 'react-icons/io';
// import { useNavigate } from "react-router-dom";
// const Navbar = () => {
//   // const [colorMode, setColorMode] = useState("light");

//   // // Step 1: Define a function to toggle the color mode
//   // const toggleColorMode = () => {
//   //   const newColorMode = colorMode === "light" ? "dark" : "light";
//   //   setColorMode(newColorMode);
//   // };

//   // Step 1: Retrieve theme from localStorage or set default to "light"
//   const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

//   // Step 2: Apply theme changes when the theme state updates
//   useEffect(() => {
//     document.body.style.backgroundColor = theme === "light" ? "#FFFFFF" : "#121212";
//     document.body.style.color = theme === "light" ? "#000000" : "#E0E0E0";
//     localStorage.setItem("theme", theme);
//   }, [theme]);

//   // Step 3: Function to toggle theme
//   const toggleTheme = () => {
//     setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
//   };

//   const user = JSON.parse(localStorage.getItem("user")) || {};

//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/auth");
//   };
      
//   return (
//     <Container maxW="1140px" px={4}>
//       <Flex h={16} alignItems="center" justifyContent="space-between">
//       <Text
//         fontSize="3xl"
//         fontWeight="medium"
//         fontFamily="Georgia, serif"
//         textAlign="center"
//         color={theme === "light" ? "#2D3748" : "#E2E8F0"}
//         textTransform="none"
//         letterSpacing="wide"
//         textShadow={theme === "light" ? "1px 1px 2px #CBD5E0" : "1px 1px 2px #1A202C"}
//       >
//         TradeLoop
//     </Text>


//         {/* <Link href="/" color={theme === "light" ? "black" : "#E0E0E0"}>Product Store</Link> */}
//         <Link
//           href="/"
//           fontSize="lg"
//           fontWeight="normal"
//           fontFamily="Inter, sans-serif"
//           textAlign="center"
//           color={theme === "light" ? "#4A5568" : "#CBD5E0"}
//           letterSpacing="normal"
//           textTransform="capitalize"
//           _hover={{
//             color: theme === "light" ? "#2B6CB0" : "#63B3ED",
//             textDecoration: "none",
//             transform: "translateY(-1px)",
//             transition: "all 0.2s ease-in-out"
//           }}
//         >
//           Product Store
//         </Link>


//         <HStack spacing={2} alignItems="center">
//           <Link href="/create">
//             <PlusSquareIcon w={6} h={6} color={theme === "light" ? "grey" : "#BB86FC"} />
//           </Link>

//           <Button 
//             onClick={toggleTheme} 
//             bg={theme === "light" ? "gray.200" : "#1A1A1A"} 
//             color={theme === "light" ? "black" : "#E0E0E0"}
//             _hover={{ bg: theme === "light" ? "gray.300" : "#2A2A2A" }}
//           >
//             {theme === "light" ? <IoMdMoon /> : <IoMdSunny />}
//           </Button>

          
//         </HStack>
//       </Flex>
//     </Container>
      
//   )
// }

// export default Navbar

import React, { useState, useEffect } from "react";
import { Container, Flex, Text, HStack, Link, Button, Avatar, Menu, MenuButton, MenuList, MenuItem, Box, Divider } from "@chakra-ui/react";
import { PlusSquareIcon } from "@chakra-ui/icons";
import { IoMdSunny, IoMdMoon } from 'react-icons/io';
import { useNavigate } from "react-router-dom";

const Navbar = () => {
  const navigate = useNavigate();

  const [theme, setTheme] = useState(localStorage.getItem("theme") || "light");

  useEffect(() => {
    document.body.style.backgroundColor = theme === "light" ? "#FFFFFF" : "#121212";
    document.body.style.color = theme === "light" ? "#000000" : "#E0E0E0";
    localStorage.setItem("theme", theme);
  }, [theme]);

  const toggleTheme = () => {
    setTheme((prevTheme) => (prevTheme === "light" ? "dark" : "light"));
  };

  const user = JSON.parse(localStorage.getItem("user")) || {};

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <Container maxW="1140px" px={4}>
  <Flex h={16} alignItems="center" justifyContent="space-between">
    <Text
      fontSize="3xl"
      fontWeight="medium"
      fontFamily="Georgia, serif"
      color={theme === "light" ? "#2D3748" : "#E2E8F0"}
      textTransform="none"
      letterSpacing="wide"
      textShadow={theme === "light" ? "1px 1px 2px #CBD5E0" : "1px 1px 2px #1A202C"}
    >
      TradeLoop
    </Text>

    <HStack spacing={4} alignItems="center">
  {/* Create Button */}
  <Box
    as="a"
    href="/create"
    p={2}
    rounded="full"
    border="1px solid"
    borderColor={theme === "light" ? "gray.300" : "gray.600"}
    _hover={{ borderColor: theme === "light" ? "gray.500" : "gray.400", transform: "scale(1.05)" }}
    transition="all 0.2s"
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    <PlusSquareIcon w={5} h={5} color={theme === "light" ? "gray.700" : "whiteAlpha.900"} />
  </Box>

  {/* Theme Toggle Button */}
  <Box
    as="button"
    p={2}
    rounded="full"
    border="1px solid"
    borderColor={theme === "light" ? "gray.300" : "gray.600"}
    _hover={{ borderColor: theme === "light" ? "gray.500" : "gray.400", transform: "scale(1.05)" }}
    transition="all 0.2s"
    onClick={toggleTheme}
    display="flex"
    alignItems="center"
    justifyContent="center"
  >
    {theme === "light" ? <IoMdMoon size={20} /> : <IoMdSunny size={20} />}
  </Box>

  {/* User Avatar */}
  <Menu>
    <MenuButton
      as={Box}
      p={1}
      rounded="full"
      border="1px solid"
      borderColor={theme === "light" ? "gray.300" : "gray.600"}
      _hover={{ borderColor: theme === "light" ? "gray.500" : "gray.400", transform: "scale(1.05)" }}
      transition="all 0.2s"
    >
      <Avatar name={user.name || "User"} size="sm" />
    </MenuButton>
    <MenuList>
      <Box px={4} py={3}>
        <Text fontWeight="bold">{user.name || "Guest"}</Text>
        <Text fontSize="sm" color="gray.500">{user.email || "No email"}</Text>
      </Box>
      <Divider />
      <MenuItem onClick={handleLogout} color="red.500" fontWeight="medium">
        Logout
      </MenuItem>
    </MenuList>
  </Menu>
</HStack>



  </Flex>

  {/* Horizontal Line under navbar */}
  <Divider mt={2} borderColor={theme === "light" ? "gray.300" : "gray.700"} />

</Container>

  );
};

export default Navbar;
