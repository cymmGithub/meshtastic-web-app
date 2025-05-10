export const messageTemplates = {
  urgentHelp: {
    pl: [
      "Potrzebuję natychmiastowej pomocy w [lokalizacja].",
      "Pilna sytuacja: potrzebna pomoc przy [opis problemu].",
      "SOS! Sytuacja kryzysowa w [lokalizacja]. Potrzebna pomoc."
    ],
    en: [
      "I need immediate assistance at [location].",
      "Urgent situation: help needed with [problem description].",
      "SOS! Emergency situation at [location]. Help needed."
    ],
    ua: [
      "Мені потрібна негайна допомога в [розташування].",
      "Термінова ситуація: потрібна допомога з [опис проблеми].",
      "SOS! Кризова ситуація в [розташування]. Потрібна допомога."
    ],
    ru: [
      "Мне нужна срочная помощь в [местоположение].",
      "Срочная ситуация: нужна помощь с [описание проблемы].",
      "SOS! Кризисная ситуация в [местоположение]. Нужна помощь."
    ]
  },
  medicalEmergency: {
    pl: [
      "Potrzebna pomoc medyczna: [opis problemu] w [lokalizacja].",
      "Sytuacja medyczna: osoba z [opis stanu] potrzebuje pomocy.",
      "Pilnie potrzebny personel medyczny w [lokalizacja]."
    ],
    en: [
      "Medical help needed: [problem description] at [location].",
      "Medical situation: person with [condition description] needs assistance.",
      "Medical personnel urgently needed at [location]."
    ],
    ua: [
      "Потрібна медична допомога: [опис проблеми] в [розташування].",
      "Медична ситуація: людина з [опис стану] потребує допомоги.",
      "Терміново потрібен медичний персонал у [розташування]."
    ],
    ru: [
      "Нужна медицинская помощь: [описание проблемы] в [местоположение].",
      "Медицинская ситуация: человек с [описание состояния] нуждается в помощи.",
      "Срочно требуется медицинский персонал в [местоположение]."
    ]
  },
  evacuation: {
    pl: [
      "Ewakuacja potrzebna dla [liczba osób] osób z [lokalizacja].",
      "Informacja o ewakuacji: zbiórka w [lokalizacja] o [czas].",
      "Pilna ewakuacja: udaj się do [punkt zbiórki]. Trasa przez [opis trasy]."
    ],
    en: [
      "Evacuation needed for [number of people] people from [location].",
      "Evacuation info: gathering at [location] at [time].",
      "Urgent evacuation: proceed to [gathering point]. Route through [route description]."
    ],
    ua: [
      "Потрібна евакуація для [кількість людей] людей з [розташування].",
      "Інформація про евакуацію: збір у [розташування] о [час].",
      "Термінова евакуація: прямуйте до [пункт збору]. Маршрут через [опис маршруту]."
    ],
    ru: [
      "Нужна эвакуация для [количество людей] человек из [местоположение].",
      "Информация об эвакуации: сбор в [местоположение] в [время].",
      "Срочная эвакуация: направляйтесь к [пункт сбора]. Маршрут через [описание маршрута]."
    ]
  },
  resources: {
    pl: [
      "Dostępne zasoby: [lista zasobów] w [lokalizacja].",
      "Punkt dystrybucji: [typ zasobów] dostępne w [lokalizacja] od [czas].",
      "Potrzebne zasoby: [lista potrzeb] pilnie potrzebne w [lokalizacja]."
    ],
    en: [
      "Available resources: [resource list] at [location].",
      "Distribution point: [resource type] available at [location] from [time].",
      "Resources needed: [needs list] urgently required at [location]."
    ],
    ua: [
      "Доступні ресурси: [список ресурсів] у [розташування].",
      "Пункт розподілу: [тип ресурсів] доступні в [розташування] з [час].",
      "Потрібні ресурси: [список потреб] терміново потрібні в [розташування]."
    ],
    ru: [
      "Доступные ресурсы: [список ресурсов] в [местоположение].",
      "Пункт распределения: [тип ресурсов] доступны в [местоположение] с [время].",
      "Необходимые ресурсы: [список потребностей] срочно требуются в [местоположение]."
    ]
  },
  infrastructure: {
    pl: [
      "Aktualizacja infrastruktury: [usługa] [stan] w [lokalizacja].",
      "Uwaga: [infrastruktura] niesprawna w [lokalizacja] do [przewidywany czas naprawy].",
      "Stan infrastruktury: [usługa] działa z ograniczeniami w [lokalizacja]."
    ],
    en: [
      "Infrastructure update: [service] [status] in [location].",
      "Notice: [infrastructure] down in [location] until [estimated repair time].",
      "Infrastructure status: [service] operating with limitations in [location]."
    ],
    ua: [
      "Оновлення інфраструктури: [сервіс] [стан] у [розташування].",
      "Увага: [інфраструктура] не працює в [розташування] до [орієнтовний час ремонту].",
      "Стан інфраструктури: [сервіс] працює з обмеженнями в [розташування]."
    ],
    ru: [
      "Обновление инфраструктуры: [сервис] [состояние] в [местоположение].",
      "Внимание: [инфраструктура] не работает в [местоположение] до [ожидаемое время ремонта].",
      "Состояние инфраструктуры: [сервис] работает с ограничениями в [местоположение]."
    ]
  }
};

export const getCategoryTemplates = (category, language) => {
  if (!messageTemplates[category] || !messageTemplates[category][language]) {
    return [];
  }
  return messageTemplates[category][language];
};

export const categories = [
  'urgentHelp',
  'medicalEmergency',
  'evacuation',
  'resources',
  'infrastructure'
]; 