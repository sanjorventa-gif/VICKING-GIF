import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    SimpleGrid,
} from '@chakra-ui/react';
import FadeUp from '../../components/animations/FadeUp';

export default function FamilyCompanies() {
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
                                Familias y Empresas
                            </Heading>
                            <Text fontSize="xl" color="gray.500" maxW="2xl" mx="auto" lineHeight="relaxed">
                                Familias paralelas y empresas paralelas unidas por el mismo compromiso y dedicación a la ciencia.
                            </Text>
                        </Stack>
                    </FadeUp>
                </Container>
            </Box>

            {/* Content Section */}
            <Box pb={24} position="relative">
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

                <Container maxW={'container.lg'} position="relative" zIndex={1}>
                    <FadeUp delay={0.1}>
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} pt={8}>
                            {/* Vicking Bento Card */}
                            <Box layerStyle="premiumCard" overflow="hidden" position="relative">
                                {/* Decorative Accent */}
                                <Box position="absolute" top="0" left="0" w="full" h="4px" />

                                <Box p={{ base: 8, md: 10 }}>
                                    <Heading size="xl" textAlign="center" mb={10} color="gray.900" letterSpacing="-0.02em">
                                        Vicking
                                    </Heading>
                                    <Stack spacing={10}>
                                        <Box textAlign="center">
                                            <Text fontWeight="600" color="brand.500" textTransform="uppercase" fontSize="sm" letterSpacing="widest" mb={3}>Fundación</Text>
                                            <Text fontSize="xl" fontWeight="500" color="gray.800">Década del 60</Text>
                                        </Box>
                                        <Box textAlign="center">
                                            <Text fontWeight="600" color="brand.500" textTransform="uppercase" fontSize="sm" letterSpacing="widest" mb={3}>Fundador</Text>
                                            <Heading size="md" mb={3} color="gray.900">Carlos Recchia</Heading>
                                            <Text color="gray.600" fontSize="md" lineHeight="tall">
                                                Investigador nato de ingenio inigualable. Diseño de Shaker Pro y construcción de telescopios telescópicos.
                                            </Text>
                                        </Box>
                                        <Box textAlign="center">
                                            <Text fontWeight="600" color="brand.500" textTransform="uppercase" fontSize="sm" letterSpacing="widest" mb={3}>Legado</Text>
                                            <Text fontSize="lg" color="gray.700" fontWeight="500">Sus hijos Cristina y Norberto</Text>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Box>

                            {/* San Jor Bento Card */}
                            <Box layerStyle="premiumCard" overflow="hidden" position="relative">
                                {/* Decorative Accent */}
                                <Box position="absolute" top="0" left="0" w="full" h="4px" bg="brand.500" />

                                <Box p={{ base: 8, md: 10 }}>
                                    <Heading size="xl" textAlign="center" mb={10} color="brand.600" letterSpacing="-0.02em">
                                        SAN JOR
                                    </Heading>
                                    <Stack spacing={10}>
                                        <Box textAlign="center">
                                            <Text fontWeight="600" color="gray.500" textTransform="uppercase" fontSize="sm" letterSpacing="widest" mb={3}>Fundación</Text>
                                            <Text fontSize="xl" fontWeight="500" color="gray.800">Década del 60</Text>
                                        </Box>
                                        <Box textAlign="center">
                                            <Text fontWeight="600" color="gray.500" textTransform="uppercase" fontSize="sm" letterSpacing="widest" mb={3}>Fundador</Text>
                                            <Heading size="md" mb={3} color="gray.900">Jorge Guerrero</Heading>
                                            <Text color="gray.600" fontSize="md" lineHeight="tall">
                                                Campeón argentino en grandes aparatos (gimnasia artística), forjador de innovación industrial aplicada.
                                            </Text>
                                        </Box>
                                        <Box textAlign="center">
                                            <Text fontWeight="600" color="gray.500" textTransform="uppercase" fontSize="sm" letterSpacing="widest" mb={3}>Legado</Text>
                                            <Text fontSize="lg" color="gray.700" fontWeight="500">Sus hijos Jorgelina y Eduardo</Text>
                                        </Box>
                                    </Stack>
                                </Box>
                            </Box>
                        </SimpleGrid>
                    </FadeUp>
                </Container>
            </Box>
        </Box>
    );
}
