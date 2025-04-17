import React, { useState } from 'react';
import { Button, Input, Box, VStack, Heading, Text } from '@chakra-ui/react';
import { useNavigate } from 'react-router-dom';
import { toast } from "sonner"; // already imported, just a reminder
const AuthPage = () => {
  const [isSignup, setIsSignup] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

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
        // 🛑 Custom check for existing user
        if (isSignup && data.message === "User already exists") {
          toast.warning("User already exists. Redirecting to login...");
          setTimeout(() => {
            setIsSignup(false); // Switch to login form
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
    <Box p={6} maxW="400px" mx="auto">
      <Heading mb={4}>{isSignup ? 'Sign Up' : 'Login'}</Heading>
      <VStack spacing={4}>
        {isSignup && (
          <Input placeholder="Name" value={name} onChange={(e) => setName(e.target.value)} />
        )}
        <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
        <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
        <Button colorScheme="blue" onClick={handleAuth}>
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
  );
};

export default AuthPage;

// import React, { useState } from 'react';
// import { Button, Input, Box, VStack, Heading } from '@chakra-ui/react';

// const AuthPage = () => {
//   const [email, setEmail] = useState('');
//   const [password, setPassword] = useState('');

//   const handleLogin = async () => {
//     try {
//       const res = await fetch('/api/users/login', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ email, password }),
//       });

//       const data = await res.json();

//       if (data.success) {
//         localStorage.setItem("token", data.token);
//         console.log("Login success:", data.user);
//         // Navigate to home or show toast
//       } else {
//         console.error(data.message);
//       }
//     } catch (err) {
//       console.error("Login error", err);
//     }
//   };

//   return (
//     <Box p={6} maxW="400px" mx="auto">
//       <Heading mb={4}>Login</Heading>
//       <VStack spacing={4}>
//         <Input placeholder="Email" value={email} onChange={(e) => setEmail(e.target.value)} />
//         <Input placeholder="Password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
//         <Button colorScheme="blue" onClick={handleLogin}>Login</Button>
//       </VStack>
//     </Box>
//   );
// };

// export default AuthPage;
