// src/components/ActivityFeed.jsx
import React, { useEffect, useState } from "react";
import { getActivities, updateCall } from "../api/api";
import CallCard from "./CallCard";
import { Link } from "react-router-dom";
import { formatPrettyDate } from "../utils/helper";

const ActivityFeed = () => {
  const [calls, setCalls] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCalls = async () => {
      const callsData = await getActivities();
      setCalls(callsData);
      setLoading(false);
    };
    fetchCalls();
  }, []);

  const groupedByDateArchieved = calls
    .filter((call) => call.is_archived)
    .reduce((acc, call) => {
      const { created_at } = call;
      const date = created_at.split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(call);
      return acc;
    }, {});

  const groupedByDateUnArchieved = calls
    .filter((call) => !call.is_archived)
    .reduce((acc, call) => {
      const { created_at } = call;
      const date = created_at.split("T")[0];
      if (!acc[date]) {
        acc[date] = [];
      }
      acc[date].push(call);
      return acc;
    }, {});

  const handleArchiveAll = async () => {
    const archivedCalls = calls.filter((call) => !call.is_archived);
    for (const call of archivedCalls) {
      await updateCall(call.id, true);
    }
    setCalls((prevCalls) =>
      prevCalls.map((call) => ({ ...call, is_archived: true }))
    );
  };

  const handleUnarchiveAll = async () => {
    const unarchivedCalls = calls.filter((call) => call.is_archived);
    for (const call of unarchivedCalls) {
      await updateCall(call.id, false);
    }
    setCalls((prevCalls) =>
      prevCalls.map((call) => ({ ...call, is_archived: false }))
    );
  };

  const toggleArchive = async (callId, isArchived) => {
    await updateCall(callId, !isArchived);
    setCalls((prevCalls) =>
      prevCalls.map((call) =>
        call.id === callId ? { ...call, is_archived: !isArchived } : call
      )
    );
  };

  if (loading) return <div className="container">Loading...</div>;

  return (
    <div className="activity-feed-container">
      <div className="controls">
        <button className="btn" onClick={handleArchiveAll}>
          Archive All
        </button>
        <button className="btn" onClick={handleUnarchiveAll}>
          Unarchive All
        </button>
      </div>

      {Object.keys(groupedByDateArchieved).length ? (
        <h2>Archived Calls</h2>
      ) : (
        ""
      )}
      <div className="call-list">
        {Object.entries(groupedByDateArchieved).map(([date, calls]) => (
          <>
            <div className="created-at">{formatPrettyDate(date)}</div>
            {calls.map((call) => (
              <Link
                to={`/call/${call.id}`}
                key={call.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CallCard
                  key={call.id}
                  call={call}
                  onToggleArchive={toggleArchive}
                />
              </Link>
            ))}
          </>
        ))}
      </div>

      {Object.keys(groupedByDateUnArchieved).length ? (
        <h2>Unarchived Calls</h2>
      ) : (
        ""
      )}
      <div className="call-list">
        {Object.entries(groupedByDateUnArchieved).map(([date, calls]) => (
          <>
            <div className="created-at">{formatPrettyDate(date)}</div>
            {calls.map((call) => (
              <Link
                to={`/call/${call.id}`}
                key={call.id}
                style={{ textDecoration: "none", color: "inherit" }}
              >
                <CallCard
                  key={call.id}
                  call={call}
                  onToggleArchive={toggleArchive}
                />
              </Link>
            ))}
          </>
        ))}
      </div>
    </div>
  );
};

export default ActivityFeed;
