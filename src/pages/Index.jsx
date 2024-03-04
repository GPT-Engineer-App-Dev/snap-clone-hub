import React from "react";
import { Box, VStack, HStack, IconButton, Input, InputGroup, InputRightElement, Text, Image, useDisclosure, Modal, ModalOverlay, ModalContent, ModalHeader, ModalFooter, ModalBody, ModalCloseButton, Button } from "@chakra-ui/react";
import { FaCamera, FaPaperPlane, FaRegSmile } from "react-icons/fa";

const Index = () => {
  const { isOpen, onOpen, onClose } = useDisclosure();
  const initialRef = React.useRef();

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
          {/* Messages would be mapped here */}
          <Text p={2}>Friend's Snap</Text>
          <Text p={2}>Another Snap</Text>
        </Box>
      </VStack>

      <InputGroup size="md">
        <Input pr="4.5rem" type="text" placeholder="Send a message" ref={initialRef} />
        <InputRightElement width="4.5rem">
          <HStack spacing={2}>
            <IconButton icon={<FaRegSmile />} variant="ghost" aria-label="Add emoji" />
            <IconButton icon={<FaPaperPlane />} variant="ghost" aria-label="Send message" />
          </HStack>
        </InputRightElement>
      </InputGroup>
    </VStack>
  );
};

export default Index;
