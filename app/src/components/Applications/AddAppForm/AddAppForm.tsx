"use client";

import { useState, useEffect, useCallback } from "react";
import api from "../../../utils/api";
import { useRouter } from "next/navigation";
import useNotification from "../../ui/Notification/Notification";
import useImageTest from "../../../hooks/useImageTest";
import ImageTestErrorModal from "../../Docker/ImageTestErrorModal/ImageTestErrorModal";
import type RegistryCredential from "../../../types/Registry/RegistryCredential/RegistryCredential";
import AnimatedButton from "../../ui/AnimatedButton/AnimatedButton";
import { FaPlus, FaCheck, FaSpinner, FaSearch } from "react-icons/fa";
import Input from "../../ui/Input/Input";
import Select from "../../ui/Select/Select";
import Modal from "../../ui/Modal/Modal";
import GithubRepos from "../../Github/GithubRepos/GithubRepos";
import Card from "../../ui/Card/Card";

export default function AddAppForm() {
  const [form, setForm] = useState({
    name: "",
    imageUrl: "",
    imageTag: "",
    credentials: [] as RegistryCredential[],
  });
  const [loading, setLoading] = useState(false);
  const [credentials, setCredentials] = useState<RegistryCredential[]>([]);
  const [selectedCredential, setSelectedCredential] =
    useState<RegistryCredential | null>(null);
  const [dockerModalOpen, setDockerModalOpen] = useState(false);
  const [showImageErrorModal, setShowImageErrorModal] = useState(false);
  const { testImage, isLoading: isTestingImage, lastResult } = useImageTest();
  const router = useRouter();
  const { notify } = useNotification();

  useEffect(() => {
    api
      .get("/api/users/me/credentials")
      .then((res) => setCredentials(res.data.credentials));
  }, []);

  function isValidAppName(name: string) {
    return /^[a-z0-9]([-a-z0-9]*[a-z0-9])?$/.test(name);
  }

  const handleTestImage = useCallback(async () => {
    if (!form.imageUrl.trim()) {
      notify("Please enter an image URL first", "warning");
      return;
    }

    const tag = form.imageTag.trim() || "latest";
    const credentialIds = selectedCredential
      ? [`${selectedCredential.name}:${selectedCredential.registryType}`]
      : undefined;
    const result = await testImage(form.imageUrl.trim(), tag, credentialIds);

    if (result.available) {
      notify(
        `Image ${form.imageUrl}:${tag} is available${
          result.authTested
            ? ` (with ${result.testedWith || "authentication"})`
            : " (public)"
        }`,
        "success"
      );
    } else {
      setShowImageErrorModal(true);
    }
  }, [form.imageUrl, form.imageTag, selectedCredential, testImage, notify]);

  // Auto-test image when credentials change (but only if image URL is already filled)
  useEffect(() => {
    if (form.imageUrl.trim() && !isTestingImage) {
      // Debounce the test to avoid too many requests
      const timeoutId = setTimeout(() => {
        handleTestImage();
      }, 500);
      return () => clearTimeout(timeoutId);
    }
  }, [
    selectedCredential,
    form.imageUrl,
    form.imageTag,
    handleTestImage,
    isTestingImage,
  ]);

  const getTestButtonState = () => {
    if (isTestingImage) {
      return {
        icon: <FaSpinner className="animate-spin" />,
        text: "Testing...",
      };
    }
    if (lastResult?.available && lastResult?.error === "") {
      return { icon: <FaCheck />, text: "Available" };
    }
    return { icon: <FaSearch />, text: "Test Image" };
  };

  async function handleAdd(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    setLoading(true);
    if (!isValidAppName(form.name)) {
      notify(
        "Application name must be lowercase, alphanumeric, and may contain hyphens. No underscores or uppercase letters allowed.",
        "error"
      );
      setLoading(false);
      return;
    }
    if (!form.imageUrl || form.imageUrl.trim() === "") {
      notify("No image found. Please dockerize your app first.", "error");
      router.push("/dockerize");
      setLoading(false);
      return;
    }

    // Test image availability before proceeding
    if (!lastResult?.available) {
      notify(
        "Please test the image availability first by clicking the 'Test Image' button.",
        "warning"
      );
      setLoading(false);
      return;
    }

    try {
      await api.post("/api/applications", {
        ...form,
        credentials: selectedCredential ? [selectedCredential] : [],
        // No volumes sent
      });
      setForm({ name: "", imageUrl: "", imageTag: "", credentials: [] });
      notify("Application added successfully!", "success");
      router.push("/applications");
    } catch {
      notify("Failed to add app", "error");
    }
    setLoading(false);
  }

  return (
    <>
      <Modal
        open={dockerModalOpen}
        onClose={() => setDockerModalOpen(false)}
        title="Dockerize from GitHub"
      >
        <GithubRepos />
      </Modal>
      <form onSubmit={handleAdd} className="mb-8 space-y-4 min-h-[470px]">
        <Card form className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <Input
              required
              label="Name"
              value={form.name}
              onChange={(value) => setForm((f) => ({ ...f, name: value }))}
              placeholder="My App"
            />
          </div>
          <div>
            <Input
              required
              label="Image URL"
              value={form.imageUrl}
              onChange={(value) => setForm((f) => ({ ...f, imageUrl: value }))}
              placeholder="registry.io/my-app"
              helperText={
                <AnimatedButton
                  type="button"
                  variant="secondary"
                  className="!px-2 !py-1 text-xs mt-1"
                  onClick={() => setDockerModalOpen(true)}
                >
                  Dockerize your app
                </AnimatedButton>
              }
            />
          </div>
          <div className="flex gap-2">
            <div className="flex-1">
              <Input
                required
                label="Image Tag"
                value={form.imageTag}
                onChange={(value) =>
                  setForm((f) => ({ ...f, imageTag: value }))
                }
                placeholder="latest"
              />
            </div>
            <div className="flex items-end">
              {(() => {
                const buttonState = getTestButtonState();
                return (
                  <AnimatedButton
                    type="button"
                    variant={lastResult?.available ? "success" : "secondary"}
                    onClick={handleTestImage}
                    disabled={isTestingImage || !form.imageUrl.trim()}
                    icon={buttonState.icon}
                    className="!px-3 !py-2 h-[44px] sm:h-[50px]"
                  >
                    {buttonState.text}
                  </AnimatedButton>
                );
              })()}
            </div>
          </div>
          <div>
            <Select
              label="Registry Credential"
              value={
                selectedCredential
                  ? selectedCredential.name +
                    ":" +
                    selectedCredential.registryType
                  : ""
              }
              onChange={(val) => {
                const [name, registryType] = val.split(":");
                const cred = credentials.find(
                  (c) => c.name === name && c.registryType === registryType
                );
                setSelectedCredential(cred || null);
                setForm((f) => ({
                  ...f,
                  credentials: cred ? [cred] : [],
                }));
              }}
              options={[
                { value: "", label: "Select a credential" },
                ...credentials.map((cred) => ({
                  value: cred.name + ":" + cred.registryType,
                  label: `${cred.name} [${cred.registryType}] (${cred.username})`,
                })),
              ]}
              helperText={
                <a
                  href="/credentials"
                  className="text-xs text-blue-400 hover:underline mt-1 inline-block"
                >
                  Manage credentials
                </a>
              }
            />
          </div>
        </Card>
        <div className="flex gap-4 mt-4">
          <AnimatedButton
            type="submit"
            disabled={loading}
            className="!px-6 !py-2"
            icon={<FaPlus />}
          >
            {loading ? "Adding..." : "Add Application"}
          </AnimatedButton>
          <AnimatedButton
            type="button"
            variant="secondary"
            className="!px-6 !py-2"
            onClick={() => setDockerModalOpen(true)}
          >
            Dockerize
          </AnimatedButton>
        </div>
      </form>

      <ImageTestErrorModal
        open={showImageErrorModal}
        onClose={() => setShowImageErrorModal(false)}
        imageUrl={form.imageUrl}
        imageTag={form.imageTag || "latest"}
        error={lastResult?.error || ""}
        needsAuth={lastResult?.needsAuth}
        authTested={lastResult?.authTested}
        suggestions={lastResult?.suggestions}
        onNavigateToCredentials={() => router.push("/credentials")}
      />
    </>
  );
}
