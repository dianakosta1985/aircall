// src/components/CallCard.jsx
import React from "react";
import { formatTime } from "../utils/helper";

const CallCard = ({ call, onToggleArchive }) => {
  const handleArchiveToggle = (e) => {
    e.preventDefault();
    onToggleArchive(call.id, call.is_archived);
  };

  const Icon = () => {
    if (call.call_type === "missed") {
      return (
        <img width="15px" src="public/icons/missed-call.svg" alr="incoming" />
      );
    } else if (call.direction === "inbound" && call.call_type === "answered") {
      return (
        <img width="15px" src="public/icons/incoming-call.svg" alr="incoming" />
      );
    }
    //(call.direction === "outbound" && call.call_type === "answered")
    return (
      <img width="15px" src="public/icons/outcoming-call.svg" alr="incoming" />
    );
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
            <td>
              <button
                className="archive-btn"
                onClick={(e) => handleArchiveToggle(e)}
              >
                {call.is_archived ? "Unarchive" : "Archive"}
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
