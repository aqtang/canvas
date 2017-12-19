/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

/* eslint-disable no-empty-function */
import React from "react";
import CustomMapCtrl from "./CustomMapCtrl";
import CustomMapSummary from "./CustomMapSummary";

class CustomMapPanel {
	static id() {
		return "custom-map-panel";
	}

	constructor(parameters, controller) {
		this.parameters = parameters;
		this.controller = controller;
	}

	renderPanel() {
		const controlId = this.parameters[0];
		const propertyId = { name: controlId };
		const currentValue = this.controller.getPropertyValue(propertyId);
		const mapSummary = (<CustomMapSummary lng={currentValue[1]} lat={currentValue[0]} zoom={currentValue[2]} />);
		this.controller.updateCustPropSumPanelValue(propertyId,
			{ value: mapSummary, label: "Map" });
		return (
			<CustomMapCtrl
				key={controlId}
				ref={controlId}
				propertyId={propertyId}
				controller={this.controller}
			/>
		);
	}
}

export default CustomMapPanel;
