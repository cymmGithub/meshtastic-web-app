import React, { useState } from 'react';
import {
  Box,
  Container,
  Flex,
  Heading,
  useColorModeValue,
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
  Grid,
  GridItem,
  Button,
  Icon,
  FormControl,
  FormLabel,
  Input,
  Textarea,
  Select,
  VStack,
  Text,
  Badge,
  HStack,
  useToast,
  Divider,
  Card,
  CardHeader,
  CardBody,
  Stat,
  StatLabel,
  StatNumber,
  StatHelpText,
  SimpleGrid,
  Alert,
  AlertIcon
} from '@chakra-ui/react';
import { Link as RouterLink } from 'react-router-dom';
import { 
  FiArrowLeft, 
  FiSend, 
  FiRadio,
  FiUsers,
  FiPackage,
  FiAlertTriangle,
  FiList,
  FiActivity,
  FiDatabase,
  FiPlus
} from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext.js';
import LanguageSelector from '../../components/ui/LanguageSelector.js';
import ThemeToggle from '../../components/ui/ThemeToggle.js';
import { SkipLink } from '../../components/accessibility/index.js';
import { categories } from '../../utils/templateData.js';

// Mock data for testing
const mockNodes = [
  { id: 'node-1', name: t => t('northDistrict') || 'North District Hub', status: 'online', users: 24, battery: 86, signal: 'good' },
  { id: 'node-2', name: t => t('centralDistrict') || 'Central Square', status: 'online', users: 18, battery: 52, signal: 'signalMedium' },
  { id: 'node-3', name: t => t('eastDistrict') || 'East Hospital', status: 'offline', users: 0, battery: 23, signal: 'poor' },
  { id: 'node-4', name: t => t('schoolZone') || 'School Zone', status: 'online', users: 12, battery: 78, signal: 'good' }
];

const mockTemplates = [
  { id: 'tpl-1', name: 'evacuationAlert', category: 'evacuation', priority: 'high', usageCount: 14 },
  { id: 'tpl-2', name: 'medicalAidAvailable', category: 'medicalEmergency', priority: 'medium', usageCount: 8 },
  { id: 'tpl-3', name: 'powerOutageUpdate', category: 'infrastructure', priority: 'low', usageCount: 22 },
  { id: 'tpl-4', name: 'foodDistribution', category: 'resources', priority: 'medium', usageCount: 19 }
];

