import React, { Component } from "react";
import { connect } from "react-redux";
import classnames from "classnames";

class Input extends Component {
  state = {
    inputFocused: false
  };

  onBlur = () => {
    this.setState({
      inputFocused: false
    })
  }

  onFocus = () => {
    this.setState({
      inputFocused: true
    })
  }
	render() {
    let characterCount = this.props.input.value.toString().length

    let containerClassName = classnames({
      "input-text": true,
      "input-large": this.props.large,
      "input-empty": characterCount == 0,
      "input-touched": this.props.meta.touched,
      "input-valid": this.props.meta.touched && !this.props.meta.error,
      "input-invalid":this.props.meta.touched && this.props.meta.error,
      "input-focused": this.props.meta.active
    });

    let inputClassName = classnames({
      "blade-input": true,
      "blade-intent-success": this.props.meta.touched && !this.props.meta.error,
      "blade-intent-danger": this.props.meta.touched && this.props.meta.error
    });

    let placeholderLargeClassName = classnames({
      "input-placeholder": true,
      "input-placeholder-large": true,
      "input-placeholder-large-visible": !this.state.inputFocused & characterCount == 0
    })

    let placeholderSmallClassName = classnames({
      "input-placeholder": true,
      "input-placeholder-small": true,
      "input-placeholder-small-visible": this.state.inputFocused || characterCount > 0
    })

		return (
      <div className={containerClassName}>
        {!this.props.meta.touched || this.props.meta.valid ? (
          <div className={placeholderSmallClassName}>
            {this.props.placeholder ? this.props.title : this.props.placeholder}
          </div>) : ""
        }

        {(this.props.meta.touched && !this.props.meta.valid && this.state.inputFocused) || (this.props.meta.touched && !this.props.meta.valid && characterCount > 0 ) ? (
          <div className="input-error">
            <span>{this.props.meta.error}</span>
          </div>
        ) : (
          ""
        )}

        <div className={placeholderLargeClassName}>
          {this.props.meta.touched && !this.props.meta.valid ? this.props.meta.error : this.props.placeholder}
        </div>

        <input
          {...this.props.input}
          className={inputClassName}
          type={this.props.input.type}
          // onFocus={this.onFocus}
          // onBlur={this.onBlur}
          autoComplete="new-password"
        />

      </div>
		);
	}
}

function mapStateToProps(state) {
	return {
	};
}

export default connect(mapStateToProps, {})(Input);
