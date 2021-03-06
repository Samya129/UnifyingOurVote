import React, { useEffect, useState } from "react";
import API from "../../utils/Api";
// Maybe use below to link to previous page or other page within application.
import { Link, useParams } from "react-router-dom";
import "./style.css";
import EventNavbar from "../EventNavbar";
import Footer from "../Footer";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBalanceScale } from "@fortawesome/free-solid-svg-icons";

function ActualEvent(props) {
  const scale = <FontAwesomeIcon icon={faBalanceScale} />;

  const [event, setEvent] = useState({})

  // When this component mounts, grab the event with the _id of props.match.params.id
  // e.g. localhost:3000/events/599dcb67f0f16317844583fc
  const {id} = useParams()
  useEffect(() => {
    API.getEvent(id) //Goes into the actualEvent component
      .then(res => setEvent(res.data))
      .catch(err => console.log(err));
  }, [])
  return (
    <div id="actualEvent">
      <EventNavbar />
      <div className="container eventContainer">
        <div className="container infoPart1">
          <h1 className="headerTitle">Disability Service Petition {event.name} </h1>
          <br></br>
          <div className="row styleRow">
            <div className="col"></div>
            <div className="col date">Date: April 7, 2021 {event.date}</div>
            <div className="col scale fa-lg">{scale}</div>
            <div className="col location">Location: No location {event.location}</div>
            <div className="col"></div>
          </div>
          <br></br>
          <div className="row linkRow">
            <div className="col link">
              {/* Might use this below */}
              {/* <Link to="/YourCommunity">← Back to your community page</Link> */}
              <a
                className="eventLink"
                href="https://www.change.org/"
                target="_blank"
              >
                {/* getting eventlin to be clickable within href?? */}
                Change.org {event.link} 
              </a>
            </div>
          </div>
        </div>
        <div className="row descriptionRow infoPart2">
          <h3 className="hiDescription">Description:</h3>
          <br></br>
          <br></br>
          <p>
            {event.description}
          </p>
        </div>
      </div>
      <Footer />
    </div>
  );
}
export default ActualEvent;
