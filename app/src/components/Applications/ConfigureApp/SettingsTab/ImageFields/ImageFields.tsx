import React, { useState } from "react";
import type ImageFieldsProps from "../../../../../types/Application/ImageFieldProps/ImageFieldProps";
import Input from "../../../../ui/Input/Input";
import Select from "../../../../ui/Select/Select";
import AnimatedButton from "../../../../ui/AnimatedButton/AnimatedButton";
import useImageTest from "../../../../../hooks/useImageTest";
import ImageTestErrorModal from "../../../../Docker/ImageTestErrorModal/ImageTestErrorModal";
import useNotification from "../../../../ui/Notification/Notification";
import { useRouter } from "next/navigation";
import { FaCheck, FaSpinner, FaSearch } from "react-icons/fa";

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
      notify("Please enter an image URL first", "warning");
      return;
    }

    const tag = imageTag.trim() || "latest";
    const credentialIds = selectedCredential ? [selectedCredential] : undefined;
    const result = await testImage(imageUrl.trim(), tag, credentialIds);

    if (result.available) {
      notify(
        `Image ${imageUrl}:${tag} is available${
          result.authTested
            ? ` (with ${result.testedWith || "authentication"})`
            : " (public)"
        }`,
        "success"
      );
    } else {
      setShowErrorModal(true);
    }
  };

  const getTestButtonState = () => {
    if (isTestingImage) {
      return {
        icon: <FaSpinner className="animate-spin" />,
        text: "Testing...",
      };
    }
    if (lastResult?.available) {
      return { icon: <FaCheck />, text: "Available" };
    }
    return { icon: <FaSearch />, text: "Test Image" };
  };

  const buttonState = getTestButtonState();

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
      <div className="flex gap-2">
        <div className="flex-1">
          <Input
            required
            value={imageTag}
            onChange={setImageTag}
            placeholder="latest"
            label="Image Tag"
          />
        </div>
        <div className="flex items-end">
          <AnimatedButton
            type="button"
            variant={lastResult?.available ? "success" : "secondary"}
            onClick={handleTestImage}
            disabled={isTestingImage || !imageUrl.trim()}
            icon={buttonState.icon}
            className="!px-3 !py-2 h-[44px] sm:h-[50px]"
          >
            {buttonState.text}
          </AnimatedButton>
        </div>
      </div>
      <div style={{ position: "relative" }}>
        <Select
          label="Image Pull Credential"
          value={selectedCredential}
          onChange={setSelectedCredential}
          options={[
            { value: "", label: "No Credential" },
            ...credentials.map((cred) => ({
              value: cred.name + ":" + cred.registryType,
              label: `${cred.name} [${cred.registryType}] (${cred.username})`,
            })),
          ]}
          placeholder="Select a credential"
        />
      </div>

      <ImageTestErrorModal
        open={showErrorModal}
        onClose={() => setShowErrorModal(false)}
        imageUrl={imageUrl}
        imageTag={imageTag || "latest"}
        error={lastResult?.error || ""}
        needsAuth={lastResult?.needsAuth}
        authTested={lastResult?.authTested}
        suggestions={lastResult?.suggestions}
        onNavigateToCredentials={() => router.push("/credentials")}
      />
    </div>
  );
};

export default ImageFields;
