import {
    Box,
    Container,
    Heading,
    Text,
    Stack,
    SimpleGrid,
    FormControl,
    FormLabel,
    Input,
    Textarea,
    Button,
    useToast,
    Select,
} from '@chakra-ui/react';
import { useGoogleReCaptcha } from 'react-google-recaptcha-v3';
import api from '../../api/axios';
import { useAuth } from '../../context/AuthContext';
import { useLocation } from 'react-router-dom';
import FadeUp from '../../components/animations/FadeUp';

export default function Contact() {
    const toast = useToast();
    const { executeRecaptcha } = useGoogleReCaptcha();
    const { user } = useAuth();
    const location = useLocation();
    const searchParams = new URLSearchParams(location.search);
    const prefilledMessage = searchParams.get('message') || '';

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const formData = new FormData(e.target as HTMLFormElement);
        const data = Object.fromEntries(formData.entries());

        if (!executeRecaptcha) {
            console.log('Execute recaptcha not yet available');
            return;
        }

        try {
            const token = await executeRecaptcha('contact_form');
            const payload = {
                name: data.name as string,
                lastname: data.lastname as string,
                company: data.company as string,
                email: data.email as string,
                phone: data.phone as string,
                rubro: data.rubro as string,
                cargo: data.cargo as string,
                message: data.message as string,
                recaptcha_token: token
            };

            await api.post('/contact/', payload);

            toast({
                title: 'Mensaje enviado.',
                description: "Nos pondremos en contacto con usted a la brevedad.",
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            (e.target as HTMLFormElement).reset();
        } catch (error) {
            console.error(error);
            toast({
                title: 'Error.',
                description: "Hubo un problema al enviar el mensaje.",
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Box bg="surface.50" minH="100vh">
            {/* Minimalist Hero Section */}
            <Box
                pt={{ base: 12, md: 16 }}
                pb={{ base: 12, md: 16 }}
                position="relative"
            >
                <Container maxW="container.md" textAlign="center" position="relative" zIndex={1}>
                    <FadeUp>
                        <Stack spacing={6}>
                            <Heading
                                as="h1"
                                textStyle="h1"
                                color="gray.900"
                            >
                                Contacto
                            </Heading>
                            <Text fontSize="xl" color="gray.500" maxW="2xl" mx="auto" lineHeight="relaxed">
                                Estamos aquí para ayudarle. Escríbanos y un asesor de Sanjor se pondrá en contacto a la brevedad.
                            </Text>
                        </Stack>
                    </FadeUp>
                </Container>
            </Box>

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

                <Container maxW="container.xl" position="relative" zIndex={1}>
                    <SimpleGrid columns={{ base: 1, md: 2 }} spacing={12} pt={8}>
                        {/* Contact Form */}
                        <FadeUp delay={0.1}>
                            <Box layerStyle="premiumCard" p={{ base: 6, md: 10 }}>
                                <Heading size="md" mb={8} color="gray.900">Envíenos un mensaje</Heading>
                                <form onSubmit={handleSubmit} key={user?.id || 'guest'}>
                                    <Stack spacing={5}>
                                        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                                            <FormControl id="name" isRequired>
                                                <FormLabel color="gray.700" fontWeight="500" fontSize="sm">Nombre</FormLabel>
                                                <Input name="name" type="text" placeholder="Su nombre" defaultValue={user?.name || ''} bg="surface.50" border="1px solid" borderColor="surface.300" _focus={{ borderColor: 'brand.500', boxShadow: 'none' }} />
                                            </FormControl>
                                            <FormControl id="lastname">
                                                <FormLabel color="gray.700" fontWeight="500" fontSize="sm">Apellido</FormLabel>
                                                <Input name="lastname" type="text" placeholder="Su apellido" defaultValue={user?.last_name || ''} bg="surface.50" border="1px solid" borderColor="surface.300" _focus={{ borderColor: 'brand.500', boxShadow: 'none' }} />
                                            </FormControl>
                                        </SimpleGrid>

                                        <FormControl id="company">
                                            <FormLabel color="gray.700" fontWeight="500" fontSize="sm">Empresa / Institución</FormLabel>
                                            <Input name="company" type="text" placeholder="Nombre de su empresa" defaultValue={user?.company || ''} bg="surface.50" border="1px solid" borderColor="surface.300" _focus={{ borderColor: 'brand.500', boxShadow: 'none' }} />
                                        </FormControl>

                                        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                                            <FormControl>
                                                <FormLabel color="gray.700" fontWeight="500" fontSize="sm">Rubro / Sector</FormLabel>
                                                <Select name="rubro" placeholder="Seleccione..." defaultValue={user?.rubro || ''} bg="surface.50" border="1px solid" borderColor="surface.300" _focus={{ borderColor: 'brand.500', boxShadow: 'none' }}>
                                                    <option value="Alimenticia">Alimenticia</option>
                                                    <option value="Agropecuaria">Agropecuaria</option>
                                                    <option value="Laboratorio">Laboratorio</option>
                                                    <option value="Otros">Otros</option>
                                                </Select>
                                            </FormControl>
                                            <FormControl>
                                                <FormLabel color="gray.700" fontWeight="500" fontSize="sm">Cargo / Área</FormLabel>
                                                <Select name="cargo" placeholder="Seleccione..." defaultValue={user?.work_area || ''} bg="surface.50" border="1px solid" borderColor="surface.300" _focus={{ borderColor: 'brand.500', boxShadow: 'none' }}>
                                                    <option value="Dirección">Dirección</option>
                                                    <option value="Mantenimiento">Mantenimiento</option>
                                                    <option value="Laboratorio">Laboratorio</option>
                                                    <option value="Otro">Otro</option>
                                                </Select>
                                            </FormControl>
                                        </SimpleGrid>

                                        <SimpleGrid columns={{ base: 1, sm: 2 }} spacing={5}>
                                            <FormControl id="email" isRequired>
                                                <FormLabel color="gray.700" fontWeight="500" fontSize="sm">Email</FormLabel>
                                                <Input name="email" type="email" placeholder="email@ejemplo.com" defaultValue={user?.email || ''} readOnly={!!user?.email} bg="surface.50" border="1px solid" borderColor="surface.300" _focus={{ borderColor: 'brand.500', boxShadow: 'none' }} />
                                            </FormControl>
                                            <FormControl id="phone">
                                                <FormLabel color="gray.700" fontWeight="500" fontSize="sm">Teléfono</FormLabel>
                                                <Input name="phone" type="tel" placeholder="Cod. Área + Número" defaultValue={user?.phone || ''} bg="surface.50" border="1px solid" borderColor="surface.300" _focus={{ borderColor: 'brand.500', boxShadow: 'none' }} />
                                            </FormControl>
                                        </SimpleGrid>

                                        <FormControl id="message" isRequired>
                                            <FormLabel color="gray.700" fontWeight="500" fontSize="sm">Consulta / Mensaje</FormLabel>
                                            <Textarea name="message" placeholder="Escriba su consulta aquí..." rows={5} defaultValue={prefilledMessage} bg="surface.50" border="1px solid" borderColor="surface.300" _focus={{ borderColor: 'brand.500', boxShadow: 'none' }} />
                                        </FormControl>

                                        <Button
                                            type="submit"
                                            colorScheme="brand"
                                            size="lg"
                                            w="full"
                                            mt={2}
                                        >
                                            Enviar Mensaje
                                        </Button>
                                    </Stack>
                                </form>
                            </Box>
                        </FadeUp>

                        {/* Contact Info */}
                        <FadeUp delay={0.2}>
                            <Stack spacing={8} height="100%">
                                <Box layerStyle="premiumCard" p={{ base: 6, md: 10 }}>
                                    <Stack spacing={4}>
                                        <Heading size="md" color="gray.900" mb={2}>Información Corporativa</Heading>
                                        <Box>
                                            <Text fontWeight="600" color="brand.600" mb={1}>SAN JOR</Text>
                                            <Text fontSize="md" color="gray.600">Joaquín V. González 1115</Text>
                                            <Text fontSize="md" color="gray.600">B1651DJO San Martín</Text>
                                            <Text fontSize="md" color="gray.600">Buenos Aires - Argentina</Text>
                                        </Box>
                                    </Stack>
                                </Box>

                                {/* Google Map Embed */}
                                <Box
                                    layerStyle="premiumCard"
                                    h="100%"
                                    minH="300px"
                                    overflow="hidden"
                                    p={1}
                                >
                                    <Box borderRadius="xl" overflow="hidden" h="100%">
                                        <iframe
                                            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3286.068474246852!2d-58.5348889!3d-34.5518056!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x95bcb74a3414b8b5%3A0x918969614c739c19!2sJoaqu%C3%ADn%20V.%20Gonz%C3%A1lez%201115%2C%20B1651DJO%20San%20Mart%C3%ADn%2C%20Provincia%20de%20Buenos%20Aires!5e0!3m2!1ses!2sar!4v1700000000000!5m2!1ses!2sar"
                                            width="100%"
                                            height="100%"
                                            style={{ border: 0 }}
                                            allowFullScreen
                                            loading="lazy"
                                            referrerPolicy="no-referrer-when-downgrade"
                                        ></iframe>
                                    </Box>
                                </Box>
                            </Stack>
                        </FadeUp>
                    </SimpleGrid>
                </Container>
            </Box>
        </Box>
    );
}
