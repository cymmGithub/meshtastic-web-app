import React, { useState } from 'react';
import { useLanguage } from '../../i18n/LanguageContext';

const DeviceConnection = ({ 
  deviceAddress, 
  onDeviceAddressChange, 
  connectionStatus, 
  onConnect, 
  onDisconnect,
  isConnected
}) => {
  const { t } = useLanguage();
  
  return (
    <div className="device-connection">
      <div className="connection-form">
        <div className="input-group">
          <label htmlFor="deviceAddress">{t('deviceAddress')}: </label>
          <input
            type="text"
            id="deviceAddress"
            value={deviceAddress}
            onChange={(e) => onDeviceAddressChange(e.target.value)}
            placeholder="e.g., 192.168.1.100"
            className="device-address-input"
          />
        </div>
        
        <div className="connection-actions">
          {!isConnected ? (
            <button 
              onClick={onConnect} 
              disabled={connectionStatus === t('connecting')}
              className="connect-button"
            >
              {connectionStatus === t('connecting') ? t('connecting') : t('connectButton')}
            </button>
          ) : (
            <button 
              onClick={onDisconnect}
              className="disconnect-button"
            >
              {t('disconnectButton')}
            </button>
          )}
        </div>
      </div>
      
      <div className="connection-status">
        <span className="status-label">{t('connectionStatus')}: </span>
        <span className={`status-value status-${connectionStatus.toLowerCase().replace(/\s+/g, '-')}`}>
          {connectionStatus}
        </span>
      </div>
      
      <p className="connection-hint">
        <small>
          {t('ensureDeviceReachable')}
        </small>
      </p>
    </div>
  );
};

export default DeviceConnection; 