import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Button,
    SimpleGrid,
    Spinner,
    Flex,
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { getFaqs, type Faq } from '../../api/faqs';
import FadeUp from '../../components/animations/FadeUp';

export default function Services() {
    const [faqs, setFaqs] = useState<Faq[]>([]);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const fetchFaqs = async () => {
            try {
                const data = await getFaqs();
                setFaqs(data);
            } catch (error) {
                console.error("Error loading FAQs:", error);
            } finally {
                setIsLoading(false);
            }
        };
        fetchFaqs();
    }, []);

    return (
        <Box bg="surface.50" minH="100vh">
            {/* Header Section */}
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
                                Servicios y Soporte
                            </Heading>
                            <Text fontSize="xl" color="gray.500" maxW="2xl" mx="auto" lineHeight="relaxed">
                                Brindamos soporte integral para asegurar el máximo rendimiento de sus equipos VICKING, con el respaldo técnico oficial de Sanjor.
                            </Text>
                        </Stack>
                    </FadeUp>
                </Container>
            </Box>

            {/* Content Section */}
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
                        <SimpleGrid columns={{ base: 1, md: 2 }} spacing={8} mb={16} pt={8}>
                            <ServiceCard
                                title="Soporte Técnico"
                                text="Mantenimiento preventivo, correctivo y repuestos originales con garantía oficial certificada."
                                action="Solicitar Soporte"
                                link="/servicios/tecnico"
                                iconPath="M14.7 6.3a1 1 0 0 0 0 1.4l1.6 1.6a1 1 0 0 0 1.4 0l3.77-3.77a6 6 0 0 1-7.94 7.94l-6.91 6.91a2.12 2.12 0 0 1-3-3l6.91-6.91a6 6 0 0 1 7.94-7.94l-3.76 3.76z"
                            />
                            <ServiceCard
                                title="Preguntas Frecuentes"
                                text="Biblioteca de recursos para resolver de forma inmediata dudas frecuentes sobre el funcionamiento operativo."
                                action="Ver FAQs"
                                link="/preguntas-frecuentes"
                                iconPath="M9.09 9a3 3 0 0 1 5.83 1c0 2-3 3-3 3M12 17h.01M22 12c0 5.523-4.477 10-10 10S2 17.523 2 12 6.477 2 12 2s10 4.477 10 10z"
                            />
                        </SimpleGrid>
                    </FadeUp>

                    <FadeUp delay={0.2}>
                        <Box mb={16} maxW="container.md" mx="auto">
                            <Heading size="lg" mb={8} color="gray.900" textAlign="center" letterSpacing="-0.01em">
                                Preguntas Relevantes
                            </Heading>
                            {isLoading ? (
                                <Flex justify="center" py={10}>
                                    <Spinner size="xl" color="brand.500" thickness="3px" />
                                </Flex>
                            ) : (
                                <Accordion allowMultiple>
                                    {faqs.length > 0 ? (
                                        faqs.slice(0, 5).map((faq) => (
                                            <FAQItem
                                                key={faq.id}
                                                question={faq.question}
                                                answer={faq.answer}
                                            />
                                        ))
                                    ) : (
                                        <Box textAlign="center" py={10} layerStyle="glass">
                                            <Text color="gray.500" fontSize="lg">
                                                No hay preguntas frecuentes disponibles.
                                            </Text>
                                        </Box>
                                    )}
                                </Accordion>
                            )}
                        </Box>

                        <Box layerStyle="premiumCard" p={10} textAlign="center" maxW="container.md" mx="auto">
                            <Stack spacing={6} align="center">
                                <Heading size="md" color="gray.900">¿No encontró lo que buscaba?</Heading>
                                <Button
                                    as={RouterLink}
                                    to="/contacto"
                                    colorScheme="brand"
                                    size="lg"
                                >
                                    Contáctenos directamente
                                </Button>
                            </Stack>
                        </Box>
                    </FadeUp>
                </Container>
            </Box>
        </Box>
    );
}

const ServiceCard = ({ title, text, action, link, iconPath }: { title: string; text: string; action: string; link: string; iconPath: string }) => {
    return (
        <Stack
            layerStyle="premiumCard"
            p={8}
            align={'flex-start'}
            justify="space-between"
            height="100%"
            spacing={6}
        >
            <Stack spacing={4}>
                <Box
                    w="12"
                    h="12"
                    borderRadius="xl"
                    bg="brand.50"
                    display="flex"
                    alignItems="center"
                    justifyContent="center"
                    color="brand.500"
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                        <path d={iconPath}></path>
                    </svg>
                </Box>
                <Heading size="md" color="gray.900">{title}</Heading>
                <Text fontSize="md" color="gray.600" lineHeight="tall">{text}</Text>
            </Stack>
            <Button
                as={RouterLink}
                to={link}
                variant="outline"
                colorScheme="brand"
                size="md"
                width="auto"
            >
                {action}
            </Button>
        </Stack>
    );
};

const FAQItem = ({ question, answer }: { question: string; answer: string }) => {
    return (
        <AccordionItem
            border="none"
            mb={4}
            layerStyle="premiumCard"
            overflow="hidden"
        >
            <h2>
                <AccordionButton
                    _expanded={{
                        bg: 'brand.50',
                        color: 'brand.700',
                        borderBottomRadius: 'none'
                    }}
                    _hover={{ bg: 'surface.100' }}
                    p={6}
                    rounded="xl"
                    transition="all 0.2s"
                >
                    <Box flex="1" textAlign="left" fontWeight="600" fontSize="lg" color="gray.800">
                        {question}
                    </Box>
                    <AccordionIcon color="brand.500" fontSize="xl" />
                </AccordionButton>
            </h2>
            <AccordionPanel pb={6} px={6} color="gray.600" fontSize="md" lineHeight="tall" bg="white">
                {answer}
            </AccordionPanel>
        </AccordionItem>
    );
};
