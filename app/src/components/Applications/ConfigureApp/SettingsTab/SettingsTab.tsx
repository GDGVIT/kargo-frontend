import React from 'react';
import { Card } from '@/components/ui';
import type RegistryCredential from '@/types/Registry/RegistryCredential/RegistryCredential';
import ImageFields from './ImageFields/ImageFields';

interface SettingsTabProps {
  imageUrl: string;
  imageTag: string;
  setImageUrl: (url: string) => void;
  setImageTag: (tag: string) => void;
  credentials: RegistryCredential[];
  selectedCredential: string;
  setSelectedCredential: (name: string) => void;
}

const SettingsTab: React.FC<SettingsTabProps> = ({
  imageUrl,
  imageTag,
  setImageUrl,
  setImageTag,
  credentials,
  selectedCredential,
  setSelectedCredential,
}) => (
  <div>
    <Card form>
      <ImageFields
        imageUrl={imageUrl}
        imageTag={imageTag}
        setImageUrl={setImageUrl}
        setImageTag={setImageTag}
        credentials={credentials}
        selectedCredential={selectedCredential}
        setSelectedCredential={setSelectedCredential}
      />
    </Card>
  </div>
);

export default SettingsTab;
