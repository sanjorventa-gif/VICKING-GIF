import { extendTheme, type ThemeConfig } from '@chakra-ui/react';

const config: ThemeConfig = {
    initialColorMode: 'light',
    useSystemColorMode: false,
};

const colors = {
    brand: {
        50: '#ECECFA',
        100: '#C8C9E6',
        200: '#A4A6D2',
        300: '#7F83BF',
        400: '#5B60AB',
        500: '#3E4095', // Primary Brand Color
        600: '#2F3175',
        700: '#212254',
        800: '#121333',
        900: '#040412',
    },
    blue: {
        50: '#ECECFA',
        100: '#C8C9E6',
        200: '#A4A6D2',
        300: '#7F83BF',
        400: '#5B60AB',
        500: '#3E4095',
        600: '#2F3175',
        700: '#212254',
        800: '#121333',
        900: '#040412',
    },
    surface: {
        50: '#FDFDFE',
        100: '#F9FAFB',
        200: '#F3F4F6',
        300: '#E5E7EB',
        border: 'rgba(0, 0, 0, 0.08)',
    },
    gray: {
        50: '#f7fafc',
        100: '#edf2f7',
        200: '#e2e8f0',
        300: '#cbd5e0',
        400: '#a0aec0',
        500: '#718096',
        600: '#4a5568',
        700: '#2d3748',
        800: '#1a202c',
        900: '#171923',
    },
};

const styles = {
    global: {
        body: {
            bg: 'surface.50',
            color: 'gray.800',
            WebkitTapHighlightColor: 'transparent',
        },
        '::selection': {
            bg: 'brand.100',
            color: 'brand.900',
        },
    },
};

const layerStyles = {
    glass: {
        bg: 'rgba(255, 255, 255, 0.7)',
        backdropFilter: 'blur(12px)',
        WebkitBackdropFilter: 'blur(12px)',
        border: '1px solid',
        borderColor: 'whiteAlpha.600',
        boxShadow: '0 4px 30px rgba(0, 0, 0, 0.05)',
        borderRadius: '2xl',
    },
    premiumCard: {
        bg: 'white',
        border: '1px solid',
        borderColor: 'surface.border',
        boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05), 0 2px 4px -2px rgba(0, 0, 0, 0.05)',
        borderRadius: '2xl',
        transition: 'all 0.3s cubic-bezier(0.4, 0, 0.2, 1)',
        _hover: {
            transform: 'translateY(-2px)',
            boxShadow: '0 12px 20px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.05)',
        }
    }
};

const fonts = {
    heading: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
    body: `'Inter', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif`,
};

const fontSizes = {
    xs: '0.75rem',
    sm: '0.875rem',
    md: '1rem',
    lg: '1.125rem',
    xl: '1.25rem',
    '2xl': '1.35rem',
    '3xl': '1.5rem',
    '4xl': '1.75rem',
    '5xl': '2rem',
    '6xl': '2.25rem',
    '7xl': '2.625rem',
    '8xl': '3rem',
    '9xl': '3.5rem',
};

const textStyles = {
    h1: {
        fontSize: ['4xl', '5xl', '6xl'],
        fontWeight: '800',
        lineHeight: '1.1',
        letterSpacing: '-0.02em',
    },
    h2: {
        fontSize: ['3xl', '4xl', '5xl'],
        fontWeight: '700',
        lineHeight: '1.2',
        letterSpacing: '-0.01em',
    },
    subtitle: {
        fontSize: ['lg', 'xl'],
        fontWeight: '400',
        lineHeight: '1.6',
        color: 'gray.600',
    }
};

const components = {
    Button: {
        baseStyle: {
            fontWeight: '600',
            borderRadius: 'lg',
            transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
        },
        variants: {
            solid: (props: any) => ({
                bg: props.colorScheme === 'brand' ? 'brand.500' : undefined,
                color: 'white',
                _hover: {
                    bg: props.colorScheme === 'brand' ? 'brand.600' : undefined,
                    transform: 'translateY(-1px)',
                    boxShadow: 'md',
                },
                _active: {
                    transform: 'translateY(0)',
                }
            }),
            ghost: {
                _hover: {
                    bg: 'surface.100',
                }
            }
        },
    },
    Container: {
        baseStyle: {
            maxW: 'container.xl',
            px: { base: 6, md: 8, lg: 12 },
        },
    },
    Heading: {
        baseStyle: {
            letterSpacing: '-0.02em',
        }
    }
};

const theme = extendTheme({
    config,
    colors,
    styles,
    layerStyles,
    textStyles,
    fonts,
    fontSizes,
    components
});

export default theme;
