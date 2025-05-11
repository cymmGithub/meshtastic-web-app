import React, { useState, useEffect } from 'react';
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
  AlertIcon,
  Checkbox,
  Stack
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
  FiPlus,
  FiMessageSquare,
  FiCheckCircle
} from 'react-icons/fi';
import { useLanguage } from '../../i18n/LanguageContext.js';
import LanguageSelector from '../../components/ui/LanguageSelector.js';
import ThemeToggle from '../../components/ui/ThemeToggle.js';
import { SkipLink } from '../../components/accessibility/index.js';
import { categories } from '../../utils/templateData.js';
import { mockMessages } from '../../utils/mockMessages.js';

// Mock data for testing
const mockNodes = [
  { id: 'node-1', name: t => t('northDistrict') || 'North District Hub', status: 'online', users: 24, battery: 86, signal: 'good' },
  { id: 'node-2', name: t => t('centralDistrict') || 'Central Square', status: 'online', users: 18, battery: 52, signal: 'signalMedium' },
  { id: 'node-3', name: t => t('eastDistrict') || 'East Hospital', status: 'offline', users: 0, battery: 23, signal: 'poor' },
  { id: 'node-4', name: t => t('schoolZone') || 'School Zone', status: 'online', users: 12, battery: 78, signal: 'good' }
];

// Mock user help requests
const mockUserRequests = [
  { 
    id: 'req-001', 
    sender: 'Mieszkaniec Dzielnicy A',
    userLocation: 'Dzielnica północna',
    category: 'urgentHelp',
    message: 'Potrzebuję pomocy z ewakuacją. Mam niepełnosprawne dziecko i nie mogę samodzielnie opuścić budynku.',
    timestamp: '2023-06-15T16:45:00Z',
    status: 'pending',
    priority: 'high'
  },
  { 
    id: 'req-002', 
    sender: 'Wolontariusz',
    userLocation: 'Dzielnica centralna',
    category: 'resources',
    message: 'W centrum ewakuacyjnym kończy się woda pitna. Potrzebujemy dostaw dla około 50 osób.',
    timestamp: '2023-06-15T17:30:00Z',
    status: 'inProgress',
    priority: 'medium'
  },
  { 
    id: 'req-003', 
    sender: 'Pielęgniarka',
    userLocation: 'Dzielnica wschodnia',
    category: 'medicalEmergency',
    message: 'Potrzebujemy insulin i leków na nadciśnienie w szpitalu. Wielu pacjentów nie ma swoich leków.',
    timestamp: '2023-06-15T18:15:00Z',
    status: 'pending',
    priority: 'critical'
  },
  { 
    id: 'req-004', 
    sender: 'Mieszkaniec',
    userLocation: 'Strefa szkolna',
    category: 'infrastructure',
    message: 'Uszkodzony most na ulicy Kwiatowej uniemożliwia ewakuację. Nikt nie może się tędy dostać.',
    timestamp: '2023-06-16T09:00:00Z',
    status: 'pending',
    priority: 'high'
  }
];

const mockTemplates = [
  { id: 'tpl-1', name: 'evacuationAlert', category: 'evacuation', priority: 'high', usageCount: 14 },
  { id: 'tpl-2', name: 'medicalAidAvailable', category: 'medicalEmergency', priority: 'medium', usageCount: 8 },
  { id: 'tpl-3', name: 'powerOutageUpdate', category: 'infrastructure', priority: 'low', usageCount: 22 },
  { id: 'tpl-4', name: 'foodDistribution', category: 'resources', priority: 'medium', usageCount: 19 }
];

