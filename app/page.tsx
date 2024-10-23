"use client";

import React, { useState } from 'react';
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Upload, Key, Link, ArrowLeft, MessageSquare } from 'lucide-react';
import { toast } from "sonner";
import type { SettingsFormData } from './types';
import ChatUI from './components/ChatUI';
import AvatarPreview from './components/AvatarPreview';

export default function Home() {
  const [formData, setFormData] = useState<SettingsFormData>({
    avatarFile: null,
    apiKey: '',
    apiUrl: ''
  });
  const [showPreview, setShowPreview] = useState(false);
  const [showChat, setShowChat] = useState(false);

  const handleAvatarUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      if (file.name.toLowerCase().endsWith('.vrm')) {
        setFormData(prev => ({ ...prev, avatarFile: file }));
      } else {
        toast.error('VRM形式のファイルをアップロードしてください。');
      }
    }
  };

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handlePreview = () => {
    if (!formData.avatarFile || !formData.apiKey || !formData.apiUrl) {
      toast.error('全ての項目を入力してください。');
      return;
    }
    setShowPreview(true);
  };

  const handleStartChat = () => {
    setShowChat(true);
    setShowPreview(false);
  };

  const handleBackToSettings = () => {
    setShowPreview(false);
    setShowChat(false);
  };

  if (showChat && formData.avatarFile) {
    return (
      <ChatUI
        avatarFile={formData.avatarFile}
        apiKey={formData.apiKey}
        apiUrl={formData.apiUrl}
        onBack={handleBackToSettings}
      />
    );
  }

  if (showPreview && formData.avatarFile) {
    return (
      <AvatarPreview
        avatarFile={formData.avatarFile}
        apiKey={formData.apiKey}
        apiUrl={formData.apiUrl}
        onStartChat={handleStartChat}
        onBack={handleBackToSettings}
      />
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-background to-muted p-4 sm:p-8">
      <div className="max-w-2xl mx-auto">
        <Card className="backdrop-blur-sm bg-background/95">
          <CardHeader>
            <CardTitle className="text-3xl font-bold text-center bg-gradient-to-r from-primary to-blue-600 bg-clip-text text-transparent">
              AIチューバーヒット
            </CardTitle>
          </CardHeader>
          <CardContent className="space-y-6">
            <div className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="avatar" className="flex items-center gap-2">
                  <Upload className="w-4 h-4" />
                  VRMアバターのアップロード
                </Label>
                <div className="flex gap-2">
                  <Input
                    id="avatar"
                    type="file"
                    accept=".vrm"
                    onChange={handleAvatarUpload}
                    className="cursor-pointer"
                  />
                </div>
                {formData.avatarFile && (
                  <p className="text-sm text-muted-foreground">
                    選択されたファイル: {formData.avatarFile.name}
                  </p>
                )}
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiKey" className="flex items-center gap-2">
                  <Key className="w-4 h-4" />
                  Dify APIキー
                </Label>
                <Input
                  id="apiKey"
                  name="apiKey"
                  type="password"
                  value={formData.apiKey}
                  onChange={handleInputChange}
                  placeholder="sk-xxxxxxxxxxxxxxxx"
                />
              </div>

              <div className="space-y-2">
                <Label htmlFor="apiUrl" className="flex items-center gap-2">
                  <Link className="w-4 h-4" />
                  Dify API URL
                </Label>
                <Input
                  id="apiUrl"
                  name="apiUrl"
                  type="url"
                  value={formData.apiUrl}
                  onChange={handleInputChange}
                  placeholder="https://api.dify.ai/v1"
                />
              </div>
            </div>

            <Button
              onClick={handlePreview}
              className="w-full"
              size="lg"
            >
              プレビュー
            </Button>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}