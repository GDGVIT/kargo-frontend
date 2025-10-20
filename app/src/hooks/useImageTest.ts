import { useState } from 'react';
import api from '@/utils/api';

interface ImageTestResult {
  available: boolean;
  needsAuth?: boolean;
  authTested?: boolean;
  error?: string;
  testedWith?: string;
  suggestions?: string[];
  isArchitectureIssue?: boolean;
  architectureSupported?: boolean;
  supportedArchitectures?: string[];
  clusterArchitectures?: string[];
  unsupportedNodes?: string[];
  recommendedNodeSelector?: { [key: string]: string };
}

interface UseImageTestReturn {
  testImage: (
    imageUrl: string,
    imageTag?: string,
    credentialIds?: string[]
  ) => Promise<ImageTestResult>;
  isLoading: boolean;
  lastResult: ImageTestResult | null;
}

export default function useImageTest(): UseImageTestReturn {
  const [isLoading, setIsLoading] = useState(false);
  const [lastResult, setLastResult] = useState<ImageTestResult | null>(null);

  const testImage = async (
    imageUrl: string,
    imageTag: string = 'latest',
    credentialIds?: string[]
  ): Promise<ImageTestResult> => {
    setIsLoading(true);

    try {
      const response = await api.post('/api/applications/test-image', {
        imageUrl,
        imageTag,
        credentialIds,
      });

      const result: ImageTestResult = {
        available: response.data.available,
        authTested: response.data.authTested,
        testedWith: response.data.testedWith,
        suggestions: response.data.suggestions || [], // Include suggestions for successful cases too
        isArchitectureIssue: response.data.isArchitectureIssue,
        architectureSupported: response.data.architectureSupported,
        supportedArchitectures: response.data.supportedArchitectures,
        clusterArchitectures: response.data.clusterArchitectures,
        unsupportedNodes: response.data.unsupportedNodes,
        recommendedNodeSelector: response.data.recommendedNodeSelector,
      };

      setLastResult(result);
      return result;
    } catch (error: unknown) {
      const axiosError = error as {
        response?: {
          data?: {
            needsAuth?: boolean;
            authTested?: boolean;
            error?: string;
            suggestions?: string[];
            isArchitectureIssue?: boolean;
          };
        };
      };
      const errorMessage = error instanceof Error ? error.message : 'Failed to test image';

      const result: ImageTestResult = {
        available: false,
        needsAuth: axiosError.response?.data?.needsAuth || false,
        authTested: axiosError.response?.data?.authTested || false,
        error: axiosError.response?.data?.error || errorMessage,
        suggestions: axiosError.response?.data?.suggestions || [],
        isArchitectureIssue: axiosError.response?.data?.isArchitectureIssue || false,
      };

      setLastResult(result);
      return result;
    } finally {
      setIsLoading(false);
    }
  };

  return {
    testImage,
    isLoading,
    lastResult,
  };
}
