import React from "react";
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
  Image,
  Link,
} from "@chakra-ui/react";
import { Link as RouterLink } from "react-router-dom";
import {
  FiUsers,
  FiShield,
  FiRadio,
  FiInfo,
  FiAlertTriangle,
  FiArrowRight,
} from "react-icons/fi";
import { useLanguage } from "../../i18n/LanguageContext.js";
import ThemeToggle from "../../components/ui/ThemeToggle.js";
import LanguageSelector from "../../components/ui/LanguageSelector.js";

const LandingPage = () => {
  const { t } = useLanguage();
  const bgColor = useColorModeValue("blue.50", "blue.900");
  const cardBgColor = useColorModeValue("white", "gray.800");
  const borderColor = useColorModeValue("gray.200", "gray.700");

  return (
    <Box minH="100vh">
      {/* Header with language and theme switchers */}
      <Box as="header" py={4} px={4} bg={bgColor}>
        <Flex justifyContent="space-between" alignItems="center">
          <Flex align="center" gap={2}>
            <Icon as={FiRadio} boxSize={6} color="blue.500" />
            <Heading as="h1" size={{ base: "md", md: "lg" }} color="blue.500">
              {t("appTitle")}
            </Heading>
          </Flex>

          {/* Spacer flex to push items to the right */}
          <Flex flex={1}></Flex>

          {/* Navigation links moved more to the right */}
          <Flex
            display={{ base: "none", md: "flex" }}
            gap={6}
            align="center"
            mr={6}
          >
            <Link
              as={RouterLink}
              to="/user"
              fontWeight="medium"
              color="blue.600"
              _hover={{
                textDecoration: "none",
                color: "blue.800",
              }}
              display="flex"
              alignItems="center"
            >
              <Icon as={FiUsers} boxSize={4} mr={2} />
              {t("userDashboard")}
            </Link>

            <Link
              as={RouterLink}
              to="/admin"
              fontWeight="medium"
              color="purple.600"
              _hover={{
                textDecoration: "none",
                color: "purple.800",
              }}
              display="flex"
              alignItems="center"
            >
              <Icon as={FiShield} boxSize={4} mr={2} />
              {t("adminDashboard")}
            </Link>
          </Flex>

          <Flex gap={2}>
            <LanguageSelector />
            <ThemeToggle />
          </Flex>
        </Flex>
      </Box>

      {/* Main content */}
      <Container maxW="container.xl" py={6} px={4}>
        {/* Hero section with image on top for mobile, side-by-side on desktop */}
        <Flex 
          direction={{ base: "column", lg: "row" }} 
          mb={10} 
          borderRadius="xl" 
          overflow="hidden" 
          boxShadow="xl"
          bg={cardBgColor}
        >
          {/* Order is reversed on mobile: image first, then text */}
          
          {/* Image (top on mobile, right on desktop) */}
          <Box 
            flex={{ lg: 1 }}
            h={{ base: "250px", md: "300px", lg: "auto" }}
            position="relative"
            order={{ base: 1, lg: 2 }}
          >
            <Image 
              src="/main-photo.png"
              alt={
                t("heroImageAlt") ||
                "People connected in a communication network"
              }
              objectFit="cover"
              w="100%"
              h="100%"
            />
          </Box>
          
          {/* Text content (below image on mobile, left on desktop) */}
          <Flex 
            direction="column" 
            justify="center"
            p={{ base: 6, md: 10 }} 
            flex={{ lg: 1 }}
            zIndex={2}
            order={{ base: 2, lg: 1 }}
          >
            <Heading
              as="h2"
              size={{ base: "xl", md: "2xl" }}
              mb={3}
              color={useColorModeValue("gray.800", "white")}
            >
              {t("landingHeroTitle") || "Emergency Mesh Communication"}
            </Heading>
            <Text
              fontSize={{ base: "md", md: "lg" }}
              mb={6}
              color={useColorModeValue("gray.600", "gray.300")}
            >
              {t("landingHeroDescription") ||
                "A reliable, multilingual, and fully accessible communication platform for emergencies, disasters, and critical situations."}
            </Text>

            {/* CTA Button */}
            <Button
              as={RouterLink}
              to="/user"
              size="lg"
              colorScheme="blue"
              width="100%"
              height="60px"
              px={6}
              fontSize="lg"
              fontWeight="bold"
              mb={4}
              borderRadius="md"
              boxShadow="md"
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              _active={{
                transform: "translateY(0)",
              }}
              transition="all 0.2s"
            >
              <HStack w="100%" justifyContent="space-between">
                <Flex align="center">
                  <Icon as={FiUsers} boxSize={5} mr={3} />
                  <Text>{t("enterUserApp")}</Text>
                </Flex>
                <Icon as={FiArrowRight} boxSize={5} />
              </HStack>
            </Button>

            {/* Secondary CTA for Admin */}
            <Flex
              as={RouterLink}
              to="/admin"
              align="center"
              color="purple.500"
              fontWeight="medium"
              _hover={{
                textDecoration: "none",
                color: "purple.600",
              }}
            >
              <Icon as={FiShield} boxSize={4} mr={2} />
              <Text>{t("enterAdminPanel")}</Text>
              <Icon as={FiArrowRight} boxSize={4} ml={2} />
            </Flex>
          </Flex>
        </Flex>

        {/* VStack for the rest of the content */}
        <VStack spacing={8} textAlign="center" mb={10}>
          {/* Enhanced Emergency status alert */}
          <Box
            w="full"
            bg="red.600"
            color="white"
            p={{ base: 3, md: 5 }}
            borderRadius="lg"
            boxShadow="0 4px 8px rgba(255, 0, 0, 0.2)"
            position="relative"
            overflow="hidden"
            _before={{
              content: '""',
              position: "absolute",
              top: 0,
              left: 0,
              right: 0,
              height: "4px",
              background: "rgba(255, 255, 255, 0.5)",
            }}
          >
            <Flex
              direction={{ base: "column", sm: "row" }}
              spacing={{ base: 2, sm: 4 }}
              align={{ base: "center", sm: "flex-start" }}
            >
              <Icon
                as={FiAlertTriangle}
                boxSize={{ base: 8, md: 10 }}
                color="white"
                mr={{ base: 0, sm: 4 }}
                mb={{ base: 2, sm: 0 }}
              />
              <Box textAlign={{ base: "center", sm: "left" }}>
                <Flex
                  direction={{ base: "column", sm: "row" }}
                  mb={1}
                  gap={2}
                  align={{ base: "center", sm: "flex-start" }}
                >
                  <Badge
                    colorScheme="red"
                    bg="white"
                    color="red.600"
                    fontSize={{ base: "xs", md: "sm" }}
                    fontWeight="bold"
                    px={2}
                    py={1}
                    borderRadius="full"
                  >
                    {t("activeEmergencyAlert") || "Active Emergency Alert"}
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
                </Flex>
                <Text
                  fontWeight="bold"
                  fontSize={{ base: "md", md: "lg" }}
                  mb={1}
                  lineHeight="1.4"
                >
                  {t("checkUserAppForDetails") ||
                    "Check the user application for latest updates and instructions."}
                </Text>
                <Text fontSize={{ base: "xs", md: "sm" }} lineHeight="1.4">
                  {t("emergencyInstructions") ||
                    "Follow official instructions and keep your device charged. Emergency services are responding."}
                </Text>
              </Box>
            </Flex>
          </Box>

          {/* Additional CTA above Key Features */}
          <Box w="full" maxW="md" mx="auto" my={6}>
            <Button
              as={RouterLink}
              to="/user"
              size="lg"
              colorScheme="blue"
              width="100%"
              height="60px"
              px={6}
              fontSize="lg"
              fontWeight="bold"
              borderRadius="md"
              boxShadow="md"
              leftIcon={<Icon as={FiUsers} boxSize={5} />}
              rightIcon={<Icon as={FiArrowRight} boxSize={5} />}
              _hover={{
                transform: "translateY(-2px)",
                boxShadow: "lg",
              }}
              _active={{
                transform: "translateY(0)",
              }}
              transition="all 0.2s"
            >
              {t("enterUserApp")}
            </Button>
          </Box>
        </VStack>

        {/* Key features */}
        <Box mb={10}>
          <Heading as="h3" size="lg" mb={5} textAlign="center">
            {t("keyFeatures") || "Key Features"}
          </Heading>
          <SimpleGrid columns={{ base: 1, md: 3 }} spacing={6}>
            {[
              {
                icon: FiRadio,
                title: t("meshNetworking") || "Mesh Networking",
                description:
                  t("meshNetworkingDescription") ||
                  "Works even when traditional networks are down through decentralized mesh technology.",
              },
              {
                icon: FiInfo,
                title: t("multilingualSupport") || "Multilingual Support",
                description:
                  t("multilingualSupportDescription") ||
                  "Automatic translation between Polish, Ukrainian, Russian and English.",
              },
              {
                icon: FiUsers,
                title: t("accessibility") || "Full Accessibility",
                description:
                  t("accessibilityDescription") ||
                  "Text-to-speech, voice input, and other accessibility features for all users.",
              },
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
                <Text>{feature.description}</Text>
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
            {t("offlineAccess") || "Offline Access Instructions"}
          </Heading>
          <Text mb={3}>
            {t("offlineInstructions") ||
              "This app can work offline when installed. To install:"}
          </Text>
          <VStack align="start" spacing={2}>
            <Text>• {t("offlineStep1") || "Open app in Chrome or Safari"}</Text>
            <Text>
              •{" "}
              {t("offlineStep2") ||
                'Open browser menu and select "Add to Home Screen"'}
            </Text>
            <Text>
              •{" "}
              {t("offlineStep3") ||
                "The app will now be available even without internet"}
            </Text>
          </VStack>
        </Box>
      </Container>

      {/* Footer */}
      <Box as="footer" py={4} px={4} bg={bgColor} textAlign="center">
        <Text fontSize="sm">
          {t("footerText") || "© 2025 Emergency Mesh Communication System"}
        </Text>
      </Box>
    </Box>
  );
};

export default LandingPage;
