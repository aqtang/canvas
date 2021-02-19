/*
 * Copyright 2017-2020 Elyra Authors
 *
 * Licensed under the Apache License, Version 2.0 (the "License");
 * you may not use this file except in compliance with the License.
 * You may obtain a copy of the License at
 *
 * http://www.apache.org/licenses/LICENSE-2.0
 *
 * Unless required by applicable law or agreed to in writing, software
 * distributed under the License is distributed on an "AS IS" BASIS,
 * WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
 * See the License for the specific language governing permissions and
 * limitations under the License.
 */

import React from "react";
import ReadonlyTableControl from "../../../src/common-properties/controls/readonlytable";
import { mountWithIntl, shallowWithIntl } from "../../_utils_/intl-utils";
import { Provider } from "react-redux";
import { expect } from "chai";
import sinon from "sinon";
import propertyUtils from "../../_utils_/property-utils";
import Controller from "../../../src/common-properties/properties-controller";

import readonlyTableParamDef from "../../test_resources/paramDefs/readonlyTable_paramDef.json";

const controller = new Controller();

const control = {
	"name": "keys",
	"label": {
		"text": "Sort by"
	},
	"controlType": "readonlyTable",
	"moveableRows": true,
	"valueDef": {
		"propType": "structure",
		"isList": true,
		"isMap": false
	},
	"subControls": [
		{
			"name": "field",
			"label": {
				"text": "Field"
			},
			"visible": true,
			"width": 28,
			"sortable": true,
			"controlType": "selectcolumn",
			"valueDef": {
				"propType": "string",
				"isList": false,
				"isMap": false
			},
			"filterable": true
		},
		{
			"name": "sort_order",
			"label": {
				"text": "Order"
			},
			"visible": true,
			"width": 16,
			"controlType": "toggletext",
			"valueDef": {
				"propType": "string",
				"isList": false,
				"isMap": false
			},
			"values": [
				"Ascending",
				"Descending"
			],
			"valueLabels": [
				"Ascending",
				"Descending"
			],
			"valueIcons": [
				"/images/up-triangle.svg",
				"/images/down-triangle.svg"
			]
		}
	]
};
const propertyId = { name: "keys" };

function genUIItem() {
	return <div />;
}


