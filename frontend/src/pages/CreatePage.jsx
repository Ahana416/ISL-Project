import { Box, Button, Container, VStack, Input, Heading } from '@chakra-ui/react';
import React from 'react';
import { useProductStore } from '../store/product';
import { toast } from "sonner";
import { useNavigate } from 'react-router-dom';

const CreatePage = () => {
  const [newProduct, setNewProduct] = React.useState({
    name: "",
    price: "",
    image: "",
  });

  const navigate = useNavigate();
  const { createProduct } = useProductStore();

  const handleAddProduct = async () => {
    if (!newProduct.name || !newProduct.price || !newProduct.image) {
      toast.error("Error", { description: "All fields are required!" });
      return;
    }
    const { success, message } = await createProduct(newProduct);
    if (success) {
      toast.success("Product Added", {
        description: "Product added successfully!",
        duration: 3000,
        dismissible: true,
      });
      setTimeout(() => {
        navigate("/");
      }, 1000);
    } else {
      toast.error("Failed to Add Product", {
        description: message || "Something went wrong!",
        duration: 5000,
        dismissible: true,
      });
    }
  };

  return (
    <Container
      maxW="container.md"
      minH="100vh"
      display="flex"
      alignItems="flex-start"
      justifyContent="center"
      pt={24} // or pt={20} based on how much you want
    >
      <Box 
        w="full"
        maxW="md"
        bg="gray.50"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        pt={4}
        px={8}
      >
        <VStack spacing={6}>
          <Heading fontSize="2xl">Create New Product</Heading>
          <Input
            placeholder="Product Name"
            bg="white"
            borderColor="gray.200"
            value={newProduct.name}
            onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
          />
          <Input
            placeholder="Product Price"
            type="number"
            bg="white"
            borderColor="gray.200"
            value={newProduct.price}
            onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
          />
          <Input
            placeholder="Image URL"
            bg="white"
            borderColor="gray.200"
            value={newProduct.image}
            onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
          />
          <Button
            w="full"
            colorScheme="blue"
            size="lg"
            onClick={handleAddProduct}
          >
            Create
          </Button>
        </VStack>
      </Box>
    </Container>
  );
};

export default CreatePage;


// import { Box, Button, Container, VStack } from '@chakra-ui/react'
// import React from 'react'
// import { useProductStore } from '../store/product'
// // import { useToast } from "@chakra-ui/react";
// import { toast } from "sonner"; // ✅ Import toast
// import { useNavigate } from 'react-router-dom';
// const CreatePage = () => {
//   const [newProduct, setNewProduct] = React.useState({
//     name: "",
//     price: "",
//     image: "",
//   })
//   const navigate = useNavigate()
//   // const toast = useToast()
//   const {createProduct} = useProductStore()
//   const handleAddProduct = async () => {
//     if (!newProduct.name || !newProduct.price || !newProduct.image) {
//       toast.error("Error", { description: "All fields are required!" });
//       return;
//     }
//     const { success, message } = await createProduct(newProduct);
//     if (success) {
//       toast.success("Product Added", {
//         description: "Product added successfully!",
//         duration: 3000,
//         dismissible: true,
//       });
    
//       // Delay navigation to let the toast be visible briefly
//       setTimeout(() => {
//         navigate("/");
//       }, 1000);
//     } else {
//       toast.error("Failed to Add Product", {
//         description: message || "Something went wrong!",
//         duration: 5000,
//         dismissible: true,
//       });
//     }}
//   return (
//     <Container maxW={"container.sm"}>
//       <Box w={"full"} bg={"gray.100"} p={4} mb={4} shadow={"md"}>
//       <VStack spacing={8}>
//         <input
//           type="text"
//           placeholder="Name"
//           value={newProduct.name}
//           onChange={(e) => setNewProduct({ ...newProduct, name: e.target.value })}
//         />
//         <input
//           type="number"
//           placeholder="Price"
//           value={newProduct.price}
//           onChange={(e) => setNewProduct({ ...newProduct, price: e.target.value })}
//         />
//         <input
//           type="text"
//           placeholder="Image URL"
//           value={newProduct.image}
//           onChange={(e) => setNewProduct({ ...newProduct, image: e.target.value })}
//         />
//         <Button onClick={handleAddProduct} w='full'>Create</Button>
//       </VStack>
//       </Box>

//     </Container>
//   )
// }

// export default CreatePage