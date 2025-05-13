import React, { useState, useEffect } from "react";
import { Link as RouterLink } from "react-router-dom";
import {
   FiArrowLeft,
   FiSend,
   FiRadio,
   FiUsers,
   FiAlertTriangle,
   FiList,
   FiActivity,
   FiDatabase,
   FiPlus,
   FiMessageSquare,
   FiBell,
   FiInfo,
} from "react-icons/fi";
import { useLanguage } from "../../i18n/LanguageContext.js";
import LanguageSelector from "../../components/ui/LanguageSelector.js";
import ThemeToggle from "../../components/ui/ThemeToggle.js";
import { SkipLink } from "../../components/accessibility/index.js";
import { categories } from "../../utils/templateData.js";
import { messages } from "../../db/messages.js";
import Badge from "../../components/ui/Badge.js";

// Mock data for testing
const mockNodes = [
   {
      id: "node-1",
      name: (t) => t("northDistrict") || "North District Hub",
      status: "online",
      users: 24,
      battery: 86,
      signal: "good",
   },
   {
      id: "node-2",
      name: (t) => t("centralDistrict") || "Central Square",
      status: "online",
      users: 18,
      battery: 52,
      signal: "signalMedium",
   },
   {
      id: "node-3",
      name: (t) => t("eastDistrict") || "East Hospital",
      status: "offline",
      users: 0,
      battery: 23,
      signal: "poor",
   },
   {
      id: "node-4",
      name: (t) => t("schoolZone") || "School Zone",
      status: "online",
      users: 12,
      battery: 78,
      signal: "good",
   },
];

// Mock user help requests
const mockUserRequests = [
   {
      id: "req-001",
      sender: "Mieszkaniec Dzielnicy A",
      userLocation: "Dzielnica północna",
      category: "urgentHelp",
      message:
         "Potrzebuję pomocy z ewakuacją. Mam niepełnosprawne dziecko i nie mogę samodzielnie opuścić budynku.",
      timestamp: "2023-06-15T16:45:00Z",
      status: "pending",
      priority: "high",
   },
   {
      id: "req-002",
      sender: "Wolontariusz",
      userLocation: "Dzielnica centralna",
      category: "resources",
      message:
         "W centrum ewakuacyjnym kończy się woda pitna. Potrzebujemy dostaw dla około 50 osób.",
      timestamp: "2023-06-15T17:30:00Z",
      status: "inProgress",
      priority: "medium",
   },
   {
      id: "req-003",
      sender: "Pielęgniarka",
      userLocation: "Dzielnica wschodnia",
      category: "medicalEmergency",
      message:
         "Potrzebujemy insulin i leków na nadciśnienie w szpitalu. Wielu pacjentów nie ma swoich leków.",
      timestamp: "2023-06-15T18:15:00Z",
      status: "pending",
      priority: "critical",
   },
   {
      id: "req-004",
      sender: "Mieszkaniec",
      userLocation: "Strefa szkolna",
      category: "infrastructure",
      message:
         "Uszkodzony most na ulicy Kwiatowej uniemożliwia ewakuację. Nikt nie może się tędy dostać.",
      timestamp: "2023-06-16T09:00:00Z",
      status: "pending",
      priority: "high",
   },
];

const mockTemplates = [
   {
      id: "tpl-1",
      name: "evacuationAlert",
      category: "evacuation",
      priority: "high",
      usageCount: 14,
      content:
         "PILNE: Wymagana ewakuacja w Twojej okolicy. Udaj się natychmiast do najbliższego schronienia. Zabierz tylko niezbędne rzeczy i postępuj zgodnie z oficjalnymi instrukcjami.",
   },
   {
      id: "tpl-2",
      name: "medicalAidAvailable",
      category: "medicalEmergency",
      priority: "medium",
      usageCount: 8,
      content:
         "Pomoc medyczna jest teraz dostępna w następujących lokalizacjach: Park Centralny (24h), Szpital Wschodni (8-20), oraz jednostki mobilne w dzielnicy północnej.",
   },
   {
      id: "tpl-3",
      name: "powerOutageUpdate",
      category: "infrastructure",
      priority: "low",
      usageCount: 22,
      content:
         "Przerwa w dostawie prądu w sektorach 3, 4 i 7. Przewidywany czas przywrócenia: 18:00. Awaryjne zasilanie dostępne w centrach społecznościowych.",
   },
   {
      id: "tpl-4",
      name: "foodDistribution",
      category: "resources",
      priority: "medium",
      usageCount: 19,
      content:
         "Punkty dystrybucji żywności i wody utworzono w: Główny Plac, Szkoła Centralna i Arena Sportowa. Godziny dystrybucji: 8:00-18:00. Prosimy o zabranie dokumentu tożsamości i pojemników na wodę.",
   },
];