describe("readonlytable control renders correctly", () => {
	it("props should have been defined", () => {
		const wrapper = shallowWithIntl(
			<ReadonlyTableControl
				store={controller.getStore()}
				control={control}
				controller={controller}
				propertyId={propertyId}
				buildUIItem={genUIItem}
				rightFlyout
			/>
		);

		expect(wrapper.dive().prop("control")).to.equal(control);
		expect(wrapper.dive().prop("controller")).to.equal(controller);
		expect(wrapper.dive().prop("propertyId")).to.equal(propertyId);
		expect(wrapper.dive().prop("buildUIItem")).to.equal(genUIItem);
	});

	it("should render a `readonlytable` control without edit button", () => {
		const wrapper = mountWithIntl(
			<Provider store={controller.getStore()}>
				<ReadonlyTableControl
					control={control}
					controller={controller}
					propertyId={propertyId}
					buildUIItem={genUIItem}
					rightFlyout
				/>
			</Provider>
		);

		expect(wrapper.find("div[data-id='properties-keys']")).to.have.length(1);
		// should have a search bar
		expect(wrapper.find("div.properties-ft-search-container")).to.have.length(1);
		// should not have abstract table buttons
		const buttons = wrapper.find(".properties-at-buttons-container");
		expect(buttons).to.have.length(0);
		// should have moveable table rows
		const moveableRowsContainer = wrapper.find(".properties-mr-button-container");
		expect(moveableRowsContainer).to.have.length(1);
		expect(moveableRowsContainer.find("button.table-row-move-button[disabled=true]")).to.have.length(4);
	});

	let wrapper;
	let renderedController;
	const buttonHandler = sinon.spy();
	beforeEach(() => {
		const renderedObject = propertyUtils.flyoutEditorForm(readonlyTableParamDef);
		wrapper = renderedObject.wrapper;
		renderedController = renderedObject.controller;
		renderedController.setHandlers({
			buttonHandler: buttonHandler
		});
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it("should render a `readonlytable` control with edit button", () => {
		const tables = propertyUtils.openSummaryPanel(wrapper, "readonlyTable-summary-panel");
		const table = tables.find("div[data-id='properties-ft-readonlyStructureTableControl']");

		// ensure the edit button exists
		const editButton = table.find("button.properties-edit-button");
		expect(editButton).to.have.length(1);
		expect(editButton.text()).to.equal("Edit");

		editButton.simulate("click");
		expect(buttonHandler).to.have.property("callCount", 1);
		expect(buttonHandler.calledWith({ type: "edit", propertyId: { name: "readonlyStructureTableControl" } })).to.be.true;
	});

	it("should render a `readonlytable` control with a custom edit button label", () => {
		const tables = propertyUtils.openSummaryPanel(wrapper, "readonlyTable-summary-panel");
		const table = tables.find("div[data-id='properties-ft-readonlyStructurelistTableControl']");
		const editButton = table.find("button.properties-edit-button");
		expect(editButton.text()).to.equal("Edit test");
	});

	it("`readonlytable` control should have aria-label", () => {
		const tables = propertyUtils.openSummaryPanel(wrapper, "readonlyTable-summary-panel");
		const table = tables
			.find("div[data-id='properties-ft-readonlyStructurelistTableControl']")
			.find(".properties-vt-autosizer")
			.find(".ReactVirtualized__Table");
		expect(table.props()).to.have.property("aria-label", "ReadonlyTable - structurelisteditor");
	});
});

describe("readonlytable control conditions", () => {
	let wrapper;
	let renderedController;
	const buttonHandler = sinon.spy();
	beforeEach(() => {
		const renderedObject = propertyUtils.flyoutEditorForm(readonlyTableParamDef);
		wrapper = renderedObject.wrapper;
		renderedController = renderedObject.controller;
		renderedController.setHandlers({
			buttonHandler: buttonHandler
		});
	});

	afterEach(() => {
		wrapper.unmount();
	});

	it("a hidden `readonlyTable` control should not be shown", () => {
		const tables = propertyUtils.openSummaryPanel(wrapper, "readonlyTable-conditions-summary-panel");
		const table = tables.find("div[data-id='properties-ci-readonlyTableHidden']");
		expect(table.prop("className")).to.equal("properties-control-item hide");
		expect(table.find("div[data-id='properties-readonlyTableHidden']")).not.to.be.undefined;
	});

	it("a disabled `readonlytable` control should be disabled", () => {
		const tables = propertyUtils.openSummaryPanel(wrapper, "readonlyTable-conditions-summary-panel");
		const table = tables.find("div[data-id='properties-ci-readonlyTableDisabled']");
		expect(table.prop("disabled")).to.equal(true);
	});
});

describe("readonlyTable classnames appear correctly", () => {
	let wrapper;
	beforeEach(() => {
		const renderedObject = propertyUtils.flyoutEditorForm(readonlyTableParamDef);
		wrapper = renderedObject.wrapper;
	});

	it("readonlyTable should have custom classname defined", () => {
		propertyUtils.openSummaryPanel(wrapper, "readonlyTable-summary-panel");
		expect(wrapper.find(".readonlytable-control-class")).to.have.length(1);
	});

	it("readonlyTable should have custom classname defined in table cells", () => {
		propertyUtils.openSummaryPanel(wrapper, "readonlyTable-summary-panel");
		expect(wrapper.find(".nested-parent-readonlytable-control-class")).to.have.length(1);
		expect(wrapper.find(".nested-subpanel-readonlytable-control-class")).to.have.length(3);
	});
});
