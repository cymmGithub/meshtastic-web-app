import { extendTheme } from '@chakra-ui/react';

// Crisis communication color theme - focused on accessibility, trust, and alert states
const colors = {
  // Primary blue - trustworthy, official, government
  blue: {
    50: '#e6f1ff',
    100: '#c8dcff',
    200: '#9abbf5',
    300: '#6c9ae8',
    400: '#4178d4', // Main primary blue - passes contrast tests
    500: '#2c5cbe', // Deeper blue for actions/buttons
    600: '#234b9a',
    700: '#1a3976',
    800: '#122852',
    900: '#0a1a30',
  },
  // Warning/alert orange - for notifications and warnings
  orange: {
    50: '#fff8e6',
    100: '#ffe9bc',
    200: '#ffd78f',
    300: '#ffc462',
    400: '#ffb039', // Alert orange - high visibility
    500: '#f09000', // Warning state
    600: '#dd7500',
    700: '#b35c00',
    800: '#8a4600',
    900: '#663300',
  },
  // Danger/critical red - for emergencies
  red: {
    50: '#ffe5e5',
    100: '#fcbdbd',
    200: '#f79292',
    300: '#f26868',
    400: '#e64545', // Critical alerts - passes contrast tests
    500: '#d12a2a', // Emergency state
    600: '#b01d1d',
    700: '#8d1515',
    800: '#6b0f0f',
    900: '#4a0909',
  },
  // Success/green - for confirmations, safe status
  green: {
    50: '#e4fbeb',
    100: '#c3efd0',
    200: '#9ee2b5',
    300: '#78d598',
    400: '#4fc97d', // Success green - passes contrast tests
    500: '#38b05f', // Confirmed/safe status
    600: '#2c9049',
    700: '#217038',
    800: '#175028',
    900: '#0c3017',
  },
};

// Semantic token mapping
const semanticTokens = {
  colors: {
    // Map semantic usage to our color palette
    primary: {
      default: 'blue.500',
      _dark: 'blue.400',
    },
    secondary: {
      default: 'orange.500',
      _dark: 'orange.400',
    },
    warning: {
      default: 'orange.500',
      _dark: 'orange.400',
    },
    danger: {
      default: 'red.500',
      _dark: 'red.400',
    },
    success: {
      default: 'green.500',
      _dark: 'green.400',
    },
    background: {
      default: 'white',
      _dark: 'gray.900',
    },
    card: {
      default: 'white',
      _dark: 'gray.800',
    },
    border: {
      default: 'gray.200',
      _dark: 'gray.700',
    },
  },
};

// Base component styles with accessibility focus
const components = {
  Button: {
    baseStyle: {
      fontWeight: 600,
      borderRadius: 'md',
      _focus: {
        boxShadow: '0 0 0 3px var(--chakra-colors-blue-300)',
      },
    },
    variants: {
      solid: {
        bg: 'blue.500',
        color: 'white',
        _hover: {
          bg: 'blue.600',
        },
        _active: {
          bg: 'blue.700',
        },
      },
      warning: {
        bg: 'orange.500',
        color: 'white',
        _hover: {
          bg: 'orange.600',
        },
      },
      critical: {
        bg: 'red.500',
        color: 'white',
        _hover: {
          bg: 'red.600',
        },
      },
      success: {
        bg: 'green.500',
        color: 'white',
        _hover: {
          bg: 'green.600',
        },
      },
    },
  },
  Input: {
    defaultProps: {
      focusBorderColor: 'blue.400',
    },
  },
  Select: {
    baseStyle: {
      field: {
        bg: 'white',
        _dark: {
          bg: 'gray.700',
        },
        borderRadius: 'md',
        _focus: {
          borderColor: 'blue.400',
          boxShadow: '0 0 0 1px var(--chakra-colors-blue-400)',
        },
      },
      icon: {
        color: 'gray.500',
        _dark: {
          color: 'gray.300',
        },
      }
    },
    variants: {
      filled: {
        field: {
          borderWidth: '1px',
          borderColor: 'gray.200',
          _dark: {
            borderColor: 'gray.600',
            bg: 'gray.700',
          },
          _hover: {
            borderColor: 'gray.300',
            _dark: {
              borderColor: 'gray.500',
            }
          }
        }
      },
      outline: {
        field: {
          borderWidth: '1px',
          borderColor: 'gray.200',
          _dark: {
            borderColor: 'gray.600',
          },
          _hover: {
            borderColor: 'blue.300',
          }
        }
      }
    },
    defaultProps: {
      focusBorderColor: 'blue.400',
      variant: 'outline'
    },
  },
  Textarea: {
    defaultProps: {
      focusBorderColor: 'blue.400',
    },
  },
};

// Enhanced theme for better readability
const theme = extendTheme({
  colors,
  semanticTokens,
  components,
  fonts: {
    heading: 'system-ui, -apple-system, sans-serif',
    body: 'system-ui, -apple-system, sans-serif',
  },
  fontSizes: {
    xs: '0.8rem',
    sm: '0.95rem',
    md: '1.1rem',
    lg: '1.25rem',
    xl: '1.5rem',
    '2xl': '1.75rem',
    '3xl': '2rem',
    '4xl': '2.5rem',
  },
  // Increase default line heights for better readability
  lineHeights: {
    normal: '1.6',
    tall: '1.8',
  },
  // Responsive breakpoints - mobile first
  breakpoints: {
    sm: '30em',    // 480px
    md: '48em',    // 768px
    lg: '62em',    // 992px
    xl: '80em',    // 1280px
    '2xl': '96em', // 1536px
  },
  // Default color mode config
  config: {
    initialColorMode: 'system',
    useSystemColorMode: true,
  },
});

export default theme; 