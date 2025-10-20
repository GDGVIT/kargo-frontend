import React, { useState } from 'react';
import { Input, Select, AnimatedButton, useNotification } from '@/components/ui';
import type ImageFieldsProps from '@/types/Application/ImageFieldProps/ImageFieldProps';
import useImageTest from '@/hooks/useImageTest';
import ImageTestErrorModal from '../../../../Docker/ImageTestErrorModal/ImageTestErrorModal';
import { useRouter } from 'next/navigation';
import { FaCheck, FaSpinner, FaSearch } from 'react-icons/fa';

const ImageFields: React.FC<ImageFieldsProps> = ({
  imageUrl,
  imageTag,
  setImageUrl,
  setImageTag,
  credentials,
  selectedCredential,
  setSelectedCredential,
}) => {
  const { testImage, isLoading: isTestingImage, lastResult } = useImageTest();
  const { notify } = useNotification();
  const router = useRouter();
  const [showErrorModal, setShowErrorModal] = useState(false);

  const handleTestImage = async () => {
    if (!imageUrl.trim()) {
      notify('Please enter an image URL first', 'warning');
      return;
    }

    const tag = imageTag.trim() || 'latest';
    const credentialIds = selectedCredential ? [selectedCredential] : undefined;
    const result = await testImage(imageUrl.trim(), tag, credentialIds);

    if (result.available) {
      notify(
        `Image ${imageUrl}:${tag} is available${
          result.authTested ? ` (with ${result.testedWith || 'authentication'})` : ' (public)'
        }`,
        'success'
      );

      if (result.suggestions && result.suggestions.length > 0) {
        setShowErrorModal(true);
      }
    } else {
      setShowErrorModal(true);
    }
  };

  return (
    <div className="grid grid-cols-1 gap-4 mb-6">
      <div>
        <Input
          required
          value={imageUrl}
          onChange={setImageUrl}
          placeholder="registry.io/my-app"
          label="Image URL"
        />
      </div>
      <div>
        <Input
          required
          value={imageTag}
          onChange={setImageTag}
          placeholder="latest"
          label="Image Tag"
        />
      </div>
      <div style={{ position: 'relative' }}>
        <Select
          label="Image Pull Credential"
          value={selectedCredential}
          onChange={setSelectedCredential}
          options={[
            { value: '', label: 'No Credential' },
            ...credentials.map((cred) => ({
              value: cred.name + ':' + cred.registryType,
              label: `${cred.name} [${cred.registryType}] (${cred.username})`,
            })),
          ]}
          placeholder="Select a credential"
        />
      </div>

      <div className="flex gap-4 mt-4">
        <AnimatedButton
          type="button"
          variant={lastResult?.available ? 'success' : 'secondary'}
          className="!px-6 !py-2"
          onClick={handleTestImage}
          disabled={isTestingImage || !imageUrl.trim()}
          icon={
            isTestingImage ? (
              <FaSpinner className="animate-spin" />
            ) : lastResult?.available ? (
              <FaCheck />
            ) : (
              <FaSearch />
            )
          }
        >
          {isTestingImage ? 'Testing...' : lastResult?.available ? 'Available' : 'Test Image'}
        </AnimatedButton>
      </div>

      <ImageTestErrorModal
        open={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        imageUrl={imageUrl}
        imageTag={imageTag || 'latest'}
        error={lastResult?.error || ''}
        needsAuth={lastResult?.needsAuth}
        authTested={lastResult?.authTested}
        suggestions={lastResult?.suggestions}
        available={lastResult?.available}
        isArchitectureIssue={lastResult?.isArchitectureIssue}
        onNavigateToCredentials={() => router.push('/credentials')}
      />
    </div>
  );
};

export default ImageFields;
