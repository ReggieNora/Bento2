import React, { useState } from 'react';
import ToggleSwitch from './ToggleSwitch';
import GradientButton from './GradientButton';
import { User, Bell, CreditCard, Shield, HelpCircle } from 'lucide-react';

interface SettingSection {
  title: string;
  icon: React.ReactNode;
  settings: {
    type: 'toggle' | 'input' | 'select';
    label: string;
    value: any;
    options?: string[];
  }[];
}

interface SettingsCardProps {
  forceExpanded?: boolean;
}

const SettingsCard: React.FC<SettingsCardProps> = ({ forceExpanded = false }) => {
  const [isExpanded, setIsExpanded] = useState(forceExpanded);
  const [settings, setSettings] = useState({
    // Basic Settings
    darkMode: true,
    pushNotifications: true,
    locationAccess: false,
    // Account Settings
    email: 'user@example.com',
    password: '********',
    twoFactorAuth: false,
    // Subscription Settings
    subscription: 'pro',
    autoRenew: true,
    // Privacy Settings
    profileVisibility: 'public',
    dataCollection: true,
    marketingEmails: false,
  });

  // Force expanded state when forceExpanded prop is true
  React.useEffect(() => {
    if (forceExpanded) {
      setIsExpanded(true);
    }
  }, [forceExpanded]);

  const handleToggle = (setting: keyof typeof settings) => {
    setSettings(prev => ({
      ...prev,
      [setting]: !prev[setting]
    }));
  };

  const handleInputChange = (setting: keyof typeof settings, value: string) => {
    setSettings(prev => ({
      ...prev,
      [setting]: value
    }));
  };

  const settingSections: SettingSection[] = [
    {
      title: 'Account',
      icon: <User className="w-5 h-5" />,
      settings: [
        { type: 'input', label: 'Email', value: settings.email },
        { type: 'input', label: 'Password', value: settings.password },
        { type: 'toggle', label: 'Two-Factor Authentication', value: settings.twoFactorAuth },
      ]
    },
    {
      title: 'Subscription',
      icon: <CreditCard className="w-5 h-5" />,
      settings: [
        { 
          type: 'select', 
          label: 'Plan', 
          value: settings.subscription,
          options: ['free', 'pro', 'enterprise']
        },
        { type: 'toggle', label: 'Auto-Renew', value: settings.autoRenew },
      ]
    },
    {
      title: 'Notifications',
      icon: <Bell className="w-5 h-5" />,
      settings: [
        { type: 'toggle', label: 'Push Notifications', value: settings.pushNotifications },
        { type: 'toggle', label: 'Email Notifications', value: settings.marketingEmails },
      ]
    },
    {
      title: 'Privacy',
      icon: <Shield className="w-5 h-5" />,
      settings: [
        { 
          type: 'select', 
          label: 'Profile Visibility', 
          value: settings.profileVisibility,
          options: ['public', 'private', 'connections']
        },
        { type: 'toggle', label: 'Data Collection', value: settings.dataCollection },
      ]
    },
    {
      title: 'Preferences',
      icon: <HelpCircle className="w-5 h-5" />,
      settings: [
        { type: 'toggle', label: 'Dark Mode', value: settings.darkMode },
        { type: 'toggle', label: 'Location Access', value: settings.locationAccess },
      ]
    }
  ];

  if (!isExpanded && !forceExpanded) {
    return (
      <div className="relative w-[320px]">
        <div className="flex flex-col h-[480px] p-8 rounded-3xl 
                      bg-white/10 backdrop-blur-md border border-white/20
                      shadow-xl shadow-black/20">
          
          <h2 className="text-2xl font-bold text-white tracking-wide mb-6 text-center
                       text-shadow-glow">Settings</h2>
          
          <div className="flex-1 space-y-4">
            <ToggleSwitch
              label="Dark Mode"
              isOn={settings.darkMode}
              onToggle={() => handleToggle('darkMode')}
            />
            <ToggleSwitch
              label="Push Notifications"
              isOn={settings.pushNotifications}
              onToggle={() => handleToggle('pushNotifications')}
            />
            <ToggleSwitch
              label="Location Access"
              isOn={settings.locationAccess}
              onToggle={() => handleToggle('locationAccess')}
            />
          </div>
          
          <div className="mt-auto flex flex-col items-center space-y-4">
            <GradientButton onClick={() => setIsExpanded(true)}>
              More Settings
            </GradientButton>
            <GradientButton onClick={() => console.log('Log out clicked')}>
              Log Out
            </GradientButton>
          </div>
        </div>
        
        <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[95%] h-4 
                      bg-black/20 blur-md rounded-full"></div>
      </div>
    );
  }

  return (
    <div className="relative w-full max-w-[700px]">
      <div
        className="flex flex-col h-[600px] p-8 rounded-2xl shadow-xl shadow-black/20 border"
        style={{
          background: 'rgba(255,255,255,0.15)',
          border: '1px solid rgba(255,255,255,0.2)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
        }}
      >
        
        <div className="flex justify-between items-center mb-6">
          <h2 className="text-2xl font-bold text-white tracking-wide drop-shadow-lg" style={{letterSpacing: '0.04em'}}>Settings</h2>
          {!forceExpanded && (
            <button
              onClick={() => setIsExpanded(false)}
              className="p-2 bg-white/10 text-white rounded-full hover:bg-white/20 transition-colors duration-200 shadow border border-white/20"
              aria-label="Collapse"
            >
              <svg className="w-5 h-5" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24"><path strokeLinecap="round" strokeLinejoin="round" d="M6 18L18 6M6 6l12 12"/></svg>
            </button>
          )}
        </div>

        <div className="flex-1 overflow-y-auto pr-4 space-y-6 scrollbar-hide">
          {settingSections.map((section) => (
            <div key={section.title} className="bg-white/5 rounded-xl p-4 border border-white/10">
              <div className="flex items-center space-x-2 mb-4 bg-white/10 rounded-lg px-2 py-1">
                <span className="text-green-400 drop-shadow-glow">{section.icon}</span>
                <h3 className="text-white font-semibold tracking-wide drop-shadow-md" style={{letterSpacing: '0.03em'}}>{section.title}</h3>
              </div>
              <div className="space-y-4">
                {section.settings.map((setting) => (
                  <div key={setting.label} className="flex items-center gap-4 py-2">
                    <span className="text-white/80 font-medium text-base min-w-[180px] w-[180px] text-left">
                      {setting.label}
                    </span>
                    <div className="flex-1 flex justify-end">
                      {setting.type === 'toggle' && (
                        <ToggleSwitch
                          label={setting.label}
                          isOn={setting.value}
                          onToggle={() => handleToggle(setting.label.toLowerCase().replace(/\s+/g, '').replace('-', '') as keyof typeof settings)}
                        />
                      )}
                      {setting.type === 'input' && (
                        <input
                          type={setting.label.toLowerCase().includes('password') ? 'password' : 'text'}
                          value={setting.value}
                          onChange={(e) => handleInputChange(setting.label.toLowerCase().replace(/\s+/g, '') as keyof typeof settings, e.target.value)}
                          className="bg-white/15 border border-white/25 rounded-lg px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-green-400/40 focus:border-green-400/40 transition-all duration-200 backdrop-blur-sm w-[220px] min-w-0"
                        />
                      )}
                      {setting.type === 'select' && (
                        <select
                          value={setting.value}
                          onChange={(e) => handleInputChange(setting.label.toLowerCase().replace(/\s+/g, '') as keyof typeof settings, e.target.value)}
                          className="bg-white/15 border border-white/25 rounded-lg px-3 py-2 text-white focus:outline-none focus:ring-2 focus:ring-green-400/40 focus:border-green-400/40 transition-all duration-200 backdrop-blur-sm w-[220px] min-w-0"
                        >
                          {setting.options?.map(option => (
                            <option key={option} value={option} className="bg-gray-800 text-white">
                              {option.charAt(0).toUpperCase() + option.slice(1)}
                            </option>
                          ))}
                        </select>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
        <style>{`
          .scrollbar-hide::-webkit-scrollbar { display: none; }
          .scrollbar-hide { -ms-overflow-style: none; scrollbar-width: none; }
        `}</style>

        <div className="mt-8 flex gap-6 justify-end">
          <GradientButton className="rounded-2xl px-6 py-2 shadow-lg border border-white/25" onClick={() => console.log('Save changes clicked')}>
            Save Changes
          </GradientButton>
          <GradientButton className="rounded-2xl px-6 py-2 shadow-lg border border-white/25" onClick={() => console.log('Log out clicked')}>
            Log Out
          </GradientButton>
        </div>
      </div>
      
      <div className="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-[95%] h-4 
                    bg-black/20 blur-md rounded-full"></div>
    </div>
  );
};

export default SettingsCard;