// src/components/CallCard.jsx
import React from "react";
import { formatTime } from "../utils/helper";
import IncomeCall from "../icons/IncomeCall.jsx";
import MissedCall from "../icons/MissedCall.jsx";
import OutcomeCall from "../icons/OutcomeCall.jsx";
import Archived from "../icons/Archived.jsx";
import UnArchived from "../icons/UnArchived.jsx";

const CallCard = ({ call, onToggleArchive }) => {
  const handleArchiveToggle = (e) => {
    e.preventDefault();
    onToggleArchive(call.id, call.is_archived);
  };

  const Icon = () => {
    if (call.call_type === "missed") {
      return <MissedCall />;
    } else if (call.direction === "inbound" && call.call_type === "answered") {
      return <IncomeCall />;
    }
    //(call.direction === "outbound" && call.call_type === "answered")
    return <OutcomeCall />;
  };

  return (
    <table className="call-table">
      {/* <tr>
        <td className="created-at">{formatPrettyDate(call.created_at)}</td>
      </tr> */}
      <tr className="call-row">
        <td className="icon-cell">
          <Icon />
        </td>
        <td className="info-cell">
          <tr>
            <td className="phone-number">
              {call.direction === "inbound" ? call.from : call.to}
            </td>
          </tr>
          <tr>
            <td className="call-via">via riggers</td>
            {/* <td className="call-via">{call.via}</td> */}
          </tr>
        </td>
        <td className="action-cell">
          <tr>
            <td title={call.is_archived ? "Archived" : "Unarchived"}>
              <button
                className="archive-btn"
                onClick={(e) => handleArchiveToggle(e)}
              >
                {call.is_archived ? <UnArchived /> : <Archived />}
              </button>
            </td>
          </tr>
          <tr>
            <td className="call-duration">{formatTime(call.duration)}</td>
          </tr>
        </td>
      </tr>
    </table>
  );
};

export default CallCard;
