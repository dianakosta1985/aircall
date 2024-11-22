import axios from "axios";

const BASE_URL = "https://aircall-api.onrender.com/activities";

// Fetch all calls for the activity feed
export const getActivities = async () => {
  const response = await axios.get(BASE_URL);
  return response.data;
};

// Fetch specific call details
export const getActivityDetails = async (callId) => {
  const response = await axios.get(`${BASE_URL}/${callId}`);
  return response.data;
};

// Update call (archive/unarchive)
export const updateCall = async (callId, isArchived) => {
  const response = await axios.patch(`${BASE_URL}/${callId}`, {
    is_archived: isArchived,
  });
  return response.data;
};

// Reset all calls
export const resetAllCalls = async () => {
  await axios.patch("https://aircall-api.onrender.com/reset");
};
