import { FcGoogle } from "react-icons/fc";
import { FaGithub } from "react-icons/fa";

type OAuthButtonsProps = {
  googleLogin: () => void;
  githubLogin: () => void;
  oauthLoading: boolean;
};

export default function OAuthButtons({
  googleLogin,
  githubLogin,
  oauthLoading,
}: OAuthButtonsProps) {
  return (
    <div className="flex flex-row items-center justify-center gap-4 max-w-lg mx-auto">
      <button
        onClick={googleLogin}
        aria-label="Continue with Google"
        disabled={oauthLoading}
        className="flex items-center justify-center p-3 rounded-full text-gray text-lg"
        type="button"
      >
        <FcGoogle className="w-6 h-6" />
      </button>
      <button
        onClick={githubLogin}
        aria-label="Continue with GitHub"
        disabled={oauthLoading}
        className="flex items-center justify-center p-3 rounded-full text-white text-lg"
        type="button"
      >
        <FaGithub className="w-6 h-6" />
      </button>
    </div>
  );
}