const AdminDashboard = () => {
   const { t } = useLanguage();
   const [activeTab, setActiveTab] = useState(0);
   const [broadcastMessage, setBroadcastMessage] = useState("");
   const [messageCategory, setMessageCategory] = useState("");
   const [messagePriority, setMessagePriority] = useState("medium");
   const [messageTitle, setMessageTitle] = useState("");
   const [targetAudience, setTargetAudience] = useState("all");
   const [userRequests, setUserRequests] = useState(mockUserRequests);
   const [selectedRequests, setSelectedRequests] = useState([]);
   const [templates, setTemplates] = useState(mockTemplates);
   const [isEditOpen, setIsEditOpen] = useState(false);
   const [isDeleteOpen, setIsDeleteOpen] = useState(false);
   const [isViewOpen, setIsViewOpen] = useState(false);
   const [selectedTemplate, setSelectedTemplate] = useState(null);
   const [templateContent, setTemplateContent] = useState({
      id: null,
      name: "",
      content: "",
   });
   const [editingTemplateContent, setEditingTemplateContent] = useState("");
   
   // Load mockMessages on mount
   useEffect(() => {
      // In a real app, this would be an API call
      console.log("Loading user requests...");
   }, []);

   // Stats overview (mock data)
   const stats = {
      activeNodes: 12,
      onlineUsers: 56,
      pendingMessages: 8,
      batteryAvg: 64,
   };

   // Form handlers
   const handleBroadcast = async () => {
      if (!broadcastMessage.trim() || !messageCategory || !messagePriority) {
         alert(t("formIncomplete") || "Form Incomplete");
         return;
      }

      try {
         await messages.save(
            "admin",
            targetAudience,
            messageTitle,
            broadcastMessage
         );

         alert(t("messageBroadcasted") || "Message Broadcasted");

         // Reset form
         setBroadcastMessage("");
         setMessageCategory("");
         setMessagePriority("medium");
         setMessageTitle("");
         setTargetAudience("all");
      } catch (error) {
         console.error("Error saving message:", error);
         alert(t("errorSavingMessage") || "Error saving message to database");
      }
   };

   // Handle user request selection
   const handleRequestSelect = (requestId) => {
      setSelectedRequests((prev) => {
         if (prev.includes(requestId)) {
            return prev.filter((id) => id !== requestId);
         } else {
            return [...prev, requestId];
         }
      });
   };

   // Handle user request status update
   const handleUpdateRequestStatus = (requestId, newStatus) => {
      setUserRequests((prev) =>
         prev.map((req) =>
            req.id === requestId ? { ...req, status: newStatus } : req
         )
      );

      alert(t("requestUpdated") || "Request Updated");
   };

   // Helper functions for styling
   const getStatusColor = (status) => {
      return status === "online"
         ? "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300"
         : "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
   };

   const getSignalColor = (signal) => {
      if (signal >= 80) return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
      if (signal >= 60) return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
      if (signal >= 40) return "bg-orange-100 text-orange-800 dark:bg-orange-900 dark:text-orange-300";
      return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
   };

   const getPriorityColor = (priority) => {
      switch (priority) {
         case "high":
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
         case "medium":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
         case "low":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
         default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      }
   };

   const getRequestStatusColor = (status) => {
      switch (status) {
         case "pending":
            return "bg-yellow-100 text-yellow-800 dark:bg-yellow-900 dark:text-yellow-300";
         case "in_progress":
            return "bg-blue-100 text-blue-800 dark:bg-blue-900 dark:text-blue-300";
         case "completed":
            return "bg-green-100 text-green-800 dark:bg-green-900 dark:text-green-300";
         case "rejected":
            return "bg-red-100 text-red-800 dark:bg-red-900 dark:text-red-300";
         default:
            return "bg-gray-100 text-gray-800 dark:bg-gray-900 dark:text-gray-300";
      }
   };

   const getRequestStatusLabel = (status) => {
      switch (status) {
         case "pending":
            return t("pending") || "Pending";
         case "in_progress":
            return t("inProgress") || "In Progress";
         case "completed":
            return t("completed") || "Completed";
         case "rejected":
            return t("rejected") || "Rejected";
         default:
            return status;
      }
   };

   const getCategoryIcon = (category) => {
      switch (category) {
         case "emergency":
            return <FiAlertTriangle className="w-5 h-5" />;
         case "alert":
            return <FiBell className="w-5 h-5" />;
         case "update":
            return <FiInfo className="w-5 h-5" />;
         case "general":
            return <FiMessageSquare className="w-5 h-5" />;
         default:
            return <FiMessageSquare className="w-5 h-5" />;
      }
   };

   // Template handlers
   const handleEditTemplate = (template) => {
      setSelectedTemplate(template);
      setIsEditOpen(true);
   };

   const handleDeleteTemplate = (template) => {
      setSelectedTemplate(template);
      setIsDeleteOpen(true);
   };

   const handleTemplateFormChange = (field, value) => {
      setSelectedTemplate((prev) => ({
         ...prev,
         [field]: value,
      }));
   };

   const handleSaveTemplate = () => {
      if (selectedTemplate) {
         setTemplates((prev) =>
            prev.map((tpl) =>
               tpl.id === selectedTemplate.id ? selectedTemplate : tpl
            )
         );

         alert(t("templateUpdated") || "Template Updated");
         setIsEditOpen(false);
      }
   };

   const handleConfirmDelete = () => {
      if (selectedTemplate) {
         setTemplates((prev) =>
            prev.filter((tpl) => tpl.id !== selectedTemplate.id)
         );

         alert(t("templateDeleted") || "Template Deleted");
         setIsDeleteOpen(false);
      }
   };

   const handleAddNewTemplate = () => {
      const newId = `tpl-${templates.length + 1}`;
      const defaultCategory = "urgentHelp";

      // Create default content based on category
      const defaultContent =
         t("defaultTemplateContent") || "Wprowadź treść wiadomości alarmu...";

      setSelectedTemplate({
         id: newId,
         name: "",
         category: defaultCategory,
         priority: "medium",
         usageCount: 0,
         content: defaultContent,
      });
      setIsEditOpen(true);
   };

   const handleViewTemplate = (template) => {
      setTemplateContent({
         id: template.id,
         name: template.name,
         content: template.content,
      });
      setEditingTemplateContent(template.content);
      setIsViewOpen(true);
   };

   // Modify the handleSaveTemplateContent function to close the modal after saving
   const handleSaveTemplateContent = () => {
      if (templateContent.id) {
         setTemplates((prev) =>
            prev.map((tpl) =>
               tpl.id === templateContent.id
                  ? { ...tpl, content: editingTemplateContent }
                  : tpl
            )
         );
      }

      setTemplateContent((prev) => ({
         ...prev,
         content: editingTemplateContent,
      }));

      alert(t("templateContentSaved") || "Template Content Saved");
      setIsViewOpen(false);
   };

   // Add a function to handle sending the message
   const handleSendTemplate = () => {
      if (templateContent.id) {
         setTemplates((prev) =>
            prev.map((tpl) =>
               tpl.id === templateContent.id
                  ? {
                       ...tpl,
                       usageCount: tpl.usageCount + 1,
                       content: editingTemplateContent,
                    }
                  : tpl
            )
         );
      }

      alert(t("templateMessageSent") || "Template Message Sent");
      setIsViewOpen(false);
   };

   return (
      <div className="relative">
         <div className="min-h-screen p-0">
            <div className="container mx-auto p-0">
               <header className="flex items-center justify-between py-3 px-5 bg-blue-50 dark:bg-blue-900 border-b border-gray-200 dark:border-gray-700">
                  <div className="flex items-center">
                     <button
                        as={RouterLink}
                        to="/"
                        className="mr-2 p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-lg"
                        aria-label={t("backToHome") || "Back to home"}
                     >
                        <FiArrowLeft className="w-5 h-5" />
                     </button>
                     <h1 className="text-xl md:text-2xl font-bold text-purple-600">
                        {t("adminDashboard") || "Admin Dashboard"}
                     </h1>
                  </div>
                  <div className="flex items-center gap-2">
                     <LanguageSelector />
                     <ThemeToggle />
                  </div>
               </header>

               <main id="main-content" className="p-4 bg-white dark:bg-gray-900" tabIndex={-1}>
                  {/* Stats Overview Cards */}
                  <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-6">
                     <div className="p-4 shadow-sm rounded-lg bg-blue-50 dark:bg-blue-900">
                        <div className="flex items-center mb-2">
                           <FiRadio className="mr-2" /> {t("activeNodes")}
                        </div>
                        <div className="text-2xl font-bold">{stats.activeNodes}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{t("totalConnectedNodes")}</div>
                     </div>

                     <div className="p-4 shadow-sm rounded-lg bg-blue-50 dark:bg-blue-900">
                        <div className="flex items-center mb-2">
                           <FiUsers className="mr-2" /> {t("onlineUsers")}
                        </div>
                        <div className="text-2xl font-bold">{stats.onlineUsers}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{t("connectedToNetwork")}</div>
                     </div>

                     <div className="p-4 shadow-sm rounded-lg bg-blue-50 dark:bg-blue-900">
                        <div className="flex items-center mb-2">
                           <FiSend className="mr-2" /> {t("pendingMessages")}
                        </div>
                        <div className="text-2xl font-bold">{stats.pendingMessages}</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{t("awaitingDelivery")}</div>
                     </div>

                     <div className="p-4 shadow-sm rounded-lg bg-blue-50 dark:bg-blue-900">
                        <div className="flex items-center mb-2">
                           <FiActivity className="mr-2" /> {t("batteryAvg")}
                        </div>
                        <div className="text-2xl font-bold">{stats.batteryAvg}%</div>
                        <div className="text-sm text-gray-600 dark:text-gray-400">{t("acrossAllNodes")}</div>
                     </div>
                  </div>

                  {/* System Alert */}
                  <div className="mb-6 p-4 bg-yellow-100 dark:bg-yellow-900 rounded-md flex items-center">
                     <FiAlertTriangle className="mr-2 text-yellow-500" />
                     <span>{t("lowBatteryWarning")}</span>
                  </div>

                  {/* Main Tabs Interface */}
                  <div className="bg-white dark:bg-gray-800 rounded-md shadow-sm">
                     <div className="border-b border-gray-200 dark:border-gray-700">
                        <nav className="flex overflow-x-auto">
                           {[
                              { icon: FiSend, label: t("broadcast") },
                              { icon: FiMessageSquare, label: t("userMessages") },
                              { icon: FiRadio, label: t("nodes") },
                              { icon: FiList, label: t("templates") },
                              { icon: FiDatabase, label: t("logs") },
                           ].map((tab, index) => (
                              <button
                                 key={index}
                                 className={`flex items-center px-4 py-2 border-b-2 ${
                                    activeTab === index
                                       ? "border-purple-500 text-purple-600"
                                       : "border-transparent text-gray-500 hover:text-gray-700 dark:text-gray-400 dark:hover:text-gray-300"
                                 }`}
                                 onClick={() => setActiveTab(index)}
                              >
                                 <tab.icon className="mr-2" />
                                 {tab.label}
                              </button>
                           ))}
                        </nav>
                     </div>

                     <div className="p-4">
                        {/* Broadcast Tab */}
                        {activeTab === 0 && (
                           <div className="space-y-6">
                              <h2 className="text-lg font-semibold mb-2">
                                 {t("broadcastMessage")}
                              </h2>

                              <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                 <div>
                                    <div className="mb-4">
                                       <label className="block text-sm font-medium mb-1">
                                          {t("messageCategory")}
                                       </label>
                                       <select
                                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                                          value={messageCategory}
                                          onChange={(e) => setMessageCategory(e.target.value)}
                                       >
                                          <option value="">{t("selectCategory")}</option>
                                          {categories.map((category) => (
                                             <option key={category} value={category}>
                                                {t(category)}
                                             </option>
                                          ))}
                                       </select>
                                    </div>

                                    <div className="mb-4">
                                       <label className="block text-sm font-medium mb-1">
                                          {t("messagePriority")}
                                       </label>
                                       <select
                                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                                          value={messagePriority}
                                          onChange={(e) => setMessagePriority(e.target.value)}
                                       >
                                          <option value="critical">{t("critical")}</option>
                                          <option value="high">{t("high")}</option>
                                          <option value="medium">{t("medium")}</option>
                                          <option value="low">{t("low")}</option>
                                       </select>
                                    </div>

                                    <div className="mb-4">
                                       <label className="block text-sm font-medium mb-1">
                                          {t("targetAudience")}
                                       </label>
                                       <select
                                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                                          value={targetAudience}
                                          onChange={(e) => setTargetAudience(e.target.value)}
                                       >
                                          <option value="all">{t("allUsers")}</option>
                                          <option value="north">{t("northDistrict")}</option>
                                          <option value="central">{t("centralDistrict")}</option>
                                          <option value="east">{t("eastDistrict")}</option>
                                          <option value="emergency">{t("emergencyPersonnel")}</option>
                                       </select>
                                    </div>
                                 </div>

                                 <div>
                                    <div className="mb-4">
                                       <label className="block text-sm font-medium mb-1">
                                          {t("messageTitle")}
                                       </label>
                                       <input
                                          type="text"
                                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700"
                                          placeholder={t("enterMessageTitle")}
                                          value={messageTitle}
                                          onChange={(e) => setMessageTitle(e.target.value)}
                                       />
                                    </div>

                                    <div className="mb-4 h-full">
                                       <label className="block text-sm font-medium mb-1">
                                          {t("messageContent")}
                                       </label>
                                       <textarea
                                          className="w-full p-2 border border-gray-300 dark:border-gray-600 rounded-md bg-white dark:bg-gray-700 h-32 resize-none"
                                          placeholder={t("enterYourMessage")}
                                          value={broadcastMessage}
                                          onChange={(e) => setBroadcastMessage(e.target.value)}
                                       />
                                    </div>
                                 </div>

                                 <button
                                    className="col-span-2 flex items-center justify-center px-4 py-2 bg-purple-600 text-white rounded-md hover:bg-purple-700 disabled:opacity-50 disabled:cursor-not-allowed"
                                    onClick={handleBroadcast}
                                    disabled={!broadcastMessage.trim() || !messageCategory || !messagePriority}
                                 >
                                    <FiSend className="mr-2" />
                                    {t("broadcast")}
                                 </button>
                              </div>
                           </div>
                        )}

                        {/* User Messages Tab */}
                        {activeTab === 1 && (
                           <div className="space-y-4">
                              <div className="flex justify-between items-center mb-2">
                                 <h2 className="text-lg font-semibold">
                                    {t("userMessages")}
                                 </h2>
                                 <div className="flex items-center gap-2">
                                    <select
                                       className="w-auto"
                                       placeholder={t("filterByCategory")}
                                    >
                                       <option value="all">{t("allMessages")}</option>
                                       {categories.map((category) => (
                                          <option
                                             key={category}
                                             value={category}
                                          >
                                             {t(category)}
                                          </option>
                                       ))}
                                    </select>
                                    <select
                                       className="w-auto"
                                       placeholder={t("filterByStatus")}
                                    >
                                       <option value="all">{t("allStatuses")}</option>
                                       <option value="pending">{t("requestPending")}</option>
                                       <option value="inProgress">{t("requestInProgress")}</option>
                                       <option value="resolved">{t("requestResolved")}</option>
                                    </select>
                                 </div>
                              </div>

                              {userRequests.length > 0 ? (
                                 <div className="space-y-4">
                                    {userRequests.map((request) => (
                                       <div
                                          key={request.id}
                                          className="p-4 border border-gray-200 dark:border-gray-700 rounded-md bg-white dark:bg-gray-700"
                                       >
                                          <div className="flex flex-col md:flex-row justify-between">
                                             <div className="flex-1 mb-2">
                                                <div className="flex mb-2 items-center">
                                                   <input
                                                      type="checkbox"
                                                      checked={selectedRequests.includes(request.id)}
                                                      onChange={() => handleRequestSelect(request.id)}
                                                      className="mr-3"
                                                   />
                                                   <Badge
                                                      className={`${getPriorityColor(request.priority)} mr-2`}
                                                   >
                                                      {t(request.priority)}
                                                   </Badge>
                                                   <span className="font-bold">
                                                      {request.sender} - {request.userLocation}
                                                   </span>
                                                </div>

                                                <div className="flex mb-2 items-center">
                                                   {getCategoryIcon(request.category)}
                                                   <span
                                                      className="font-medium text-gray-600 dark:text-gray-400"
                                                   >
                                                      {t(request.category)}
                                                   </span>
                                                </div>

                                                <span className="text-gray-500 text-sm">
                                                   {request.message}
                                                </span>

                                                <div className="flex items-center font-sm text-gray-500 mt-2">
                                                   <span>
                                                      {new Date(request.timestamp).toLocaleString()}
                                                   </span>
                                                   <Badge
                                                      className={getRequestStatusColor(request.status)}
                                                   >
                                                      {getRequestStatusLabel(request.status)}
                                                   </Badge>
                                                </div>
                                             </div>

                                             <div className="flex flex-col md:flex-row items-center justify-end">
                                                {request.status === "pending" && (
                                                   <>
                                                      <button
                                                         className="text-sm text-blue-500 hover:text-blue-700 mr-2"
                                                         onClick={() => handleUpdateRequestStatus(request.id, "inProgress")}
                                                      >
                                                         {t("startProcessing")}
                                                      </button>
                                                      <button
                                                         className="text-sm text-green-500 hover:text-green-700"
                                                         onClick={() => handleUpdateRequestStatus(request.id, "resolved")}
                                                      >
                                                         {t("markResolved")}
                                                      </button>
                                                   </>
                                                )}

                                                {request.status === "inProgress" && (
                                                   <button
                                                      className="text-sm text-green-500 hover:text-green-700"
                                                      onClick={() => handleUpdateRequestStatus(request.id, "resolved")}
                                                   >
                                                      {t("markResolved")}
                                                   </button>
                                                )}

                                                <button
                                                   className="text-sm text-purple-500 hover:text-purple-700"
                                                   onClick={(e) => {
                                                      e.stopPropagation();
                                                      handleRequestSelect(request.id);
                                                   }}
                                                >
                                                   {t("reply")}
                                                </button>
                                             </div>
                                          </div>
                                       </div>
                                    ))}
                                 </div>
                              ) : (
                                 <div className="p-6 text-center border border-gray-200 dark:border-gray-700 rounded-md">
                                    <FiMessageSquare className="text-gray-400 w-10 h-10 mb-3" />
                                    <h2 className="text-md font-semibold mb-2">
                                       {t("noUserMessages") || "No User Messages"}
                                    </h2>
                                    <p>
                                       {t("noUserMessagesDesc") || "There are no user messages or help requests at this time."}
                                    </p>
                                 </div>
                              )}

                              {selectedRequests.length > 0 && (
                                 <div className="flex justify-between items-center mt-2">
                                    <span>
                                       {selectedRequests.length} {selectedRequests.length === 1 ? t("itemSelected") : t("itemsSelected")}
                                    </span>
                                    <div className="flex items-center gap-2">
                                       <button
                                          className="text-sm text-blue-500 hover:text-blue-700"
                                          onClick={() => {
                                             selectedRequests.forEach((id) => handleUpdateRequestStatus(id, "inProgress"));
                                             setSelectedRequests([]);
                                          }}
                                       >
                                          {t("processSelected")}
                                       </button>
                                       <button
                                          className="text-sm text-green-500 hover:text-green-700"
                                          onClick={() => {
                                             selectedRequests.forEach((id) => handleUpdateRequestStatus(id, "resolved"));
                                             setSelectedRequests([]);
                                          }}
                                       >
                                          {t("resolveSelected")}
                                       </button>
                                    </div>
                                 </div>
                              )}
                           </div>
                        )}

                        {/* Nodes Tab */}
                        {activeTab === 2 && (
                           <div className="space-y-4">
                              <h2 className="text-lg font-semibold mb-2">
                                 {t("networkNodes")}
                              </h2>

                              {mockNodes.map((node) => (
                                 <div
                                    key={node.id}
                                    className="p-4 border border-gray-200 dark:border-gray-700 rounded-md"
                                 >
                                    <div className="flex justify-between items-center">
                                       <h3 className="text-sm font-semibold">
                                          {typeof node.name === "function" ? node.name(t) : node.name}
                                       </h3>
                                       <Badge
                                          className={getStatusColor(node.status)}
                                       >
                                          {node.status === "online" ? t("online") : t("offline")}
                                       </Badge>
                                    </div>
                                    <div className="mt-2 grid grid-cols-3 gap-4">
                                       <div className="text-sm text-gray-600 dark:text-gray-400">
                                          {t("connectedUsers")}
                                       </div>
                                       <div className="text-sm text-gray-600 dark:text-gray-400">
                                          {node.users}
                                       </div>
                                       <div className="text-sm text-gray-600 dark:text-gray-400">
                                          {t("batteryLevel")}
                                       </div>
                                       <div className="text-sm text-gray-600 dark:text-gray-400">
                                          {node.battery}%
                                       </div>
                                       <div className="text-sm text-gray-600 dark:text-gray-400">
                                          {t("signalStrength")}
                                       </div>
                                       <Badge
                                          className={getSignalColor(node.signal)}
                                       >
                                          {t(node.signal)}
                                       </Badge>
                                    </div>
                                 </div>
                              ))}
                           </div>
                        )}

                        {/* Templates Tab */}
                        {activeTab === 3 && (
                           <div className="space-y-4">
                              <div className="flex justify-between items-center mb-2">
                                 <h2 className="text-lg font-semibold">
                                    {t("messageTemplates")}
                                 </h2>
                                 <button
                                    className="text-sm text-purple-500 hover:text-purple-700"
                                    onClick={handleAddNewTemplate}
                                 >
                                    {t("addTemplate")}
                                 </button>
                              </div>

                              {templates.length > 0 ? (
                                 templates.map((template) => (
                                    <div
                                       key={template.id}
                                       className="p-4 border border-gray-200 dark:border-gray-700 rounded-md cursor-pointer hover:bg-gray-100 dark:hover:bg-gray-800"
                                       onClick={() => handleViewTemplate(template)}
                                    >
                                       <div className="grid grid-cols-4 gap-4 items-center">
                                          <div>
                                             <h3 className="font-semibold">
                                                {t(template.name)}
                                             </h3>
                                             <span className="text-sm text-gray-500">
                                                {t("category")}: {t(template.category)}
                                             </span>
                                          </div>
                                          <Badge
                                             className={getPriorityColor(template.priority)}
                                          >
                                             {t(template.priority)}
                                          </Badge>
                                          <div className="text-sm">
                                             {t("usedTimes", { count: template.usageCount })}
                                          </div>
                                          <div className="flex items-center justify-end">
                                             <button
                                                className="text-sm text-blue-500 hover:text-blue-700 mr-2"
                                                onClick={(e) => {
                                                   e.stopPropagation();
                                                   handleEditTemplate(template);
                                                }}
                                             >
                                                {t("edit")}
                                             </button>
                                             <button
                                                className="text-sm text-red-500 hover:text-red-700"
                                                onClick={(e) => {
                                                   e.stopPropagation();
                                                   handleDeleteTemplate(template);
                                                }}
                                             >
                                                {t("delete")}
                                             </button>
                                          </div>
                                       </div>
                                    </div>
                                 ))
                              ) : (
                                 <div className="p-6 text-center border border-gray-200 dark:border-gray-700 rounded-md">
                                    <h2 className="text-md font-semibold mb-2">
                                       {t("noTemplates") || "No Templates"}
                                    </h2>
                                    <p>
                                       {t("noTemplatesDesc") || 'There are no message templates defined yet. Click "Add Template" to create one.'}
                                    </p>
                                 </div>
                              )}
                           </div>
                        )}

                        {/* System Logs Tab */}
                        {activeTab === 4 && (
                           <div className="space-y-4">
                              <h2 className="text-lg font-semibold mb-2">
                                 {t("systemLogs")}
                              </h2>

                              <div className="p-4 border border-gray-200 dark:border-gray-700 rounded-md font-mono font-sm bg-gray-50 dark:bg-gray-800 overflow-x-auto h-400px overflow-y-scroll">
                                 <span className="text-green-500">
                                    [2025-05-11 08:15:23] INFO: System started successfully
                                 </span>
                                 <span className="text-blue-500">
                                    [2025-05-11 08:16:45] INFO: Node 'North District Hub' connected
                                 </span>
                                 <span className="text-blue-500">
                                    [2025-05-11 08:17:12] INFO: Node 'Central Square' connected
                                 </span>
                                 <span className="text-yellow-500">
                                    [2025-05-11 08:18:03] WARN: Node 'East Hospital' battery level low (23%)
                                 </span>
                                 <span className="text-blue-500">
                                    [2025-05-11 08:20:41] INFO: User broadcast sent to all nodes
                                 </span>
                                 <span className="text-red-500">
                                    [2025-05-11 08:32:17] ERROR: Connection to node 'East Hospital' lost
                                 </span>
                                 <span className="text-blue-500">
                                    [2025-05-11 08:45:22] INFO: 24 users connected to 'North District Hub'
                                 </span>
                                 <span className="text-blue-500">
                                    [2025-05-11 09:05:11] INFO: Message template 'Evacuation Alert' used
                                 </span>
                                 <span className="text-blue-500">
                                    [2025-05-11 09:15:33] INFO: Node 'School Zone' connected
                                 </span>
                                 <span className="text-yellow-500">
                                    [2025-05-11 09:20:15] WARN: Network congestion detected in 'Central Square'
                                 </span>
                              </div>
                           </div>
                        )}
                     </div>
                  </div>
               </main>
            </div>
         </div>

         {/* Edit Template Modal */}
         {isEditOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
               <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                     <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                  </div>

                  <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                     <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                           <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                 {selectedTemplate?.id.includes("new")
                                    ? t("addTemplate")
                                    : t("editTemplate")}
                              </h3>
                              <div className="mt-4 space-y-4">
                                 {selectedTemplate && (
                                    <>
                                       <div>
                                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                             {t("templateName")}
                                          </label>
                                          <select
                                             className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700"
                                             value={selectedTemplate.name}
                                             onChange={(e) =>
                                                handleTemplateFormChange("name", e.target.value)
                                             }
                                          >
                                             <option value="evacuationAlert">
                                                {t("evacuationAlert")}
                                             </option>
                                             <option value="medicalAidAvailable">
                                                {t("medicalAidAvailable")}
                                             </option>
                                             <option value="powerOutageUpdate">
                                                {t("powerOutageUpdate")}
                                             </option>
                                             <option value="foodDistribution">
                                                {t("foodDistribution")}
                                             </option>
                                          </select>
                                       </div>

                                       <div>
                                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                             {t("category")}
                                          </label>
                                          <select
                                             className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700"
                                             value={selectedTemplate.category}
                                             onChange={(e) =>
                                                handleTemplateFormChange("category", e.target.value)
                                             }
                                          >
                                             {categories.map((category) => (
                                                <option key={category} value={category}>
                                                   {t(category)}
                                                </option>
                                             ))}
                                          </select>
                                       </div>

                                       <div>
                                          <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                             {t("priority")}
                                          </label>
                                          <select
                                             className="mt-1 block w-full pl-3 pr-10 py-2 text-base border-gray-300 dark:border-gray-600 focus:outline-none focus:ring-purple-500 focus:border-purple-500 sm:text-sm rounded-md dark:bg-gray-700"
                                             value={selectedTemplate.priority}
                                             onChange={(e) =>
                                                handleTemplateFormChange("priority", e.target.value)
                                             }
                                          >
                                             <option value="critical">{t("critical")}</option>
                                             <option value="high">{t("high")}</option>
                                             <option value="medium">{t("medium")}</option>
                                             <option value="low">{t("low")}</option>
                                          </select>
                                       </div>
                                    </>
                                 )}
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                           type="button"
                           className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-blue-600 text-base font-medium text-white hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 sm:ml-3 sm:w-auto sm:text-sm"
                           onClick={handleSaveTemplate}
                        >
                           {t("save")}
                        </button>
                        <button
                           type="button"
                           className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                           onClick={() => setIsEditOpen(false)}
                        >
                           {t("cancel")}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* Delete Confirmation Modal */}
         {isDeleteOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
               <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                     <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                  </div>

                  <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                     <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                           <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                 {t("confirmDelete")}
                              </h3>
                              <div className="mt-2">
                                 <p className="text-sm text-gray-500 dark:text-gray-400">
                                    {t("deleteTemplateConfirmation")}
                                    {selectedTemplate && (
                                       <span className="font-bold"> {t(selectedTemplate.name)}</span>
                                    )}
                                 </p>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                           type="button"
                           className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-red-600 text-base font-medium text-white hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500 sm:ml-3 sm:w-auto sm:text-sm"
                           onClick={handleConfirmDelete}
                        >
                           {t("delete")}
                        </button>
                        <button
                           type="button"
                           className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                           onClick={() => setIsDeleteOpen(false)}
                        >
                           {t("cancel")}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}

         {/* View Template Modal */}
         {isViewOpen && (
            <div className="fixed inset-0 z-50 overflow-y-auto">
               <div className="flex items-center justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
                  <div className="fixed inset-0 transition-opacity" aria-hidden="true">
                     <div className="absolute inset-0 bg-gray-500 dark:bg-gray-900 opacity-75"></div>
                  </div>

                  <div className="inline-block align-bottom bg-white dark:bg-gray-800 rounded-lg text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full">
                     <div className="bg-white dark:bg-gray-800 px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                        <div className="sm:flex sm:items-start">
                           <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left w-full">
                              <h3 className="text-lg leading-6 font-medium text-gray-900 dark:text-white">
                                 {templateContent.name}
                              </h3>
                              <div className="mt-4">
                                 <div className="mb-4">
                                    <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                                       {t("messageContent")}
                                    </label>
                                    <textarea
                                       className="mt-1 block w-full border-gray-300 dark:border-gray-600 rounded-md shadow-sm focus:ring-purple-500 focus:border-purple-500 sm:text-sm dark:bg-gray-700"
                                       rows="6"
                                       value={editingTemplateContent}
                                       onChange={(e) => setEditingTemplateContent(e.target.value)}
                                    />
                                 </div>

                                 <div className="grid grid-cols-2 gap-4 mb-4">
                                    <div>
                                       <span className="font-bold">{t("category")}:</span>
                                       <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                                          getPriorityColor(templateContent.category || "medium") === "red"
                                             ? "bg-red-100 text-red-800"
                                             : getPriorityColor(templateContent.category || "medium") === "yellow"
                                             ? "bg-yellow-100 text-yellow-800"
                                             : "bg-blue-100 text-blue-800"
                                       }`}>
                                          {templateContent.category ? t(templateContent.category) : ""}
                                       </span>
                                    </div>
                                    <div>
                                       <span className="font-bold">{t("priority")}:</span>
                                       <span className={`ml-2 px-2 py-1 text-xs font-semibold rounded-full ${
                                          getPriorityColor(templateContent.priority || "medium") === "red"
                                             ? "bg-red-100 text-red-800"
                                             : getPriorityColor(templateContent.priority || "medium") === "yellow"
                                             ? "bg-yellow-100 text-yellow-800"
                                             : "bg-blue-100 text-blue-800"
                                       }`}>
                                          {templateContent.priority ? t(templateContent.priority) : ""}
                                       </span>
                                    </div>
                                 </div>
                              </div>
                           </div>
                        </div>
                     </div>
                     <div className="bg-gray-50 dark:bg-gray-700 px-4 py-3 sm:px-6 sm:flex sm:flex-row-reverse">
                        <button
                           type="button"
                           className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-purple-600 text-base font-medium text-white hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:ml-3 sm:w-auto sm:text-sm"
                           onClick={handleSendTemplate}
                        >
                           <FiSend className="mr-2" />
                           {t("send")}
                        </button>
                        <button
                           type="button"
                           className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                           onClick={handleSaveTemplateContent}
                        >
                           {t("save")}
                        </button>
                        <button
                           type="button"
                           className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 dark:border-gray-600 shadow-sm px-4 py-2 bg-white dark:bg-gray-800 text-base font-medium text-gray-700 dark:text-gray-300 hover:bg-gray-50 dark:hover:bg-gray-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                           onClick={() => setIsViewOpen(false)}
                        >
                           {t("cancel")}
                        </button>
                     </div>
                  </div>
               </div>
            </div>
         )}
      </div>
   );
};

export default AdminDashboard;
