import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    SimpleGrid,
} from '@chakra-ui/react';
import FadeUp from '../../components/animations/FadeUp';

export default function Company() {
    return (
        <Box bg="surface.50" minH="100vh">
            {/* HERO SECTION */}
            <Box
                pt={{ base: 12, md: 16 }}
                pb={{ base: 12, md: 16 }}
                position="relative"
            >
                <Container maxW={'container.md'} position="relative" zIndex={1} textAlign={'center'}>
                    <FadeUp>
                        <Stack spacing={6}>
                            <Heading
                                as="h1"
                                textStyle="h1"
                                color="gray.900"
                            >
                                Nuestra{' '}
                                <Text as={'span'} color={'brand.500'}>
                                    Empresa
                                </Text>
                            </Heading>
                            <Text fontSize="xl" color="gray.500" maxW="2xl" mx="auto" lineHeight="relaxed">
                                Líderes en fabricación de equipos médicos de alta calidad, sustentando la salud e innovación por más de 60 años.
                            </Text>
                        </Stack>
                    </FadeUp>
                </Container>
            </Box>

            {/* ACERCA DE SECTION */}
            <Box pb={24} position="relative">
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

                <Container maxW={'container.xl'} position="relative" zIndex={1}>
                    <FadeUp delay={0.1}>
                        <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={12} pt={8}>
                            <Stack spacing={8} layerStyle="premiumCard" p={{ base: 8, md: 12 }}>
                                <Heading size="lg" color={'gray.900'} letterSpacing="-0.01em">
                                    Acerca de Vicking
                                </Heading>
                                <Stack spacing={6} color="gray.600" fontSize="lg" lineHeight="tall">
                                    <Text textAlign="justify">
                                        Vicking es una empresa argentina que desarrolló equipos, accesorios para laboratorios, equipamientos médicos y hospitalarios de excelente calidad por más de 60 años.
                                    </Text>
                                    <Text textAlign="justify">
                                        Ampliamente reconocida por los baños termostáticos por su eficiencia y solidez en el trabajo diario en todo laboratorio. Sanjor asume el compromiso de brindar el soporte y mantenimiento oficial de estos equipos, uniendo el prestigio histórico con un servicio modernizado.
                                    </Text>
                                </Stack>
                            </Stack>

                            <Box
                                borderRadius="2xl"
                                overflow="hidden"
                                position="relative"
                                minH="400px"
                                boxShadow="xl"
                            >
                                <Box
                                    position="absolute"
                                    top="0"
                                    left="0"
                                    w="full"
                                    h="full"
                                    bg="brand.900"
                                    opacity={0.05}
                                />
                                <Box
                                    w="full"
                                    h="full"
                                    bgImage="url('https://images.unsplash.com/photo-1581093458791-9f3c3900df4b?q=80&w=2070&auto=format&fit=crop')"
                                    bgSize="cover"
                                    bgPosition="center"
                                />
                            </Box>
                        </SimpleGrid>
                    </FadeUp>
                </Container>
            </Box>
        </Box>
    );
}
