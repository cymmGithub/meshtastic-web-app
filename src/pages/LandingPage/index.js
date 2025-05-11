import React from 'react';
import { 
  Box, 
  Heading, 
  Text, 
  Button, 
  VStack, 
  Container, 
  Flex, 
  useColorModeValue,
  SimpleGrid,
  Icon,
  Badge,
  HStack,
  Spacer
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { FiUsers, FiShield, FiRadio, FiInfo, FiAlertTriangle, FiArrowRight } from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext.js';
import ThemeToggle from '../../components/ui/ThemeToggle.js';
import LanguageSelector from '../../components/ui/LanguageSelector.js';

const LandingPage = () => {
  const { t } = useLanguage();
  const bgColor = useColorModeValue('blue.50', 'blue.900');
  const cardBgColor = useColorModeValue('white', 'gray.800');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  
  return (
    <Box minH="100vh">
      {/* Header with language and theme switchers */}
      <Box as="header" py={4} px={4} bg={bgColor}>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex align="center" gap={2}>
            <Icon as={FiRadio} boxSize={6} color="blue.500" />
            <Heading as="h1" size={{ base: "md", md: "lg" }} color="blue.500">
              {t('appTitle')}
            </Heading>
          </Flex>
          <Flex gap={2}>
            <LanguageSelector />
            <ThemeToggle />
          </Flex>
        </Flex>
      </Box>
      
      {/* Main content */}
      <Container maxW="container.xl" py={6} px={4}>
        {/* Hero section */}
        <VStack spacing={8} textAlign="center" mb={10}>
          <Heading as="h2" size={{ base: "xl", md: "2xl" }}>
            {t('landingHeroTitle') || 'Emergency Mesh Communication'}
          </Heading>
          <Text fontSize={{ base: "md", md: "lg" }} maxW="800px">
            {t('landingHeroDescription') || 'A reliable, multilingual, and fully accessible communication platform for emergencies, disasters, and critical situations.'}
          </Text>
          
          {/* Enhanced Emergency status alert */}
          <Box 
            w="full" 
            bg="red.600" 
            color="white" 
            p={5}
            borderRadius="lg"
            boxShadow="0 4px 8px rgba(255, 0, 0, 0.2)"
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: 'absolute',
              top: 0,
              left: 0,
              right: 0,
              height: '4px',
              background: 'rgba(255, 255, 255, 0.5)',
            }}
          >
            <HStack spacing={4} align="flex-start">
              <Icon as={FiAlertTriangle} boxSize={10} color="white" />
              <Box>
                <HStack mb={1}>
                  <Badge 
                    colorScheme="red" 
                    bg="white" 
                    color="red.600" 
                    fontSize="sm" 
                    fontWeight="bold"
                    px={2}
                    py={1}
                    borderRadius="full"
                  >
                    {t('activeEmergencyAlert') || 'Active Emergency Alert'}
                  </Badge>
                  <Badge 
                    colorScheme="red" 
                    bg="white" 
                    color="red.600" 
                    fontSize="xs"
                    px={2}
                    borderRadius="full"
                  >
                    {new Date().toLocaleDateString()}
                  </Badge>
                </HStack>
                <Text fontWeight="bold" fontSize="lg" mb={1}>
                  {t('checkUserAppForDetails') || 'Check the user application for latest updates and instructions.'}
                </Text>
                <Text fontSize="sm">
                  {t('emergencyInstructions') || 'Follow official instructions and keep your device charged. Emergency services are responding.'}
                </Text>
              </Box>
            </HStack>
          </Box>
          
          {/* Enhanced Main action buttons */}
          <SimpleGrid columns={{ base: 1, md: 2 }} spacing={6} w="full" maxW="2xl">
            <Button 
              as={RouterLink} 
              to="/user" 
              size="lg" 
              colorScheme="blue"
              height="70px"
              width="100%"
              px={6}
              fontSize="md"
              borderRadius="xl"
              boxShadow="lg"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'xl',
              }}
              _active={{
                transform: 'translateY(0)',
                boxShadow: 'md',
              }}
              transition="all 0.2s"
            >
              <HStack w="100%" justifyContent="space-between">
                <Flex align="center">
                  <Icon as={FiUsers} boxSize={6} mr={3} />
                  <Text fontWeight="bold">{t('enterUserApp') || 'Enter User App'}</Text>
                </Flex>
                <Icon as={FiArrowRight} boxSize={5} />
              </HStack>
            </Button>
            
            <Button 
              as={RouterLink} 
              to="/admin" 
              size="lg" 
              colorScheme="purple"
              height="70px"
              width="100%"
              px={6}
              fontSize="md"
              borderRadius="xl"
              boxShadow="lg"
              _hover={{
                transform: 'translateY(-2px)',
                boxShadow: 'xl',
              }}
              _active={{
                transform: 'translateY(0)',
                boxShadow: 'md',
              }}
              transition="all 0.2s"
            >
              <HStack w="100%" justifyContent="space-between">
                <Flex align="center">
                  <Icon as={FiShield} boxSize={6} mr={3} />
                  <Text fontWeight="bold">{t('enterAdminPanel') || 'Enter Admin Panel'}</Text>
                </Flex>
                <Icon as={FiArrowRight} boxSize={5} />
              </HStack>
            </Button>
          </SimpleGrid>
        </VStack>
        
        {/* Key features */}
        <Box mb={10}>
          <Heading as="h3" size="lg" mb={5} textAlign="center">
            {t('keyFeatures') || 'Key Features'}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {[
              {
                icon: FiRadio,
                title: t('meshNetworking') || 'Mesh Networking',
                description: t('meshNetworkingDescription') || 'Works even when traditional networks are down through decentralized mesh technology.'
              },
              {
                icon: FiInfo,
                title: t('multilingualSupport') || 'Multilingual Support',
                description: t('multilingualSupportDescription') || 'Automatic translation between Polish, Ukrainian, Russian and English.'
              },
              {
                icon: FiUsers,
                title: t('accessibility') || 'Full Accessibility',
                description: t('accessibilityDescription') || 'Text-to-speech, voice input, and other accessibility features for all users.'
              }
            ].map((feature, idx) => (
              <Box
                key={idx}
                p={5}
                borderRadius="lg"
                boxShadow="md"
                bg={cardBgColor}
                borderWidth="1px"
                borderColor={borderColor}
                textAlign="center"
              >
                <Icon as={feature.icon} boxSize={10} color="blue.500" mb={4} />
                <Heading as="h4" size="md" mb={2}>
                  {feature.title}
                </Heading>
                <Text>
                  {feature.description}
                </Text>
              </Box>
            ))}
          </SimpleGrid>
        </Box>
        
        {/* Offline instructions */}
        <Box 
          p={5} 
          borderRadius="lg" 
          bg={cardBgColor}
          borderWidth="1px"
          borderColor={borderColor}
          mb={6}
        >
          <Heading as="h3" size="md" mb={3}>
            {t('offlineAccess') || 'Offline Access Instructions'}
          </Heading>
          <Text mb={3}>
            {t('offlineInstructions') || 'This app can work offline when installed. To install:'}
          </Text>
          <VStack align="start" spacing={2}>
            <Text>• {t('offlineStep1') || 'Open app in Chrome or Safari'}</Text>
            <Text>• {t('offlineStep2') || 'Open browser menu and select "Add to Home Screen"'}</Text>
            <Text>• {t('offlineStep3') || 'The app will now be available even without internet'}</Text>
          </VStack>
        </Box>
      </Container>
      
      {/* Footer */}
      <Box as="footer" py={4} px={4} bg={bgColor} textAlign="center">
        <Text fontSize="sm">
          {t('footerText') || '© 2025 Emergency Mesh Communication System'}
        </Text>
      </Box>
    </Box>
  );
};

export default LandingPage; 