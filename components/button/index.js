import React, { Component } from "react";
import { connect } from "react-redux";
import Link from "next/link";
import { useSelector, useDispatch } from 'react-redux'

import classNames from "classnames"

import { Icon } from "@blueprintjs/core";

// import {
//   demoOn,
//   demoOff
// } from "../../redux/actions/appActions"

class Button extends Component {

  constructor(props) {
    super(props)
    this.state = {
    }
  }

  componentDidMount() {
  }

  renderChevron = () => {
    return (
      <div
        className={classNames({
          "icon-right": true,
          "chevron-right": this.props.chevron == "right",
          "chevron-top": this.props.chevron == "top",
          "chevron-bottom": this.props.chevron == "bottom"
        })}
      >
        <Icon name="chevron-right" />
      </div>
    )
  }

  renderIconLeft = () => {
    return (
      <div
        className={classNames({
          "icon-left": true,
          "chevron-right": this.props.chevron == "right",
          
        })}
      >
        <Icon icon={this.props.icon} />
      </div>
    )
  }

  renderLabel = () => {
    return (
      <div className="button-label">
        {this.props.title}
      </div>

    )
  }

  renderIconRIght = () => {
    return (
      <div
        className={classNames({
          "icon-right": true,
          
        })}
      >
        <Icon icon={this.props.iconRight} />
      </div>
    )
  }

  render() {
    return (
      <div
        className={classNames({
          "chxt-button": true,
          "minimal": this.props.minimal,
          "primary": this.props.primary,
          "small": this.props.small,
          "chevron-only": !this.props.icon && !this.props.label && this.props.chevron,
          "action-list-item": this.props.actionList,
          "disabled": this.props.disabled
        })}
      >
        <button
          type={this.props.type}
          onClick={() => this.props.onClick && !this.props.disabled && this.props.onClick()}
          className={classNames({
            "only-icon": !this.props.chevron && !this.props.label
          })}
        >
          {this.props.icon && this.renderIconLeft()}

         {this.props.label && <div className="button-label">
            {this.props.label}

            {this.props.iconRight && this.renderIconRIght()}
          </div>}

          {/* {this.props.label && this.renderLabel()} */}

          {this.props.chevron && this.renderChevron()}
        </button>
      </div>
    );

  }
}

function mapStateToProps(state) {
  return {
    // location: state.router.location,
    // demoMode: state.app.demoMode,
  };
}

export default connect(mapStateToProps, {
  //   demoOn,
  //   demoOff
  // showMenu,
  // hideMenu
})(Button);
