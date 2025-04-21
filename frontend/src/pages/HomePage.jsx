import {
  Container,
  SimpleGrid,
  Text,
  VStack,
  Avatar,
  Menu,
  MenuButton,
  MenuList,
  MenuItem,
  HStack,
  Box,
  Divider,
} from '@chakra-ui/react';
import React, { useEffect } from 'react';
import { useProductStore } from '../store/product';
import ProductCard from '../components/ProductCard';
import { useNavigate } from 'react-router-dom';

const HomePage = () => {
  const { fetchProducts, products } = useProductStore();
  const navigate = useNavigate();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  const user = JSON.parse(localStorage.getItem("user")) || {};
  
  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    navigate("/auth");
  };

  return (
    <Container maxW="container.xl" py={12}>
      <HStack justify="space-between" align="center" mb={8}>
        <Text
          fontSize={{ base: "2xl", md: "3xl" }}
          fontWeight="extrabold"
          bgGradient="linear(to-r, #7928CA, #FF0080)"
          bgClip="text"
        >
          Current Products
        </Text>

        <Menu>
          <MenuButton>
            <Avatar name={user.name || "User"} size="md" />
          </MenuButton>
          <MenuList>
            <Box px={4} py={3}>
              <Text fontWeight="bold">{user.name || "Guest"}</Text>
              <Text fontSize="sm" color="gray.500">
                {user.email || "No email"}
              </Text>
            </Box>
            <Divider />
            <MenuItem onClick={handleLogout} color="red.500" fontWeight="medium">
              Logout
            </MenuItem>
          </MenuList>
        </Menu>
      </HStack>

      <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10}>
        {products.map((product) => (
          <ProductCard key={product._id} product={product} />
        ))}
      </SimpleGrid>
    </Container>
  );
};

export default HomePage;

// import {
//   Container,
//   SimpleGrid,
//   Text,
//   VStack,
//   Avatar,
//   Menu,
//   MenuButton,
//   MenuList,
//   MenuItem,
//   HStack,
//   Box,
//   Button,
// } from '@chakra-ui/react';
// import React, { useEffect } from 'react';
// import { useProductStore } from '../store/product';
// import ProductCard from '../components/ProductCard';
// import { useNavigate } from 'react-router-dom';

// const HomePage = () => {
//   const { fetchProducts, products } = useProductStore();
//   const navigate = useNavigate();

//   // Fetch products on mount
//   useEffect(() => {
//     fetchProducts();
//   }, [fetchProducts]);

//   // Simulate getting user info from localStorage (you can store full user later)
//   const user = JSON.parse(localStorage.getItem("user")) || {};
//   const handleLogout = () => {
//     localStorage.removeItem("token");
//     localStorage.removeItem("user");
//     navigate("/auth");
//   };

//   return (
//     <Container maxW="container.xl" py={12}>
//       <HStack justify="space-between" w="full" mb={6}>
//         <Text
//           fontSize="2xl"
//           fontWeight="bold"
//           bgGradient="linear(to-r, #7928CA, #FF0080)"
//           bgClip="text"
//         >
//           Current Products
//         </Text>

//         {/* Profile Menu */}
//         <Menu>
//           <MenuButton>
//             <Avatar name={user.name || "User"} />
//           </MenuButton>
//           <MenuList>
//             <Box px={4} py={2}>
//               <Text fontWeight="bold">{user.name || "Guest"}</Text>
//               <Text fontSize="sm">{user.email || "No email"}</Text>
//             </Box>
//             <MenuItem onClick={handleLogout} color="red.500">Logout</MenuItem>
//           </MenuList>
//         </Menu>
//       </HStack>

//       <SimpleGrid columns={{ base: 1, md: 2, lg: 3 }} spacing={10} width="full">
//         {products.map((product) => (
//           <ProductCard key={product._id} product={product} />
//         ))}
//       </SimpleGrid>
//     </Container>
//   );
// };

// export default HomePage;

// // import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
// // import React from 'react'
// // import { useEffect } from 'react'
// // import { useProductStore } from '../store/product'
// // import ProductCard from '../components/ProductCard'

// // const HomePage = () => {
// //   const {fetchProducts, products} = useProductStore()

// //   useEffect(() => {
// //     fetchProducts()
// //   }, [fetchProducts])
// //   // console.log("products", products)

// //   return (
// //     <Container maxW="container.xl" py={12}>
// //       <VStack spacing={8}>
// //         <Text
// //           fontSize="2xl"
// //           fontWeight="bold"
// //           textAlign="center"
// //           style={{
// //             background: "linear-gradient(to right, #7928CA, #FF0080)",
// //             WebkitBackgroundClip: "text",
// //             WebkitTextFillColor: "transparent",
// //           }}
// //           // bgGradient="linear(to-r, #7928CA,#FF0080)"
// //           // bgClip="text"
// //         >
// //           Current Products
// //           </Text>

// //           <SimpleGrid
// //             columns={{ base: 1, md: 2, lg: 3 }}
// //             spacing={10}
// //             width={"full"}
// //             >
// //               {products.map((product) => (
// //                 <ProductCard key={product._id} product={product} />
// //               ))}
// //             </SimpleGrid>
// //         </VStack>
// //       </Container>
// //   )
// // }

// // export default HomePage