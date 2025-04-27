import React, { useState } from 'react';
import { Button, Input, Box, VStack, Heading, Text, Container } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner";
import { useColorModeValue } from '@chakra-ui/react'; // 🆕 Import useColorModeValue
const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const headingColor = useColorModeValue('gray.700', 'gray.300'); // 🆕 Light mode: dark gray | Dark mode: lighter gray

  const handleAuth = async () => {
    const endpoint = isSignup ? "/api/users/signup" : "/api/users/login";

    try {
      const res = await fetch(endpoint, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password, name }),
      });

      const data = await res.json();

      if (data.success) {
        localStorage.setItem("token", data.token);
        localStorage.setItem("user", JSON.stringify(data.user));
        toast.success(isSignup ? "Account created!" : "Logged in!");
        navigate("/");
      } else {
        if (isSignup && data.message === "User already exists") {
          toast.warning("User already exists. Redirecting to login...");
          setTimeout(() => {
            setIsSignup(false);
          }, 1500);
        } else {
          toast.error(data.message || "Something went wrong");
        }
      }
    } catch (err) {
      console.error("Auth error:", err);
      toast.error("Server error. Try again later.");
    }
  };

  return (
    <Container maxW="container.sm" py={20}>
      <Box 
        w="full"
        maxW="md"
        bg="gray.50"
        p={8}
        borderRadius="lg"
        boxShadow="lg"
        mx="auto"
      >
        <Heading mb={6} textAlign="center" color={headingColor}>
          {isSignup ? 'Sign Up' : 'Login'}
        </Heading>        
        <VStack spacing={4}>
          {isSignup && (
            <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
          )}
          <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
          <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
          <Button colorScheme="blue" w="full" onClick={handleAuth}>
            {isSignup ? 'Sign Up' : 'Login'}
          </Button>
          <Text
            fontSize="sm"
            color="blue.500"
            cursor="pointer"
            onClick={() => setIsSignup(!isSignup)}
          >
            {isSignup ? 'Already have an account? Login' : "Don't have an account? Sign Up"}
          </Text>
        </VStack>
      </Box>
    </Container>
  );
};

export default AuthPage;