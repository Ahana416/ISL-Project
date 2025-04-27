//***CORRECT CODE *******/
import { EditIcon, DeleteIcon } from "@chakra-ui/icons";
import {
  Box,
  Heading,
  HStack,
  IconButton,
  Image,
  Input,
  Text,
  Button,
  VStack,
} from "@chakra-ui/react";
import { useColorModeValue } from "./ui/color-mode";
import { useProductStore } from "../store/product";
import { toast } from "sonner";
import { useState } from "react";

const ProductCard = ({ product }) => {
  const textColor = useColorModeValue("gray.700", "gray.100");
  // const bg = useColorModeValue("white", "gray.800");
  const bg = useColorModeValue("gray.50", "gray.700");

  const { deleteProduct, editProduct } = useProductStore();


  const [isEditing, setIsEditing] = useState(false);
  const [editedProduct, setEditedProduct] = useState({
    name: product.name,
    price: product.price,
    image: product.image,
  });

  const handleDelete = async (id) => {
    const { success, message } = await deleteProduct(id);
    if (success) {
      toast.success(message, {
        description: "Product deleted successfully.",
        duration: 2000,
      });
    } else {
      console.error(message);
    }
  };

  const handleSave = async () => {
    const { success, message } = await editProduct(product._id, editedProduct);
    if (success) {
      toast.success(message, {
        description: "Product updated successfully.",
        duration: 2000,
      });
      setIsEditing(false);
    } else {
      toast.error("Failed to update product.");
      console.error(message);
    }
  };
  

  return (
    <Box
      shadow="lg"
      rounded="lg"
      overflow="hidden"
      transition="all 0.3s"
      _hover={{ transform: "translateY(-4px)", shadow: "xl" }}
      bg={bg}
      maxW="sm"
    >
      <Image
        src={editedProduct.image}
        alt={editedProduct.name}
        h={48}
        w="full"
        objectFit="cover"
      />

      <Box p={4}>
        {isEditing ? (
          <VStack spacing={3} align="stretch">
            <Input
              placeholder="Product Name"
              value={editedProduct.name}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, name: e.target.value })
              }
            />
            <Input
              placeholder="Product Price"
              value={editedProduct.price}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, price: e.target.value })
              }
            />
            <Input
              placeholder="Image URL"
              value={editedProduct.image}
              onChange={(e) =>
                setEditedProduct({ ...editedProduct, image: e.target.value })
              }
            />
            <HStack>
              <Button size="sm" colorScheme="blue" onClick={handleSave}>
                Save
              </Button>
              <Button
                size="sm"
                variant="ghost"
                onClick={() => {
                  setEditedProduct({
                    name: product.name,
                    price: product.price,
                    image: product.image,
                  });
                  setIsEditing(false);
                }}
              >
                Cancel
              </Button>
            </HStack>
          </VStack>
        ) : (
          <>
          <Heading fontSize="2xl" mb={2} color={textColor}>
            {editedProduct.name}
          </Heading>
          <Text fontWeight="bold" fontSize="xl" color={textColor} mb={4}>
            ${editedProduct.price}
          </Text>

          </>
        )}

        <HStack spacing={4} mt={isEditing ? 4 : 0}>
          <IconButton
            aria-label="Edit Product"
            icon={<EditIcon />}
            bg="blue.500"
            _hover={{ bg: "blue.600" }}
            color="white"
            size="sm"
            onClick={() => setIsEditing(true)}
          />
          <IconButton
            aria-label="Delete Product"
            icon={<DeleteIcon />}
            bg="red.500"
            _hover={{ bg: "red.600" }}
            color="white"
            size="sm"
            onClick={() => handleDelete(product._id)}
          />
        </HStack>
      </Box>
    </Box>
  );
};

export default ProductCard;




// **XSS VULNERABILITY**
// import { Box, Heading, Text, Image, Button, VStack, HStack, Input } from "@chakra-ui/react"; 
// import { useState } from "react";  

// const ProductCard = ({ product }) => {   
//   const [isEditing, setIsEditing] = useState(false);   
//   const [editedProduct, setEditedProduct] = useState({     
//     name: product.name,     
//     price: product.price,     
//     image: product.image,   
//   });    

//   const handleSave = () => {     
//     console.log("Product saved:", editedProduct);     
//     setIsEditing(false);   
//   };    

//   return (     
//     <Box
//       maxW="sm"
//       borderWidth="1px"
//       borderRadius="lg"
//       overflow="hidden"
//       boxShadow="md"
//       p={4}
//       bg="white"
//     >
//       <Image
//         borderRadius="md"
//         src={editedProduct.image}
//         alt={editedProduct.name}
//         objectFit="cover"
//         w="100%"
//         h="200px"
//       />
      
//       <VStack align="start" mt={4} spacing={2}>
//         {isEditing ? (
//           <div>
//             <Input
//               mb={2}
//               value={editedProduct.name}
//               onChange={(e) =>
//                 setEditedProduct({ ...editedProduct, name: e.target.value })
//               }
//               placeholder="Edit product name"
//             />
//             <Input
//               mb={2}
//               value={editedProduct.price}
//               onChange={(e) =>
//                 setEditedProduct({ ...editedProduct, price: e.target.value })
//               }
//               placeholder="Edit product price"
//             />
//             <Button onClick={handleSave} colorScheme="teal" size="sm">
//               Save
//             </Button>
//           </div>
//         ) : (
//           <div>
//             <Heading fontSize="xl">{editedProduct.name}</Heading>
//             <Text fontWeight="bold" fontSize="lg">${editedProduct.price}</Text>

//             {/* 🧨 XSS Happens here */}
//             <div
//               dangerouslySetInnerHTML={{
//                 __html: `<p>Product: ${editedProduct.name}</p>`,
//               }}
//             />
//           </div>
//         )}
//       </VStack>

//       <HStack mt={4} spacing={4}>
//         <Button colorScheme="blue" onClick={() => setIsEditing(true)}>
//           Edit
//         </Button>
//         <Button colorScheme="red" onClick={() => alert("Product deleted!")}>
//           Delete
//         </Button>
//       </HStack>
//     </Box>   
//   ); 
// };  

// export default ProductCard;
