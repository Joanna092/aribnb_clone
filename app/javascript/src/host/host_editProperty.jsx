import React from "react";
import ReactDOM from "react-dom";
import Hostlayout from "@src/host/host_layout";


class Editproperty extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
     
    };
  }


  render() {
    return (
      <Hostlayout>
        <p>Edit property page</p>
      </Hostlayout>
    );
  }
}

document.addEventListener("DOMContentLoaded", () => {
  ReactDOM.render(
    <Editproperty />,
    document.body.appendChild(document.createElement("div"))
  );
});

