import React from "react";
import "./style.css"
import Jumbotron from "react-bootstrap/Jumbotron"
import {Container} from "react-bootstrap"

function JumbotronHolder() {
    return (
      <Jumbotron >
        <Container id="title">
          <p className="text-center display-1 font-weight-bold" >UnifyingOurVote</p>
        </Container>
      </Jumbotron>
    );
}

export default JumbotronHolder;