// Mock messages with translations for multilingual support
export const mockMessages = [
  {
    id: "msg-001",
    sender: {
      id: "gov-001",
      name: {
        en: "Civil Defense Headquarters",
        pl: "Sztab Obrony Cywilnej",
        ua: "Штаб цивільної оборони",
        ru: "Штаб гражданской обороны"
      },
      type: "government",
      avatar: null
    },
    category: "evacuation",
    priority: "critical", // critical, high, medium, low
    targetAudience: ["all-citizens", "district-a"],
    title: {
      en: "Immediate Evacuation Required",
      pl: "Wymagana natychmiastowa ewakuacja",
      ua: "Потрібна негайна евакуація",
      ru: "Требуется немедленная эвакуация"
    },
    content: {
      en: "Due to rising flood waters, all residents of District A must evacuate immediately to designated shelters. Take only essential items. Emergency services are on route to assist vulnerable individuals.",
      pl: "Z powodu podnoszących się wód powodziowych, wszyscy mieszkańcy Dzielnicy A muszą natychmiast ewakuować się do wyznaczonych schronień. Zabierz tylko niezbędne rzeczy. Służby ratunkowe są w drodze, aby pomóc osobom wymagającym wsparcia.",
      ua: "Через підняття паводкових вод, усі мешканці Району А повинні негайно евакуюватися до визначених притулків. Беріть лише найнеобхідніші речі. Рятувальні служби вже в дорозі, щоб допомогти вразливим особам.",
      ru: "Из-за поднимающихся паводковых вод, все жители Района А должны немедленно эвакуироваться в назначенные убежища. Берите только самое необходимое. Спасательные службы уже в пути, чтобы помочь уязвимым лицам."
    },
    timestamp: "2023-06-15T14:30:00Z",
    expiresAt: "2023-06-16T14:30:00Z",
    requiresAcknowledgment: true,
    acknowledged: false
  },
  {
    id: "msg-002",
    sender: {
      id: "med-001",
      name: {
        en: "Regional Medical Center",
        pl: "Regionalne Centrum Medyczne",
        ua: "Регіональний медичний центр",
        ru: "Региональный медицинский центр"
      },
      type: "medical",
      avatar: null
    },
    category: "medicalEmergency",
    priority: "high",
    targetAudience: ["all-citizens"],
    title: {
      en: "Mobile Medical Units Deployed",
      pl: "Rozmieszczono mobilne jednostki medyczne",
      ua: "Розгорнуто мобільні медичні підрозділи",
      ru: "Развернуты мобильные медицинские подразделения"
    },
    content: {
      en: "Mobile medical units have been deployed to the following locations: Central Square, Northern School, Eastern Market. If you need medical attention, please proceed to your nearest unit. Priority will be given to urgent cases.",
      pl: "Mobilne jednostki medyczne zostały rozmieszczone w następujących lokalizacjach: Plac Centralny, Szkoła Północna, Wschodni Rynek. Jeśli potrzebujesz pomocy medycznej, udaj się do najbliższej jednostki. Priorytet będą miały pilne przypadki.",
      ua: "Мобільні медичні підрозділи розгорнуто в таких місцях: Центральна Площа, Північна Школа, Східний Ринок. Якщо вам потрібна медична допомога, зверніться до найближчого підрозділу. Пріоритет надаватиметься терміновим випадкам.",
      ru: "Мобильные медицинские подразделения развернуты в следующих местах: Центральная Площадь, Северная Школа, Восточный Рынок. Если вам нужна медицинская помощь, обратитесь в ближайшее подразделение. Приоритет будет отдаваться срочным случаям."
    },
    timestamp: "2023-06-15T15:45:00Z",
    expiresAt: "2023-06-22T15:45:00Z",
    requiresAcknowledgment: false,
    acknowledged: false
  },
  {
    id: "msg-003",
    sender: {
      id: "ngo-001",
      name: {
        en: "Red Cross",
        pl: "Czerwony Krzyż",
        ua: "Червоний Хрест",
        ru: "Красный Крест"
      },
      type: "ngo",
      avatar: null
    },
    category: "resources",
    priority: "medium",
    targetAudience: ["evacuation-centers", "volunteers"],
    title: {
      en: "Supply Distribution Schedule",
      pl: "Harmonogram dystrybucji zasobów",
      ua: "Графік розподілу запасів",
      ru: "График распределения ресурсов"
    },
    content: {
      en: "Food and water distribution will take place at all evacuation centers at 08:00, 13:00, and 18:00 daily. Each person will receive a ration pack and 2L of water. Families with infants can request baby formula at the central distribution point.",
      pl: "Dystrybucja żywności i wody odbędzie się we wszystkich centrach ewakuacyjnych o 08:00, 13:00 i 18:00 codziennie. Każda osoba otrzyma paczkę racji żywnościowych i 2L wody. Rodziny z niemowlętami mogą poprosić o mleko dla niemowląt w centralnym punkcie dystrybucji.",
      ua: "Роздача їжі та води відбуватиметься в усіх центрах евакуації о 08:00, 13:00 та 18:00 щодня. Кожна людина отримає пакет раціону та 2 л води. Сім'ї з немовлятами можуть запросити дитячу суміш у центральному пункті розподілу.",
      ru: "Раздача еды и воды будет проходить во всех эвакуационных центрах в 08:00, 13:00 и 18:00 ежедневно. Каждый человек получит пакет рациона и 2 литра воды. Семьи с младенцами могут запросить детскую смесь в центральном пункте распределения."
    },
    timestamp: "2023-06-15T18:00:00Z",
    expiresAt: "2023-06-22T18:00:00Z",
    requiresAcknowledgment: true,
    acknowledged: true
  },
  {
    id: "msg-004",
    sender: {
      id: "gov-002",
      name: {
        en: "City Mayor's Office",
        pl: "Biuro Burmistrza Miasta",
        ua: "Офіс мера міста",
        ru: "Офис мэра города"
      },
      type: "government",
      avatar: null
    },
    category: "infrastructure",
    priority: "low",
    targetAudience: ["all-citizens"],
    title: {
      en: "Power Restoration Updates",
      pl: "Aktualizacje przywracania zasilania",
      ua: "Оновлення інформації про відновлення електропостачання",
      ru: "Обновления по восстановлению электроснабжения"
    },
    content: {
      en: "Power has been restored to 60% of the affected areas. Crews are working in sectors 3, 4, and 7 currently. Expected restoration for all areas: 48 hours. Priorities are medical facilities and water treatment plants.",
      pl: "Przywrócono zasilanie w 60% obszarów dotkniętych awarią. Ekipy obecnie pracują w sektorach 3, 4 i 7. Przewidywany czas przywrócenia dla wszystkich obszarów: 48 godzin. Priorytetem są placówki medyczne i zakłady uzdatniania wody.",
      ua: "Електропостачання відновлено на 60% постраждалих територій. Наразі бригади працюють у секторах 3, 4 та 7. Очікуване відновлення для всіх районів: 48 годин. Пріоритетами є медичні заклади та водоочисні споруди.",
      ru: "Электроснабжение восстановлено в 60% пострадавших районов. В настоящее время бригады работают в секторах 3, 4 и 7. Ожидаемое восстановление для всех районов: 48 часов. Приоритетом являются медицинские учреждения и водоочистные сооружения."
    },
    timestamp: "2023-06-16T09:15:00Z",
    expiresAt: "2023-06-18T09:15:00Z",
    requiresAcknowledgment: false,
    acknowledged: false
  },
  {
    id: "msg-005",
    sender: {
      id: "police-001",
      name: {
        en: "Police Department",
        pl: "Komenda Policji",
        ua: "Відділ поліції",
        ru: "Полицейский участок"
      },
      type: "emergency-service",
      avatar: null
    },
    category: "urgentHelp",
    priority: "critical",
    targetAudience: ["all-citizens", "evacuation-centers"],
    title: {
      en: "Missing Persons Report Center",
      pl: "Centrum zgłaszania osób zaginionych",
      ua: "Центр повідомлень про зниклих безвісти",
      ru: "Центр сообщений о пропавших без вести"
    },
    content: {
      en: "A Missing Persons Report Center has been established at the Main Police Station. If you cannot locate a family member, please bring a recent photo and their details. Online reporting is available at emergency.police.gov/missing.",
      pl: "Centrum Zgłaszania Osób Zaginionych zostało utworzone w Głównym Komisariacie Policji. Jeśli nie możesz zlokalizować członka rodziny, przynieś aktualne zdjęcie i jego dane. Zgłaszanie online jest dostępne na stronie emergency.police.gov/missing.",
      ua: "У Головному відділенні поліції створено Центр повідомлень про зниклих безвісти. Якщо ви не можете знайти члена сім'ї, принесіть нещодавню фотографію та їхні дані. Онлайн-звітування доступне за адресою emergency.police.gov/missing.",
      ru: "В Главном полицейском участке создан Центр сообщений о пропавших без вести. Если вы не можете найти члена семьи, принесите недавнюю фотографию и их данные. Онлайн-отчетность доступна по адресу emergency.police.gov/missing."
    },
    timestamp: "2023-06-16T11:30:00Z",
    expiresAt: "2023-06-23T11:30:00Z",
    requiresAcknowledgment: true,
    acknowledged: false
  }
];

// Helper functions for messages
export const getPriorityColor = (priority) => {
  switch(priority) {
    case 'critical': return 'red';
    case 'high': return 'orange';
    case 'medium': return 'yellow';
    case 'low': return 'green';
    default: return 'blue';
  }
};

export const getCategoryIcon = (category) => {
  switch(category) {
    case 'evacuation': return 'FiNavigation';
    case 'medicalEmergency': return 'FiActivity';
    case 'resources': return 'FiPackage';
    case 'infrastructure': return 'FiLayers';
    case 'urgentHelp': return 'FiAlertCircle';
    default: return 'FiInfo';
  }
}; 