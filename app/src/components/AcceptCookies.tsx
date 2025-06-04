import React, { useEffect, useState } from "react";

const COOKIE_CONSENT_KEY = "cookie_consent";

const AcceptCookies: React.FC = () => {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const consent = localStorage.getItem(COOKIE_CONSENT_KEY);
    if (!consent) {
      setVisible(true);
    }
  }, []);

  const handleAccept = () => {
    localStorage.setItem(COOKIE_CONSENT_KEY, "true");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 w-full bg-gray-900 text-white p-4 flex justify-center items-center z-50">
      <span className="mr-4">
        This website uses cookies to enhance the user experience.
      </span>
      <button
        onClick={handleAccept}
        className="bg-white text-gray-900 border-none rounded px-4 py-2 cursor-pointer"
      >
        Accept
      </button>
    </div>
  );
};

export default AcceptCookies;
