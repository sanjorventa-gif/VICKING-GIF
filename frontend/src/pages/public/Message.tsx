import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
} from '@chakra-ui/react';
import FadeUp from '../../components/animations/FadeUp';

export default function Message() {
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
                                Mensaje a la Comunidad
                            </Heading>
                            <Text fontSize="xl" color="gray.500" maxW="2xl" mx="auto" lineHeight="relaxed">
                                Un sincero reconocimiento a quienes nos acompañaron durante estos 60 años construyendo la historia de Vicking.
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

                <Container maxW={'container.md'} position="relative" zIndex={1}>
                    <FadeUp delay={0.1}>
                        <Box layerStyle="premiumCard" p={{ base: 8, md: 12 }}>
                            <Stack spacing={8}>
                                <Box>
                                    <Heading size="lg" color="gray.900" mb={6} letterSpacing="-0.01em">
                                        Estimados clientes:
                                    </Heading>
                                    <Stack spacing={6} color="gray.600" fontSize="lg" lineHeight="tall">
                                        <Text textAlign="justify">
                                            Nos dirigimos a ustedes con una mezcla de emoción y gratitud para comunicarles que, luego de 60 años de trayectoria, nuestra empresa ha tomado la decisión de cerrar definitivamente sus puertas.
                                        </Text>
                                        <Text textAlign="justify">
                                            No es solo el final de una actividad comercial, sino el cierre de una historia construida día a día junto a ustedes. Durante seis décadas fabricamos agitadores y baños termostáticos que acompañaron investigaciones, análisis, aprendizajes y descubrimientos. Saber que nuestros equipos formaron parte del trabajo cotidiano de tantos laboratorios es, sin dudas, nuestro mayor orgullo.
                                        </Text>
                                        <Text textAlign="justify">
                                            Esta empresa nació como un proyecto compartido entre mi padre y sus socios fundadores. Con el paso del tiempo, mi padre asumió plenamente su conducción y la desarrolló con dedicación, compromiso y respeto por el trabajo bien hecho. Más adelante, sus hijos tuvimos el honor de sumarnos, continuando esa misma forma de trabajar, con los mismos valores y el mismo cuidado por cada equipo y cada cliente.
                                        </Text>
                                    </Stack>
                                </Box>

                                <Box w="full" h="1px" bg="gray.100" />

                                <Stack spacing={6} color="gray.600" fontSize="lg" lineHeight="tall">
                                    <Text textAlign="justify">
                                        Queremos agradecer profundamente la confianza, el respeto y la cercanía que nos brindaron a lo largo de todos estos años. Muchos de ustedes no fueron solo clientes, sino compañeros de camino.
                                    </Text>
                                    <Text textAlign="justify">
                                        Sabemos que esta noticia puede generar preocupación, especialmente en relación con el servicio técnico de los equipos que continúan en uso. Por eso queremos llevarles tranquilidad y designar a la empresa SAN JOR para la realización del service y soporte técnico. Nuestro deseo es acompañarlos responsablemente en esta etapa de transición.
                                    </Text>
                                    <Text textAlign="justify" fontWeight="500">
                                        Gracias por habernos permitido ser parte de su trabajo y de su historia. Nos despedimos con sincero reconocimiento y respeto.
                                    </Text>

                                    <Box mt={6} layerStyle="glass" bg="brand.50" p={6} borderRadius="xl" border="1px solid" borderColor="brand.100">
                                        <Stack spacing={1}>
                                            <Text fontWeight="700" color="brand.700" fontSize="xl">Con afecto,</Text>
                                            <Text fontWeight="700" color="brand.700" fontSize="xl" mb={2}>Vicking SRL</Text>
                                            <Text color="gray.700" fontWeight="500">Cristina Recchia <Text as="span" color="gray.500" fontWeight="400">– Socio Gerente</Text></Text>
                                            <Text color="gray.700" fontWeight="500">Norberto Recchia <Text as="span" color="gray.500" fontWeight="400">– Socio Gerente</Text></Text>
                                        </Stack>
                                    </Box>
                                </Stack>
                            </Stack>
                        </Box>
                    </FadeUp>
                </Container>
            </Box>
        </Box>
    );
}
