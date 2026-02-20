import { Box, Spinner, Center, Text } from '@chakra-ui/react';

export default function LoadingScreen() {
    return (
        <Center w="100%" h="100vh" bg="surface.50">
            <Box textAlign="center">
                <Spinner
                    thickness="3px"
                    speed="0.65s"
                    emptyColor="surface.200"
                    color="brand.500"
                    size="xl"
                />
                <Text mt={4} fontSize="sm" color="gray.500" fontWeight="500">
                    Cargando experiencia...
                </Text>
            </Box>
        </Center>
    );
}