const AdminDashboard = () => {
  const { t, language } = useLanguage();
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [messageCategory, setMessageCategory] = useState('');
  const [messagePriority, setMessagePriority] = useState('medium');
  const [targetAudience, setTargetAudience] = useState('all');
  const toast = useToast();

  // Theme-aware colors
  const bgColor = useColorModeValue('white', 'gray.900');
  const headerBgColor = useColorModeValue('blue.50', 'blue.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const tabBgColor = useColorModeValue('white', 'gray.800');
  const statsCardBg = useColorModeValue('blue.50', 'blue.900');
  const cardHeaderBg = useColorModeValue('gray.50', 'gray.700');
  const logsBg = useColorModeValue('gray.50', 'gray.800');
  
  // Stats overview (mock data)
  const stats = {
    activeNodes: 12,
    onlineUsers: 56,
    pendingMessages: 8,
    batteryAvg: 64
  };
  
  // Form handlers
  const handleBroadcast = () => {
    if (!broadcastMessage.trim() || !messageCategory || !messagePriority) {
      toast({
        title: t('formIncomplete') || 'Form Incomplete',
        description: t('pleaseCompleteAllFields') || 'Please complete all required fields',
        status: 'error',
        duration: 5000,
        isClosable: true,
      });
      return;
    }
    
    toast({
      title: t('messageBroadcasted') || 'Message Broadcasted',
      description: t('messageHasBeenSent') || 'Your message has been sent to all recipients',
      status: 'success',
      duration: 5000,
      isClosable: true,
    });
    
    // Reset form
    setBroadcastMessage('');
    setMessageCategory('');
    setMessagePriority('medium');
    setTargetAudience('all');
  };
  
  const getStatusColor = (status) => {
    switch(status) {
      case 'online': return 'green';
      case 'offline': return 'red';
      default: return 'gray';
    }
  };
  
  const getSignalColor = (signal) => {
    switch(signal) {
      case 'good': return 'green';
      case 'signalMedium': return 'yellow';
      case 'poor': return 'red';
      default: return 'gray';
    }
  };
  
  const getPriorityColor = (priority) => {
    switch(priority) {
      case 'critical': return 'red';
      case 'high': return 'orange';
      case 'medium': return 'blue';
      case 'low': return 'green';
      default: return 'gray';
    }
  };
  
  return (
    <Box position="relative">
      {/* Add SkipLink for keyboard accessibility */}
      <SkipLink targetId="main-content" />

      <Box minH="100vh" p={0}>
        <Container maxW="container.xl" p={0}>
          <Flex
            as="header"
            align="center"
            justify="space-between"
            py={3}
            px={5}
            bg={headerBgColor}
            borderBottomWidth="1px"
            borderColor={borderColor}
          >
            <Flex align="center">
              <Button
                as={RouterLink}
                to="/"
                variant="ghost"
                leftIcon={<Icon as={FiArrowLeft} />}
                mr={2}
                aria-label={t('backToHome') || 'Back to home'}
                size="sm"
              />
              <Heading size={{ base: "md", md: "lg" }} color="purple.500">
                {t('adminDashboard') || 'Admin Dashboard'}
              </Heading>
            </Flex>
            <Flex align="center" gap={2}>
              <LanguageSelector />
              <ThemeToggle />
            </Flex>
          </Flex>

          <Box id="main-content" as="main" p={4} bg={bgColor} tabIndex={-1} outline="none">
            {/* Stats Overview Cards */}
            <SimpleGrid columns={{ base: 2, md: 4 }} spacing={4} mb={6}>
              <Stat
                p={4}
                boxShadow="sm"
                borderRadius="lg"
                bg={statsCardBg}
              >
                <StatLabel display="flex" alignItems="center">
                  <Icon as={FiRadio} mr={2} /> {t('activeNodes') || 'Active Nodes'}
                </StatLabel>
                <StatNumber>{stats.activeNodes}</StatNumber>
                <StatHelpText>{t('totalConnectedNodes') || 'Total connected nodes'}</StatHelpText>
              </Stat>
              
              <Stat
                p={4}
                boxShadow="sm"
                borderRadius="lg"
                bg={statsCardBg}
              >
                <StatLabel display="flex" alignItems="center">
                  <Icon as={FiUsers} mr={2} /> {t('onlineUsers') || 'Online Users'}
                </StatLabel>
                <StatNumber>{stats.onlineUsers}</StatNumber>
                <StatHelpText>{t('connectedToNetwork') || 'Connected to network'}</StatHelpText>
              </Stat>
              
              <Stat
                p={4}
                boxShadow="sm"
                borderRadius="lg"
                bg={statsCardBg}
              >
                <StatLabel display="flex" alignItems="center">
                  <Icon as={FiSend} mr={2} /> {t('pendingMessages') || 'Pending Messages'}
                </StatLabel>
                <StatNumber>{stats.pendingMessages}</StatNumber>
                <StatHelpText>{t('awaitingDelivery') || 'Awaiting delivery'}</StatHelpText>
              </Stat>
              
              <Stat
                p={4}
                boxShadow="sm"
                borderRadius="lg"
                bg={statsCardBg}
              >
                <StatLabel display="flex" alignItems="center">
                  <Icon as={FiActivity} mr={2} /> {t('batteryAvg') || 'Avg. Battery'}
                </StatLabel>
                <StatNumber>{stats.batteryAvg}%</StatNumber>
                <StatHelpText>{t('acrossAllNodes') || 'Across all nodes'}</StatHelpText>
              </Stat>
            </SimpleGrid>
            
            {/* System Alert */}
            <Alert status="warning" mb={6} borderRadius="md">
              <AlertIcon />
              <Text>{t('lowBatteryWarning') || 'East Hospital node battery is critically low (23%). Please replace or recharge.'}</Text>
            </Alert>
            
            {/* Main Tabs Interface */}
            <Tabs variant="enclosed" colorScheme="purple" bg={tabBgColor} borderRadius="md" boxShadow="sm">
              <TabList mb={4} overflowX="auto" css={{ scrollbarWidth: 'thin' }}>
                <Tab><Icon as={FiSend} mr={2} /> {t('broadcast') || 'Broadcast'}</Tab>
                <Tab><Icon as={FiRadio} mr={2} /> {t('nodes') || 'Nodes'}</Tab>
                <Tab><Icon as={FiList} mr={2} /> {t('templates') || 'Templates'}</Tab>
                <Tab><Icon as={FiDatabase} mr={2} /> {t('logs') || 'System Logs'}</Tab>
              </TabList>
              
              <TabPanels>
                {/* Broadcast Tab */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Heading as="h2" size="md" mb={2}>{t('broadcastMessage') || 'Broadcast Emergency Message'}</Heading>
                    
                    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                      <GridItem>
                        <FormControl isRequired mb={4}>
                          <FormLabel htmlFor="message-category">
                            {t('messageCategory') || 'Message Category'}
                          </FormLabel>
                          <Select 
                            id="message-category"
                            placeholder={t('selectCategory') || 'Select category'}
                            value={messageCategory}
                            onChange={(e) => setMessageCategory(e.target.value)}
                          >
                            {categories.map((category) => (
                              <option key={category} value={category}>
                                {t(category)}
                              </option>
                            ))}
                          </Select>
                        </FormControl>
                        
                        <FormControl isRequired mb={4}>
                          <FormLabel htmlFor="message-priority">
                            {t('messagePriority') || 'Message Priority'}
                          </FormLabel>
                          <Select 
                            id="message-priority"
                            value={messagePriority}
                            onChange={(e) => setMessagePriority(e.target.value)}
                          >
                            <option value="critical">{t('critical') || 'Critical'}</option>
                            <option value="high">{t('high') || 'High'}</option>
                            <option value="medium">{t('medium') || 'Medium'}</option>
                            <option value="low">{t('low') || 'Low'}</option>
                          </Select>
                        </FormControl>
                        
                        <FormControl mb={4}>
                          <FormLabel htmlFor="target-audience">
                            {t('targetAudience') || 'Target Audience'}
                          </FormLabel>
                          <Select 
                            id="target-audience"
                            value={targetAudience}
                            onChange={(e) => setTargetAudience(e.target.value)}
                          >
                            <option value="all">{t('allUsers') || 'All users'}</option>
                            <option value="north">{t('northDistrict') || 'North District'}</option>
                            <option value="central">{t('centralDistrict') || 'Central District'}</option>
                            <option value="east">{t('eastDistrict') || 'East District'}</option>
                            <option value="emergency">{t('emergencyPersonnel') || 'Emergency Personnel'}</option>
                          </Select>
                        </FormControl>
                      </GridItem>
                      
                      <GridItem>
                        <FormControl isRequired mb={4} h="100%">
                          <FormLabel htmlFor="broadcast-message">
                            {t('messageContent') || 'Message Content'}
                          </FormLabel>
                          <Textarea 
                            id="broadcast-message"
                            placeholder={t('enterYourMessage') || 'Enter your message here...'}
                            value={broadcastMessage}
                            onChange={(e) => setBroadcastMessage(e.target.value)}
                            h="calc(100% - 32px)"
                            minH="150px"
                            resize="none"
                          />
                        </FormControl>
                      </GridItem>
                    </Grid>
                    
                    <Box textAlign="right">
                      <Button 
                        colorScheme="purple" 
                        leftIcon={<Icon as={FiSend} />}
                        onClick={handleBroadcast}
                        isDisabled={!broadcastMessage.trim() || !messageCategory || !messagePriority}
                      >
                        {t('broadcast') || 'Broadcast'}
                      </Button>
                    </Box>
                  </VStack>
                </TabPanel>
                
                {/* Nodes Tab */}
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <Heading as="h2" size="md" mb={2}>{t('networkNodes') || 'Network Nodes'}</Heading>
                    
                    {mockNodes.map((node) => (
                      <Card key={node.id} variant="outline" borderRadius="md">
                        <CardHeader bg={cardHeaderBg}>
                          <Flex justify="space-between" align="center">
                            <Heading size="sm">{typeof node.name === 'function' ? node.name(t) : node.name}</Heading>
                            <Badge colorScheme={getStatusColor(node.status)}>
                              {node.status === 'online' ? t('online') || 'Online' : t('offline') || 'Offline'}
                            </Badge>
                          </Flex>
                        </CardHeader>
                        <CardBody p={4}>
                          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                            <Stat size="sm">
                              <StatLabel fontSize="xs">{t('connectedUsers') || 'Connected Users'}</StatLabel>
                              <StatNumber fontSize="md">{node.users}</StatNumber>
                            </Stat>
                            <Stat size="sm">
                              <StatLabel fontSize="xs">{t('batteryLevel') || 'Battery Level'}</StatLabel>
                              <StatNumber fontSize="md">{node.battery}%</StatNumber>
                            </Stat>
                            <Stat size="sm">
                              <StatLabel fontSize="xs">{t('signalStrength') || 'Signal Strength'}</StatLabel>
                              <Badge colorScheme={getSignalColor(node.signal)}>
                                {t(node.signal) || node.signal}
                              </Badge>
                            </Stat>
                          </Grid>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                </TabPanel>
                
                {/* Templates Tab */}
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <Flex justify="space-between" align="center" mb={2}>
                      <Heading as="h2" size="md">{t('messageTemplates') || 'Message Templates'}</Heading>
                      <Button 
                        size="sm" 
                        colorScheme="purple" 
                        leftIcon={<Icon as={FiPlus} />}
                      >
                        {t('addTemplate') || 'Add Template'}
                      </Button>
                    </Flex>
                    
                    {mockTemplates.map((template) => (
                      <Card key={template.id} variant="outline" borderRadius="md">
                        <CardBody p={4}>
                          <Grid templateColumns={{ base: "1fr", md: "1fr 120px 120px 100px" }} gap={4} alignItems="center">
                            <Box>
                              <Text fontWeight="bold">{t(template.name)}</Text>
                              <Text fontSize="sm" color="gray.500">{t('category')}: {t(template.category)}</Text>
                            </Box>
                            <Badge colorScheme={getPriorityColor(template.priority)} w="fit-content">
                              {t(template.priority)}
                            </Badge>
                            <Text fontSize="sm">
                              {t('usedTimes', { count: template.usageCount }) || `Used ${template.usageCount} times`}
                            </Text>
                            <HStack spacing={2}>
                              <Button size="sm" colorScheme="blue" variant="outline">
                                {t('edit') || 'Edit'}
                              </Button>
                              <Button size="sm" colorScheme="red" variant="ghost">
                                {t('delete') || 'Delete'}
                              </Button>
                            </HStack>
                          </Grid>
                        </CardBody>
                      </Card>
                    ))}
                  </VStack>
                </TabPanel>
                
                {/* System Logs Tab */}
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <Heading as="h2" size="md" mb={2}>{t('systemLogs') || 'System Logs'}</Heading>
                    
                    <Box 
                      p={4} 
                      border="1px" 
                      borderColor={borderColor} 
                      borderRadius="md"
                      fontFamily="monospace"
                      fontSize="sm"
                      bg={logsBg}
                      overflowX="auto"
                      height="400px"
                      overflowY="scroll"
                    >
                      <Text color="green.500">[2025-05-11 08:15:23] INFO: System started successfully</Text>
                      <Text color="blue.500">[2025-05-11 08:16:45] INFO: Node 'North District Hub' connected</Text>
                      <Text color="blue.500">[2025-05-11 08:17:12] INFO: Node 'Central Square' connected</Text>
                      <Text color="yellow.500">[2025-05-11 08:18:03] WARN: Node 'East Hospital' battery level low (23%)</Text>
                      <Text color="blue.500">[2025-05-11 08:20:41] INFO: User broadcast sent to all nodes</Text>
                      <Text color="red.500">[2025-05-11 08:32:17] ERROR: Connection to node 'East Hospital' lost</Text>
                      <Text color="blue.500">[2025-05-11 08:45:22] INFO: 24 users connected to 'North District Hub'</Text>
                      <Text color="blue.500">[2025-05-11 09:05:11] INFO: Message template 'Evacuation Alert' used</Text>
                      <Text color="blue.500">[2025-05-11 09:15:33] INFO: Node 'School Zone' connected</Text>
                      <Text color="yellow.500">[2025-05-11 09:20:15] WARN: Network congestion detected in 'Central Square'</Text>
                    </Box>
                  </VStack>
                </TabPanel>
              </TabPanels>
            </Tabs>
          </Box>
        </Container>
      </Box>
    </Box>
  );
};

export default AdminDashboard; 