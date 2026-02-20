import { useState, useEffect } from 'react';
import {
    Box,
    Container,
    Heading,
    Text,
    Accordion,
    AccordionItem,
    AccordionButton,
    AccordionPanel,
    AccordionIcon,
    Spinner,
    Flex,
    Stack,
} from '@chakra-ui/react';
import { getFaqs, type Faq as FaqType } from '../../api/faqs';
import FadeUp from '../../components/animations/FadeUp';

export default function Faq() {
    const [faqs, setFaqs] = useState<FaqType[]>([]);
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
            {/* Minimalist Hero Section */}
            <Box
                pt={{ base: 12, md: 16 }}
                pb={{ base: 16, md: 24 }}
                position="relative"
                overflow="hidden"
            >
                <Container maxW="container.md" textAlign="center" position="relative" zIndex={1}>
                    <FadeUp>
                        <Stack spacing={6}>
                            <Heading
                                as="h1"
                                textStyle="h1"
                                color="gray.900"
                            >
                                Preguntas Frecuentes
                            </Heading>
                            <Text fontSize="xl" color="gray.600" maxW="2xl" mx="auto" lineHeight="relaxed">
                                Respuestas rápidas a las consultas más habituales sobre nuestros equipos, mantenciones y garantías.
                            </Text>
                        </Stack>
                    </FadeUp>
                </Container>
            </Box>

            {/* Accordion Content */}
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

                <Container maxW="container.md" position="relative" zIndex={1}>
                    {isLoading ? (
                        <Flex justify="center" py={16}>
                            <Spinner size="xl" color="brand.500" thickness="3px" />
                        </Flex>
                    ) : (
                        <FadeUp delay={0.2}>
                            <Accordion allowMultiple>
                                {faqs.map((faq) => (
                                    <AccordionItem
                                        key={faq.id}
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
                                                    {faq.question}
                                                </Box>
                                                <AccordionIcon color="brand.500" fontSize="xl" />
                                            </AccordionButton>
                                        </h2>
                                        <AccordionPanel pb={6} px={6} color="gray.600" fontSize="md" lineHeight="tall" bg="white">
                                            {faq.answer}
                                        </AccordionPanel>
                                    </AccordionItem>
                                ))}
                            </Accordion>
                        </FadeUp>
                    )}

                    {!isLoading && faqs.length === 0 && (
                        <FadeUp>
                            <Box textAlign="center" py={16} layerStyle="glass">
                                <Text color="gray.500" fontSize="lg">
                                    No hay preguntas frecuentes disponibles en este momento.
                                </Text>
                            </Box>
                        </FadeUp>
                    )}
                </Container>
            </Box>
        </Box>
    );
}
