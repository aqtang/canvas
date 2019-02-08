/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2019. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import logger from "./../../../../utils/logger";

function op() {
	return "dmRoleNotEquals";
}

/**
 * Find the metadata for the given field and return if it matches the given data role
 * @param {Object} paramInfo first entry in the globals row, and the name of the desired field is a string attribute
 * @param {Object} paramInfo2 alternate parameter for the target data role. Use value instead if possible.
 * @param {Object} value the target role type we are comparing the field to
 * @param {Object} controller properties controller
 */
function evaluate(paramInfo, param2Info, value, controller) {
	if (paramInfo.control.role !== "column") {
		logger.warn("Condition Operator dmRoleEquals only intended for use on columns");
	}
	const metadata = controller.getDatasetMetadataFields();
	var target = null;
	if (param2Info !== null && typeof param2Info !== "undefined" && param2Info.value !== null) {
		target = param2Info.value;
	} else if (value !== null && typeof value !== "undefined") {
		target = value;
	} else {
		return false;
	}
	if (!metadata) {
		return false;
	}
	if (typeof paramInfo.value === "string") {
		for (var i = 0; i < metadata.length; i++) {
			var field = metadata[i];
			if (field.name === paramInfo.value) {
				return field.metadata.modeling_role !== target;
			}
		}
	} else if (typeof paramInfo.value === "object") {
		for (var j = 0; j < metadata.length; j++) {
			var field2 = metadata[j];
			if (field2.origName === paramInfo.value.field_name && field2.schema === paramInfo.value.link_ref) {
				return field2.metadata.modeling_role !== target;
			}
		}
	} else if (typeof paramInfo.value !== "undefined") {
		logger.warn("dmRoleEquals cannot handle the given type: " + typeof paramInfo.value);
	}
	return false;
}

// Public Methods ------------------------------------------------------------->

export {
	op,
	evaluate
};
