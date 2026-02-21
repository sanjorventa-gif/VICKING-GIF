import {
    Box,
    Container,
    Heading,
    Stack,
    Text,
    Button,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import HeroCarousel from '../../components/features/HeroCarousel';
import FloatingWidget from '../../components/features/FloatingWidget';
import FadeUp from '../../components/animations/FadeUp';

export default function Home() {
    return (
        <Box>
            <HeroCarousel />
            <FloatingWidget />

            {/* Services Highlights Section */}
            <Box py={{ base: 12, md: 16 }} position="relative" bg="surface.50">
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
                        <Stack
                            layerStyle="premiumCard"
                            p={{ base: 8, md: 10 }}
                            align="center"
                            textAlign="center"
                            spacing={6}
                            maxW="3xl"
                            mx="auto"
                        >
                            <Heading size="md" color="gray.900">Soporte Técnico Especializado</Heading>

                            <Text fontSize="md" color="gray.600" lineHeight="tall">
                                Sanjor realizará el soporte técnico, brindando soluciones rápidas y repuestos originales para sus equipos Vicking.
                            </Text>

                            <Button
                                as={RouterLink}
                                to="/servicios/tecnico"
                                variant="link"
                                color="brand.600"
                                fontWeight="600"
                                _hover={{ textDecoration: 'none', color: 'brand.800' }}
                            >
                                Solicitar soporte
                            </Button>

                            <Text fontSize="md" color="gray.600" lineHeight="tall" mt={2}>
                                Encuentre respuestas a las dudas más comunes sobre el funcionamiento y mantenimiento de su equipo.
                            </Text>

                            <Button
                                as={RouterLink}
                                to="/preguntas-frecuentes"
                                variant="link"
                                color="brand.600"
                                fontWeight="600"
                                _hover={{ textDecoration: 'none', color: 'brand.800' }}
                            >
                                Preguntas frecuentes
                            </Button>
                        </Stack>
                    </FadeUp>
                </Container>
            </Box>

            {/* Call to Action */}
            <Box py={{ base: 12, md: 16 }} bgGradient="linear(to-r, blue.800, cyan.400)" position="relative" overflow="hidden">
                <Box
                    position="absolute"
                    top="-50%"
                    left="-10%"
                    w="500px"
                    h="500px"
                    bg="brand.500"
                    filter="blur(150px)"
                    opacity="0.5"
                    borderRadius="full"
                    zIndex={0}
                />
                <Container maxW={'container.xl'} position="relative" zIndex={1}>
                    <FadeUp>
                        <Stack
                            layerStyle="glassDark"
                            p={{ base: 8, md: 10 }}
                            direction={{ base: 'column', md: 'row' }}
                            spacing={8}
                            align={'center'}
                            justify={'space-between'}
                        >
                            <Stack spacing={4} color="white">
                                <Heading size="xl" letterSpacing="-0.02em">¿Necesita asesoramiento técnico?</Heading>
                                <Text fontSize="lg" color="whiteAlpha.800">
                                    Nuestro equipo de expertos está listo para ayudarlo a elegir el equipo ideal.
                                </Text>
                            </Stack>
                            <Button
                                as={RouterLink}
                                to="/contacto"
                                size="lg"
                                bg="white"
                                color="brand.900"
                                _hover={{ bg: 'surface.100', transform: 'scale(1.02)' }}
                                flexShrink={0}
                            >
                                Contactar Ahora
                            </Button>
                        </Stack>
                    </FadeUp>
                </Container>
            </Box>
        </Box>
    );
}
