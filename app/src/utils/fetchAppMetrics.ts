import api from '../utils/api';

export async function fetchAppMetrics(appId: string) {
  const { data } = await api.get(`/applications/${appId}/metrics`);
  return data.metrics;
}
