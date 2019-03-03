import React from "react";
import { connect } from "react-redux";
import { withRouter } from "react-router-dom";
import { Collapse, Calendar, Checkbox } from "antd";
import moment from "moment";

import { logout } from "../../actions/user";

import "./Sidebar.css";
import TimeSlider from "./TimeSlider";

const { Panel } = Collapse;

class Sidebar extends React.Component {
  logout = () => {
    this.props.logout().then(() => {
      this.props.history.push("/");
    });
  };

  getCurrentDate = () => {
    const { search } = this.props.location;
    if (search) return moment(search);
    return moment(); // now
  };

  addStatus = status => {
    const newStatus = [new Set([...this.props.status, status])];
    this.editParent({
      status: newStatus
    });
  };

  removeStatus = status => {
    const newStatus = this.props.status.filter(x != status);
    this.editParent({
      status: newStatus
    });
  };

  changeStatus = status => {
    return e => {
      if (e.target.checked) {
        addStatus(status);
      } else {
        removeStatus(status);
      }
    };
  };

  addSection = sectionId => {
    const newSection = [new Set([...this.props.section, sectionId])];
    this.editParent({
      section: newSection
    });
  };

  removeSection = sectionId => {
    const newSection = this.props.section.filter(x != sectionId);
    this.editParent({
      section: newSection
    });
  };

  changeSection = sectionId => {
    return e => {
      if (e.target.checked) {
        addSection(sectionId);
      } else {
        removeSection(sectionId);
      }
    };
  };

  /**
   * @param hour has range [0:24)
   */
  changeTime = hour => {
    this.editParent({
      time: hour
    });
  };

  render() {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column",
          minHeight: "100%"
        }}
      >
        <Collapse className="meow-collapse" defaultActiveKey={["1"]}>
          <Panel className="full-width-panel" header="posts from" key="1">
            <div style={{ width: "100%", backgroundColor: "white" }}>
              <Calendar
                onSelect={x =>
                  this.props.history.push({
                    pathname: "/",
                    search: `date=${x.format("MM/DD/YYYY")}`
                  })
                }
                fullscreen={false}
                defaultValue={this.getCurrentDate()}
              />
            </div>
          </Panel>
          <Panel header="section" key="2">
            {this.props.sections.map(s => (
              <Checkbox value={s.id} onChange={this.changeSection(s.id)}>
                {s.name}
              </Checkbox>
            ))}
          </Panel>
          <Panel header="post time" key="3">
            <TimeSlider onSlideEnd={this.changeTime} />
          </Panel>
          <Panel header="status" key="4">
            <Checkbox onChange={this.changeStatus("READY")}>ready to post</Checkbox>
            <Checkbox onChange={this.changeStatus("DRAFT")}>draft</Checkbox>
            <Checkbox onChange={this.changeStatus("SENT")}>sent</Checkbox>
          </Panel>
        </Collapse>
        <div
          onClick={this.logout}
          style={{
            width: "100%",
            height: "8vh",
            backgroundColor: "#2a73b2",
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
            borderTop: "1px solid #d9d9d9",
            cursor: "pointer"
          }}
        >
          <h1
            style={{
              marginBottom: 0,
              color: "white"
            }}
          >
            Sign Out
          </h1>
        </div>
      </div>
    );
  }
}

const mapDispatchToProps = {
  logout
};

export default withRouter(
  connect(
    null,
    mapDispatchToProps
  )(Sidebar)
);