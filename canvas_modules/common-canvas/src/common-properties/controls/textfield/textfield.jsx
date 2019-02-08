/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2016, 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import React from "react";
import PropTypes from "prop-types";
import { connect } from "react-redux";
import TextInput from "carbon-components-react/lib/components/TextInput";
import ValidationMessage from "./../../components/validation-message";
import * as ControlUtils from "./../../util/control-utils";
import { STATES } from "./../../constants/constants.js";
import { CHARACTER_LIMITS, TOOL_TIP_DELAY } from "./../../constants/constants.js";
import Tooltip from "./../../../tooltip/tooltip.jsx";
import classNames from "classnames";
import uuid4 from "uuid/v4";

const arrayValueDelimiter = ", ";

class TextfieldControl extends React.Component {
	constructor(props) {
		super(props);
		this.charLimit = ControlUtils.getCharLimit(props.control, CHARACTER_LIMITS.TEXT_FIELD);
		this.id = ControlUtils.getControlId(props.propertyId);
		this.isList = false;
		if (this.props.control.valueDef && this.props.control.valueDef.isList) {
			this.isList = true;
		}

	}

	handleChange(evt) {
		let value = evt.target.value;
		if (this.charLimit !== -1 && value) {
			value = value.substring(0, this.charLimit);
		}
		if (this.isList) {
			value = ControlUtils.splitNewlines(value, arrayValueDelimiter);
		}
		this.props.controller.updatePropertyValue(this.props.propertyId, value);
	}

	render() {
		let value = this.props.value ? this.props.value : "";
		if (this.isList) {
			value = ControlUtils.joinNewlines(value, arrayValueDelimiter);
		}
		const className = classNames("properties-textfield", "properties-input-control", { "hide": this.props.state === STATES.HIDDEN },
			this.props.messageInfo ? this.props.messageInfo.type : null);
		const textInput =
			(<TextInput
				autoComplete={this.props.tableControl === true ? "off" : "on"}
				id={this.id}
				disabled={ this.props.state === STATES.DISABLED}
				placeholder={this.props.control.additionalText}
				onChange={this.handleChange.bind(this)}
				value={value}
				labelText={this.props.control.label ? this.props.control.label.text : ""}
				hideLabel
			/>);
		let display = textInput;
		if (this.props.tableControl) {
			const tooltipId = uuid4() + "-tooltip-column-" + this.props.propertyId.toString();
			let disabled = true;
			if (value && this.props.state !== STATES.DISABLED) {
				disabled = false;
			}
			const tooltip = (
				<div className="properties-tooltips">
					{String(value)}
				</div>
			);
			display = (<Tooltip
				id={tooltipId}
				tip={tooltip}
				direction="top"
				delay={TOOL_TIP_DELAY}
				className="properties-tooltips"
				disable={disabled}
			>
				{textInput}
			</Tooltip>);
		}
		return (
			<div className={className} data-id={ControlUtils.getDataId(this.props.propertyId)}>
				{display}
				<ValidationMessage inTable={this.props.tableControl} state={ this.props.state} messageInfo={ this.props.messageInfo} />
			</div>
		);
	}
}

TextfieldControl.propTypes = {
	control: PropTypes.object.isRequired,
	propertyId: PropTypes.object.isRequired,
	controller: PropTypes.object.isRequired,
	tableControl: PropTypes.bool,
	state: PropTypes.string, // pass in by redux
	value: PropTypes.oneOfType([
		PropTypes.string,
		PropTypes.array
	]), // pass in by redux
	messageInfo: PropTypes.object // pass in by redux
};


const mapStateToProps = (state, ownProps) => ({
	value: ownProps.controller.getPropertyValue(ownProps.propertyId),
	state: ownProps.controller.getControlState(ownProps.propertyId),
	messageInfo: ownProps.controller.getErrorMessage(ownProps.propertyId)
});

export default connect(mapStateToProps, null)(TextfieldControl);
