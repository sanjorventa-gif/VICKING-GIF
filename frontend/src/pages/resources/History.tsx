import {
    Box,
    Container,
    Text,
    Heading,
    Stack,
} from '@chakra-ui/react';
import CompanyTimeline from '../../components/features/CompanyTimeline';
import FadeUp from '../../components/animations/FadeUp';

export default function History() {
    return (
        <Box bg="surface.50" minH="100vh">
            {/* Minimalist Hero Section */}
            <Box
                pt={{ base: 12, md: 16 }}
                pb={{ base: 12, md: 16 }}
                position="relative"
            >
                <Container maxW={'container.md'} position="relative" zIndex={1} textAlign="center">
                    <FadeUp>
                        <Stack spacing={6}>
                            <Heading
                                as="h1"
                                textStyle="h1"
                                color="gray.900"
                            >
                                Nuestra Historia
                            </Heading>
                            <Text fontSize="xl" color="gray.500" maxW="2xl" mx="auto" lineHeight="relaxed">
                                Descubre los hitos más relevantes y décadas de innovación que formaron el legado de Vicking.
                            </Text>
                        </Stack>
                    </FadeUp>
                </Container>
            </Box>

            {/* TIMELINE SECTION */}
            <Box
                pb={24}
                position="relative"
            >
                {/* Background Pattern */}
                <Box
                    position="absolute"
                    top="0"
                    left="0"
                    w="full"
                    h="full"
                    opacity={0.08}
                    backgroundImage="radial-gradient(black 1px, transparent 1px)"
                    backgroundSize="24px 24px"
                    zIndex={0}
                    pointerEvents="none"
                />

                <Container maxW="container.xl" position="relative" zIndex={1}>
                    <FadeUp delay={0.1}>
                        <Box layerStyle="premiumCard" p={{ base: 6, md: 10 }}>
                            <CompanyTimeline hideTitle={true} />
                        </Box>
                    </FadeUp>
                </Container>
            </Box>
        </Box>
    );
}