const AdminDashboard = () => {
  const { t } = useLanguage();
  const [broadcastMessage, setBroadcastMessage] = useState('');
  const [messageCategory, setMessageCategory] = useState('');
  const [messagePriority, setMessagePriority] = useState('medium');
  const [targetAudience, setTargetAudience] = useState('all');
  const [userRequests, setUserRequests] = useState(mockUserRequests);
  const [selectedRequests, setSelectedRequests] = useState([]);
  const toast = useToast();

  // Theme-aware colors
  const bgColor = useColorModeValue('white', 'gray.900');
  const headerBgColor = useColorModeValue('blue.50', 'blue.900');
  const borderColor = useColorModeValue('gray.200', 'gray.700');
  const tabBgColor = useColorModeValue('white', 'gray.800');
  const statsCardBg = useColorModeValue('blue.50', 'blue.900');
  const cardHeaderBg = useColorModeValue('gray.50', 'gray.700');
  const logsBg = useColorModeValue('gray.50', 'gray.800');
  const requestCardBg = useColorModeValue('white', 'gray.700');
  
  // Load mockMessages on mount
  useEffect(() => {
    // In a real app, this would be an API call
    console.log('Loading user requests...');
  }, []);
  
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

  // Handle user request selection
  const handleRequestSelect = (requestId) => {
    setSelectedRequests(prev => {
      if (prev.includes(requestId)) {
        return prev.filter(id => id !== requestId);
      } else {
        return [...prev, requestId];
      }
    });
  };

  // Handle user request status update
  const handleUpdateRequestStatus = (requestId, newStatus) => {
    setUserRequests(prev => 
      prev.map(req => 
        req.id === requestId ? { ...req, status: newStatus } : req
      )
    );

    toast({
      title: t('requestUpdated') || 'Request Updated',
      description: t('requestStatusChanged') || 'The request status has been updated',
      status: 'success',
      duration: 3000,
      isClosable: true,
    });
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

  const getRequestStatusColor = (status) => {
    switch(status) {
      case 'pending': return 'yellow';
      case 'inProgress': return 'blue';
      case 'resolved': return 'green';
      case 'rejected': return 'red';
      default: return 'gray';
    }
  };

  const getRequestStatusLabel = (status) => {
    switch(status) {
      case 'pending': return t('requestPending') || 'Pending';
      case 'inProgress': return t('requestInProgress') || 'In Progress';
      case 'resolved': return t('requestResolved') || 'Resolved';
      case 'rejected': return t('requestRejected') || 'Rejected';
      default: return status;
    }
  };

  const getCategoryIcon = (category) => {
    switch(category) {
      case 'urgentHelp': return FiAlertTriangle;
      case 'medicalEmergency': return FiActivity;
      case 'evacuation': return FiUsers;
      case 'resources': return FiDatabase;
      case 'infrastructure': return FiRadio;
      default: return FiMessageSquare;
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
                  <Icon as={FiRadio} mr={2} /> {t('activeNodes')}
                </StatLabel>
                <StatNumber>{stats.activeNodes}</StatNumber>
                <StatHelpText>{t('totalConnectedNodes')}</StatHelpText>
              </Stat>
              
              <Stat
                p={4}
                boxShadow="sm"
                borderRadius="lg"
                bg={statsCardBg}
              >
                <StatLabel display="flex" alignItems="center">
                  <Icon as={FiUsers} mr={2} /> {t('onlineUsers')}
                </StatLabel>
                <StatNumber>{stats.onlineUsers}</StatNumber>
                <StatHelpText>{t('connectedToNetwork')}</StatHelpText>
              </Stat>
              
              <Stat
                p={4}
                boxShadow="sm"
                borderRadius="lg"
                bg={statsCardBg}
              >
                <StatLabel display="flex" alignItems="center">
                  <Icon as={FiSend} mr={2} /> {t('pendingMessages')}
                </StatLabel>
                <StatNumber>{stats.pendingMessages}</StatNumber>
                <StatHelpText>{t('awaitingDelivery')}</StatHelpText>
              </Stat>
              
              <Stat
                p={4}
                boxShadow="sm"
                borderRadius="lg"
                bg={statsCardBg}
              >
                <StatLabel display="flex" alignItems="center">
                  <Icon as={FiActivity} mr={2} /> {t('batteryAvg')}
                </StatLabel>
                <StatNumber>{stats.batteryAvg}%</StatNumber>
                <StatHelpText>{t('acrossAllNodes')}</StatHelpText>
              </Stat>
            </SimpleGrid>
            
            {/* System Alert */}
            <Alert status="warning" mb={6} borderRadius="md">
              <AlertIcon />
              <Text>{t('lowBatteryWarning')}</Text>
            </Alert>
            
            {/* Main Tabs Interface */}
            <Tabs variant="enclosed" colorScheme="purple" bg={tabBgColor} borderRadius="md" boxShadow="sm">
              <TabList mb={4} overflowX="auto" css={{ scrollbarWidth: 'thin' }}>
                <Tab><Icon as={FiSend} mr={2} /> {t('broadcast')}</Tab>
                <Tab><Icon as={FiMessageSquare} mr={2} /> {t('userMessages')}</Tab>
                <Tab><Icon as={FiRadio} mr={2} /> {t('nodes')}</Tab>
                <Tab><Icon as={FiList} mr={2} /> {t('templates')}</Tab>
                <Tab><Icon as={FiDatabase} mr={2} /> {t('logs')}</Tab>
              </TabList>
              
              <TabPanels>
                {/* Broadcast Tab */}
                <TabPanel>
                  <VStack spacing={6} align="stretch">
                    <Heading as="h2" size="md" mb={2}>{t('broadcastMessage')}</Heading>
                    
                    <Grid templateColumns={{ base: "1fr", md: "1fr 1fr" }} gap={6}>
                      <GridItem>
                        <FormControl isRequired mb={4}>
                          <FormLabel htmlFor="message-category">
                            {t('messageCategory')}
                          </FormLabel>
                          <Select 
                            id="message-category"
                            placeholder={t('selectCategory')}
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
                            {t('messagePriority')}
                          </FormLabel>
                          <Select 
                            id="message-priority"
                            value={messagePriority}
                            onChange={(e) => setMessagePriority(e.target.value)}
                          >
                            <option value="critical">{t('critical')}</option>
                            <option value="high">{t('high')}</option>
                            <option value="medium">{t('medium')}</option>
                            <option value="low">{t('low')}</option>
                          </Select>
                        </FormControl>
                        
                        <FormControl mb={4}>
                          <FormLabel htmlFor="target-audience">
                            {t('targetAudience')}
                          </FormLabel>
                          <Select 
                            id="target-audience"
                            value={targetAudience}
                            onChange={(e) => setTargetAudience(e.target.value)}
                          >
                            <option value="all">{t('allUsers')}</option>
                            <option value="north">{t('northDistrict')}</option>
                            <option value="central">{t('centralDistrict')}</option>
                            <option value="east">{t('eastDistrict')}</option>
                            <option value="emergency">{t('emergencyPersonnel')}</option>
                          </Select>
                        </FormControl>
                      </GridItem>
                      
                      <GridItem>
                        <FormControl isRequired mb={4} h="100%">
                          <FormLabel htmlFor="broadcast-message">
                            {t('messageContent')}
                          </FormLabel>
                          <Textarea 
                            id="broadcast-message"
                            placeholder={t('enterYourMessage')}
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
                        {t('broadcast')}
                      </Button>
                    </Box>
                  </VStack>
                </TabPanel>

                {/* User Messages Tab */}
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <Flex justify="space-between" align="center" mb={2}>
                      <Heading as="h2" size="md">{t('userMessages')}</Heading>
                      <HStack spacing={2}>
                        <Select 
                          size="sm" 
                          width="auto" 
                          placeholder={t('filterByCategory')}
                        >
                          <option value="all">{t('allMessages')}</option>
                          {categories.map((category) => (
                            <option key={category} value={category}>
                              {t(category)}
                            </option>
                          ))}
                        </Select>
                        <Select 
                          size="sm" 
                          width="auto" 
                          placeholder={t('filterByStatus')}
                        >
                          <option value="all">{t('allStatuses')}</option>
                          <option value="pending">{t('requestPending')}</option>
                          <option value="inProgress">{t('requestInProgress')}</option>
                          <option value="resolved">{t('requestResolved')}</option>
                        </Select>
                      </HStack>
                    </Flex>
                    
                    {userRequests.length > 0 ? (
                      <VStack spacing={4} align="stretch">
                        {userRequests.map((request) => (
                          <Card key={request.id} variant="outline" borderRadius="md" bg={requestCardBg}>
                            <CardBody p={4}>
                              <Flex direction={{ base: "column", md: "row" }} justify="space-between">
                                <Box flex="1" mb={{ base: 4, md: 0 }}>
                                  <Flex mb={2} alignItems="center">
                                    <Checkbox 
                                      isChecked={selectedRequests.includes(request.id)}
                                      onChange={() => handleRequestSelect(request.id)}
                                      mr={3}
                                    />
                                    <Badge 
                                      colorScheme={getPriorityColor(request.priority)} 
                                      mr={2}
                                    >
                                      {t(request.priority)}
                                    </Badge>
                                    <Text fontWeight="bold">
                                      {request.sender} - {request.userLocation}
                                    </Text>
                                  </Flex>
                                  
                                  <Flex mb={2} alignItems="center">
                                    <Icon 
                                      as={getCategoryIcon(request.category)} 
                                      color={`${getPriorityColor(request.priority)}.500`}
                                      mr={2}
                                    />
                                    <Text fontWeight="medium" color="gray.600">
                                      {t(request.category)}
                                    </Text>
                                  </Flex>
                                  
                                  <Text mb={3}>{request.message}</Text>
                                  
                                  <Flex alignItems="center" fontSize="sm" color="gray.500">
                                    <Text>{new Date(request.timestamp).toLocaleString()}</Text>
                                    <Badge 
                                      ml={3} 
                                      colorScheme={getRequestStatusColor(request.status)}
                                    >
                                      {getRequestStatusLabel(request.status)}
                                    </Badge>
                                  </Flex>
                                </Box>
                                
                                <Stack 
                                  direction={{ base: "row", md: "column" }} 
                                  spacing={2} 
                                  align={{ base: "center", md: "flex-end" }}
                                  ml={{ base: 0, md: 4 }}
                                >
                                  {request.status === 'pending' && (
                                    <>
                                      <Button 
                                        size="sm" 
                                        colorScheme="blue" 
                                        onClick={() => handleUpdateRequestStatus(request.id, 'inProgress')}
                                      >
                                        {t('startProcessing')}
                                      </Button>
                                      <Button 
                                        size="sm" 
                                        colorScheme="green" 
                                        onClick={() => handleUpdateRequestStatus(request.id, 'resolved')}
                                      >
                                        {t('markResolved')}
                                      </Button>
                                    </>
                                  )}
                                  
                                  {request.status === 'inProgress' && (
                                    <Button 
                                      size="sm" 
                                      colorScheme="green" 
                                      onClick={() => handleUpdateRequestStatus(request.id, 'resolved')}
                                    >
                                      {t('markResolved')}
                                    </Button>
                                  )}
                                  
                                  <Button 
                                    size="sm" 
                                    colorScheme="purple" 
                                    variant="outline"
                                  >
                                    {t('reply')}
                                  </Button>
                                </Stack>
                              </Flex>
                            </CardBody>
                          </Card>
                        ))}
                      </VStack>
                    ) : (
                      <Box 
                        p={6} 
                        textAlign="center" 
                        borderRadius="md" 
                        borderWidth="1px"
                        borderColor={borderColor}
                      >
                        <Icon as={FiMessageSquare} boxSize={10} color="gray.400" mb={3} />
                        <Heading size="md" mb={2}>{t('noUserMessages') || 'No User Messages'}</Heading>
                        <Text>{t('noUserMessagesDesc') || 'There are no user messages or help requests at this time.'}</Text>
                      </Box>
                    )}
                    
                    {selectedRequests.length > 0 && (
                      <Flex justify="space-between" align="center" mt={2}>
                        <Text>
                          {selectedRequests.length} {selectedRequests.length === 1 
                            ? t('itemSelected') 
                            : t('itemsSelected')}
                        </Text>
                        <HStack spacing={2}>
                          <Button 
                            size="sm" 
                            colorScheme="blue"
                            onClick={() => {
                              selectedRequests.forEach(id => 
                                handleUpdateRequestStatus(id, 'inProgress')
                              );
                              setSelectedRequests([]);
                            }}
                          >
                            {t('processSelected')}
                          </Button>
                          <Button 
                            size="sm" 
                            colorScheme="green"
                            onClick={() => {
                              selectedRequests.forEach(id => 
                                handleUpdateRequestStatus(id, 'resolved')
                              );
                              setSelectedRequests([]);
                            }}
                          >
                            {t('resolveSelected')}
                          </Button>
                        </HStack>
                      </Flex>
                    )}
                  </VStack>
                </TabPanel>
                
                {/* Nodes Tab */}
                <TabPanel>
                  <VStack spacing={4} align="stretch">
                    <Heading as="h2" size="md" mb={2}>{t('networkNodes')}</Heading>
                    
                    {mockNodes.map((node) => (
                      <Card key={node.id} variant="outline" borderRadius="md">
                        <CardHeader bg={cardHeaderBg}>
                          <Flex justify="space-between" align="center">
                            <Heading size="sm">{typeof node.name === 'function' ? node.name(t) : node.name}</Heading>
                            <Badge colorScheme={getStatusColor(node.status)}>
                              {node.status === 'online' ? t('online') : t('offline')}
                            </Badge>
                          </Flex>
                        </CardHeader>
                        <CardBody p={4}>
                          <Grid templateColumns="repeat(3, 1fr)" gap={4}>
                            <Stat size="sm">
                              <StatLabel fontSize="xs">{t('connectedUsers')}</StatLabel>
                              <StatNumber fontSize="md">{node.users}</StatNumber>
                            </Stat>
                            <Stat size="sm">
                              <StatLabel fontSize="xs">{t('batteryLevel')}</StatLabel>
                              <StatNumber fontSize="md">{node.battery}%</StatNumber>
                            </Stat>
                            <Stat size="sm">
                              <StatLabel fontSize="xs">{t('signalStrength')}</StatLabel>
                              <Badge colorScheme={getSignalColor(node.signal)}>
                                {t(node.signal)}
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
                      <Heading as="h2" size="md">{t('messageTemplates')}</Heading>
                      <Button 
                        size="sm" 
                        colorScheme="purple" 
                        leftIcon={<Icon as={FiPlus} />}
                      >
                        {t('addTemplate')}
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
                              {t('usedTimes', { count: template.usageCount })}
                            </Text>
                            <HStack spacing={2}>
                              <Button size="sm" colorScheme="blue" variant="outline">
                                {t('edit')}
                              </Button>
                              <Button size="sm" colorScheme="red" variant="ghost">
                                {t('delete')}
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
                    <Heading as="h2" size="md" mb={2}>{t('systemLogs')}</Heading>
                    
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