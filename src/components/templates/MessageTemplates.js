import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';
import { getCategoryTemplates, categories } from '../../utils/templateData';

const MessageTemplates = ({ onSelectTemplate }) => {
  const { language, t } = useLanguage();
  const [selectedCategory, setSelectedCategory] = useState('');
  const templates = selectedCategory ? getCategoryTemplates(selectedCategory, language) : [];

  return (
    <div className="message-templates">
      <h3>{t('messageTemplates')}</h3>
      
      <div className="category-selector">
        <label htmlFor="category-select">{t('selectCategory')}: </label>
        <select
          id="category-select"
          value={selectedCategory}
          onChange={(e) => setSelectedCategory(e.target.value)}
          className="category-select"
        >
          <option value="">{t('selectCategory')}</option>
          {categories.map((category) => (
            <option key={category} value={category}>
              {t(category)}
            </option>
          ))}
        </select>
      </div>

      {selectedCategory && (
        <div className="templates-list">
          {templates.length > 0 ? (
            templates.map((template, index) => (
              <div
                key={index}
                className="template-item"
                onClick={() => onSelectTemplate(template)}
              >
                {template}
              </div>
            ))
          ) : (
            <div className="no-templates">{t('noTemplatesFound')}</div>
          )}
        </div>
      )}
    </div>
  );
};

export default MessageTemplates; 