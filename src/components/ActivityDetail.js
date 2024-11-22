import React, { useEffect, useState } from "react";
import { getActivityDetails } from "../api/api";
import { Link } from "react-router-dom";

const ActivityDetail = ({ match }) => {
  const [call, setCall] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCallDetails = async () => {
      const callData = await getActivityDetails(match.params.id);
      setCall(callData);
      setLoading(false);
    };
    fetchCallDetails();
  }, [match.params.id]);

  if (loading) return <div className="loading">Loading...</div>;

  return (
    <div className="activity-detail-container">
      <Link to="/">
        <div className="close-btn">❌</div>
      </Link>
      <h2>Call Details</h2>
      <div className="call-details">
        <p>
          <strong>From:</strong> {call.from}
        </p>
        <p>
          <strong>To:</strong> {call.to}
        </p>
        <p>
          <strong>Duration:</strong> {call.duration}s
        </p>
        <p>
          <strong>Type:</strong> {call.call_type}
        </p>
        <p>
          <strong>Direction:</strong> {call.direction}
        </p>
        <p>
          <strong>Via:</strong> {call.via}
        </p>
      </div>
    </div>
  );
};

export default ActivityDetail;
