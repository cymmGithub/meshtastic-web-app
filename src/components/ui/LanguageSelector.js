import React from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

const LanguageSelector = () => {
  const { language, setLanguage, t } = useLanguage();

  return (
    <div className="language-selector">
      <label htmlFor="language-select">{t('selectLanguage')}: </label>
      <select
        id="language-select"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
        className="language-select"
      >
        <option value="pl">Polski</option>
        <option value="en">English</option>
        <option value="ua">Українська</option>
        <option value="ru">Русский</option>
      </select>
    </div>
  );
};

export default LanguageSelector; 