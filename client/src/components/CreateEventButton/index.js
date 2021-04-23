import React from "react";
import "./style.css";

function CreateEventButton() {
  return (
    // Put code for On-click- to go to eventPage form
    <div className="row thirdRow">
      <div className="col-md-3"></div>
      <div className="col">
        <div>
          <button className="createEvent">Create an Event</button>
        </div>
      </div>
      <div className="col-md-3"></div>
    </div>
  );
}
export default CreateEventButton;