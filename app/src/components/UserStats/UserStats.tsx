import React, { useEffect, useState } from "react";
import Card from "../ui/Card/Card";
import Loader from "../ui/Loader/Loader";
import axios from "../../utils/api";
import { FaServer, FaNetworkWired, FaKey, FaLock } from "react-icons/fa";
import type User from "../../types/User/User";

interface UserStatsData {
  servers: number;
  ports: number;
  envVars: number;
  creds: number;
}

const Stat: React.FC<{
  icon: React.ReactNode;
  label: string;
  value: number;
  className?: string;
}> = ({ icon, label, value, className }) => (
  <div className={`flex items-center rounded  ${className ?? ""}`}>
    {icon}
    <span className="font-bold text-xs md:text-sm mr-1">{label}</span>
    <span className="text-sm md:text-base ml-auto">{value}</span>
  </div>
);

// Accept user prop
const UserStats: React.FC<{ user: User }> = () => {
  const [stats, setStats] = useState<UserStatsData | null>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    setLoading(true);
    setError(null);
    axios
      .get("/api/users/me/settings-stats")
      .then((res) => setStats(res.data))
      .catch(() => setError("Failed to load user stats."))
      .finally(() => setLoading(false));
  }, []);

  if (loading) return <Loader />;
  if (error) return <Card className="p-4 text-red-400">{error}</Card>;
  if (!stats) return null;

  return (
    <div className="flex flex-col gap-2 md:gap-3 text-zinc-200 w-full">
      <Stat
        icon={<FaServer className="text-lg md:text-xl text-gray-400 mr-2" />}
        label="Servers"
        value={stats.servers}
      />
      <Stat
        icon={
          <FaNetworkWired className="text-lg md:text-xl text-gray-400 mr-2" />
        }
        label="Ports"
        value={stats.ports}
      />
      <Stat
        icon={<FaKey className="text-lg md:text-xl text-gray-400 mr-2" />}
        label="Env Vars"
        value={stats.envVars}
      />
      <Stat
        icon={<FaLock className="text-lg md:text-xl text-gray-400 mr-2" />}
        label="Credentials"
        value={stats.creds}
      />
    </div>
  );
};

export default UserStats;
