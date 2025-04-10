import { Container, SimpleGrid, Text, VStack } from '@chakra-ui/react'
import React from 'react'
import { useEffect } from 'react'
import { useProductStore } from '../store/product'
import ProductCard from '../components/ProductCard'

const HomePage = () => {
  const {fetchProducts, products} = useProductStore()

  useEffect(() => {
    fetchProducts()
  }, [fetchProducts])
  // console.log("products", products)

  return (
    <Container maxW="container.xl" py={12}>
      <VStack spacing={8}>
        <Text
          fontSize="2xl"
          fontWeight="bold"
          textAlign="center"
          style={{
            background: "linear-gradient(to right, #7928CA, #FF0080)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
          }}
          // bgGradient="linear(to-r, #7928CA,#FF0080)"
          // bgClip="text"
        >
          Current Products
          </Text>

          <SimpleGrid
            columns={{ base: 1, md: 2, lg: 3 }}
            spacing={10}
            width={"full"}
            >
              {products.map((product) => (
                <ProductCard key={product._id} product={product} />
              ))}
            </SimpleGrid>
        </VStack>
      </Container>
  )
}

export default HomePage