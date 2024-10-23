export interface SettingsFormData {
  avatarFile: File | null;
  apiKey: string;
  apiUrl: string;
}

export interface PreviewProps {
  avatarFile: File;
  apiKey: string;
  apiUrl: string;
  onStartChat: () => void;
  onBack: () => void;
}

export interface ChatProps {
  avatarFile: File;
  apiKey: string;
  apiUrl: string;
  onBack: () => void;
}