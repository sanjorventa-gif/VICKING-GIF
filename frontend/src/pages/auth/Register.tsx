import {
    Flex,
    Box,
    FormControl,
    FormLabel,
    Input,
    Stack,
    Button,
    Heading,
    Text,
    useColorModeValue,
    useToast,
    Select,
    Checkbox,
    SimpleGrid,
} from '@chakra-ui/react';
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../../context/AuthContext';

export default function Register() {
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        confirmPassword: '',
        role: 'usuario_nacional',
        newsletter_subscribed: false,
        name: '',
        last_name: '',
        company: '',
        phone: '',
        city: '',
        province: '',
        country: '',
        rubro: '',
        work_area: '',
    });
    const { register, isLoading } = useAuth();
    const navigate = useNavigate();
    const toast = useToast();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
        const value = e.target.type === 'checkbox' ? (e.target as HTMLInputElement).checked : e.target.value;
        setFormData({
            ...formData,
            [e.target.name]: value,
        });
    };

    const handleSubmit = async () => {
        if (formData.password !== formData.confirmPassword) {
            toast({
                title: 'Error',
                description: 'Las contraseñas no coinciden.',
                status: 'error',
                duration: 3000,
                isClosable: true,
            });
            return;
        }

        // Create the data object for API, excluding confirmPassword
        const { confirmPassword, ...registerData } = formData;

        const { success, error } = await register(registerData);
        if (success) {
            toast({
                title: 'Registro Exitoso',
                description: 'Bienvenido a VICKING. Ya puede iniciar sesión.',
                status: 'success',
                duration: 5000,
                isClosable: true,
            });
            navigate('/registro-exitoso');
        } else {
            toast({
                title: 'Error en el Registro',
                description: error || 'No se pudo crear la cuenta. Intente nuevamente.',
                status: 'error',
                duration: 5000,
                isClosable: true,
            });
        }
    };

    return (
        <Flex
            minH={'100vh'}
            align={'center'}
            justify={'center'}
            bg={useColorModeValue('gray.50', 'gray.800')}
            py={12}
        >
            <Stack spacing={8} mx={'auto'} maxW={'5xl'} px={6} w="full">
                <SimpleGrid columns={{ base: 1, lg: 2 }} spacing={8} alignItems="start">
                    {/* Left Column: Benefits - Compact */}
                    <Box pt={4}>
                        <Heading fontSize={'3xl'} mb={2}>Únase a VICKING</Heading>
                        <Text fontSize={'md'} color={'gray.600'} mb={6}>
                            Gestión integral de sus equipos.
                        </Text>

                        <Box bg="white" p={6} rounded="lg" shadow="sm" borderLeft="4px solid" borderColor="brand.500">
                            <Heading size="sm" mb={4} color="brand.600">
                                Beneficios exclusivos
                            </Heading>
                            <Stack spacing={3}>
                                <Flex align="center">
                                    <Box as="span" color="green.500" mr={2}>✓</Box>
                                    <Text fontSize="sm"><b>Agilidad:</b> Autocompletado de datos.</Text>
                                </Flex>
                                <Flex align="center">
                                    <Box as="span" color="green.500" mr={2}>✓</Box>
                                    <Text fontSize="sm"><b>Seguimiento:</b> Estado de reparaciones en tiempo real.</Text>
                                </Flex>
                                <Flex align="center">
                                    <Box as="span" color="green.500" mr={2}>✓</Box>
                                    <Text fontSize="sm"><b>Historial:</b> Registro de intervenciones.</Text>
                                </Flex>
                            </Stack>
                        </Box>
                    </Box>

                    {/* Right Column: Form */}
                    <Box
                        rounded={'lg'}
                        bg={useColorModeValue('white', 'gray.700')}
                        boxShadow={'lg'}
                        p={6}
                    >
                        <Stack align={'center'} mb={4}>
                            <Heading fontSize={'xl'}>Crear Cuenta</Heading>
                        </Stack>

                        <Stack spacing={4}>
                            <FormControl id="role" isRequired>
                                <FormLabel fontSize="sm">Tipo de Cuenta</FormLabel>
                                <Select name="role" size="sm" value={formData.role} onChange={handleChange}>
                                    <option value="usuario_nacional">Usuario</option>
                                    <option value="distribuidor_nacional">Distribuidor</option>
                                </Select>
                            </FormControl>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                <FormControl id="name" isRequired>
                                    <FormLabel fontSize="sm">Nombre</FormLabel>
                                    <Input type="text" size="sm" name="name" value={formData.name} onChange={handleChange} />
                                </FormControl>
                                <FormControl id="last_name" isRequired>
                                    <FormLabel fontSize="sm">Apellidos</FormLabel>
                                    <Input type="text" size="sm" name="last_name" value={formData.last_name} onChange={handleChange} />
                                </FormControl>
                            </SimpleGrid>

                            <FormControl id="company">
                                <FormLabel fontSize="sm">Empresa / Institución</FormLabel>
                                <Input type="text" size="sm" name="company" value={formData.company} onChange={handleChange} />
                            </FormControl>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                <FormControl id="email" isRequired>
                                    <FormLabel fontSize="sm">Email</FormLabel>
                                    <Input type="email" size="sm" name="email" value={formData.email} onChange={handleChange} />
                                </FormControl>
                                <FormControl id="phone" isRequired>
                                    <FormLabel fontSize="sm">Teléfono</FormLabel>
                                    <Input type="tel" size="sm" name="phone" value={formData.phone} onChange={handleChange} />
                                </FormControl>
                            </SimpleGrid>

                            <SimpleGrid columns={{ base: 1, md: 3 }} spacing={4}>
                                <FormControl id="city" isRequired>
                                    <FormLabel fontSize="sm">Ciudad</FormLabel>
                                    <Input type="text" size="sm" name="city" value={formData.city} onChange={handleChange} />
                                </FormControl>
                                <FormControl id="province" isRequired>
                                    <FormLabel fontSize="sm">Provincia</FormLabel>
                                    <Input type="text" size="sm" name="province" value={formData.province} onChange={handleChange} />
                                </FormControl>
                                <FormControl id="country" isRequired>
                                    <FormLabel fontSize="sm">País</FormLabel>
                                    <Input type="text" size="sm" name="country" value={formData.country} onChange={handleChange} />
                                </FormControl>
                            </SimpleGrid>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                <FormControl id="rubro">
                                    <FormLabel fontSize="sm">Rubro</FormLabel>
                                    <Select name="rubro" size="sm" placeholder="Seleccione..." value={formData.rubro} onChange={handleChange}>
                                        <option value="Alimenticia">Alimenticia</option>
                                        <option value="Agropecuaria">Agropecuaria</option>
                                        <option value="Avícola">Avícola</option>
                                        <option value="Clínica">Clínica</option>
                                        <option value="Cosmética">Cosmética</option>
                                        <option value="Esterilización">Esterilización</option>
                                        <option value="Farmacéutica">Farmacéutica</option>
                                        <option value="Higiene">Higiene</option>
                                        <option value="Hospital">Hospital</option>
                                        <option value="Industria">Industria</option>
                                        <option value="Investigación">Investigación</option>
                                        <option value="Laboratorio">Laboratorio</option>
                                        <option value="Odontología">Odontología</option>
                                        <option value="Petroquímica">Petroquímica</option>
                                        <option value="Sanatorio">Sanatorio</option>
                                        <option value="Veterinaria">Veterinaria</option>
                                        <option value="Otros">Otros</option>
                                    </Select>
                                </FormControl>
                                <FormControl id="work_area">
                                    <FormLabel fontSize="sm">Área</FormLabel>
                                    <Select name="work_area" size="sm" placeholder="Seleccione..." value={formData.work_area} onChange={handleChange}>
                                        <option value="Control de Calidad">Control de Calidad</option>
                                        <option value="Investigación y Desarrollo">Investigación y Desarrollo</option>
                                        <option value="Laboratorio Científico">Laboratorio Científico</option>
                                        <option value="Laboratorio Industrial">Laboratorio Industrial</option>
                                        <option value="Producción">Producción</option>
                                        <option value="Otro">Otro</option>
                                    </Select>
                                </FormControl>
                            </SimpleGrid>

                            <SimpleGrid columns={{ base: 1, md: 2 }} spacing={4}>
                                <FormControl id="password" isRequired>
                                    <FormLabel fontSize="sm">Contraseña</FormLabel>
                                    <Input
                                        type="password"
                                        size="sm"
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                                <FormControl id="confirmPassword" isRequired>
                                    <FormLabel fontSize="sm">Confirmar</FormLabel>
                                    <Input
                                        type="password"
                                        size="sm"
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                    />
                                </FormControl>
                            </SimpleGrid>

                            <FormControl id="newsletter">
                                <Checkbox
                                    name="newsletter_subscribed"
                                    isChecked={formData.newsletter_subscribed}
                                    onChange={handleChange}
                                    colorScheme="brand"
                                    size="sm"
                                >
                                    Recibir novedades (Newsletter)
                                </Checkbox>
                            </FormControl>

                            <Stack pt={2}>
                                <Button
                                    loadingText="Registrando"
                                    size="md"
                                    bg={'brand.500'}
                                    color={'white'}
                                    _hover={{
                                        bg: 'brand.400',
                                    }}
                                    onClick={handleSubmit}
                                    isLoading={isLoading}
                                >
                                    Registrarse
                                </Button>
                            </Stack>
                            <Stack pt={2}>
                                <Text align={'center'} fontSize="sm">
                                    ¿Ya tiene una cuenta? <Text as="span" color={'brand.500'} cursor="pointer" onClick={() => navigate('/login')}>Iniciar Sesión</Text>
                                </Text>
                            </Stack>
                        </Stack>
                    </Box>
                </SimpleGrid>
            </Stack>
        </Flex>
    );
}
