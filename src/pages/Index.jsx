import React, { useState, useEffect } from "react";
import { Box, VStack, HStack, IconButton, Input, InputGroup, InputRightElement, Text, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import { FaCamera, FaPaperPlane, FaRegSmile } from "react-icons/fa";

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const { isOpen: isSnapOpen, onOpen: onSnapOpen, onClose: onSnapClose } = useDisclosure();
  const initialRef = React.useRef();
  const [snapMessage, setSnapMessage] = useState("");
  const [snaps, setSnaps] = useState([]);
  const [selectedSnap, setSelectedSnap] = useState(null);

  useEffect(() => {
    const interval = setInterval(() => {
      const newSnap = `Snap received at ${new Date().toLocaleTimeString()}`;
      setSnaps((prevSnaps) => [...prevSnaps, newSnap]);
    }, 10000);

    return () => clearInterval(interval);
  }, []);

  const handleOpenSnap = (snap) => {
    setSelectedSnap(snap);
    onSnapOpen();
  };

  const handleSendSnap = () => {
    console.log("Snap sent:", snapMessage);
    setSnapMessage("");
  };

  return (
    <VStack spacing={4} p={4}>
      <Box w="full" h="300px" bg="gray.200" pos="relative" borderRadius="md">
        <IconButton icon={<FaCamera />} isRound size="lg" pos="absolute" bottom={4} right={4} onClick={onOpen} />
        <Modal initialFocusRef={initialRef} isOpen={isOpen} onClose={onClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Take a Snap</ModalHeader>
            <ModalCloseButton />
            <ModalBody>
              <Box w="full" h="300px" bg="gray.300" borderRadius="md" display="flex" alignItems="center" justifyContent="center">
                <Text>Camera View</Text>
              </Box>
            </ModalBody>

            <ModalFooter>
              <Button colorScheme="blue" mr={3} onClick={onClose}>
                Close
              </Button>
              <Button variant="ghost">Snap!</Button>
            </ModalFooter>
          </ModalContent>
        </Modal>
      </Box>

      <VStack w="full" spacing={2} alignItems="stretch">
        <Text fontSize="lg" fontWeight="bold">
          Messages
        </Text>
        <Box w="full" h="200px" bg="gray.100" borderRadius="md" overflowY="auto">
          {snaps.map((snap, index) => (
            <Box key={index} p={2} bg="white" borderRadius="md" mb={2} shadow="md" cursor="pointer" onClick={() => handleOpenSnap(snap)}>
              {snap}
            </Box>
          ))}
        </Box>

        <Modal isOpen={isSnapOpen} onClose={onSnapClose}>
          <ModalOverlay />
          <ModalContent>
            <ModalHeader>Snap</ModalHeader>
            <ModalCloseButton />
            <ModalBody>{selectedSnap}</ModalBody>
          </ModalContent>
        </Modal>
      </VStack>

      <InputGroup size="md">
        <Input pr="4.5rem" type="text" placeholder="Send a snap" value={snapMessage} onChange={(e) => setSnapMessage(e.target.value)} ref={initialRef} />
        <InputRightElement width="4.5rem">
          <HStack spacing={2}>
            <IconButton icon={<FaRegSmile />} variant="ghost" aria-label="Add emoji" />
            <IconButton icon={<FaPaperPlane />} variant="ghost" aria-label="Send snap" onClick={() => handleSendSnap()} />
          </HStack>
        </InputRightElement>
      </InputGroup>
    </VStack>
  );
};

export default Index;
