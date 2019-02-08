/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

import logger from "./../../../../utils/logger";
import * as PropertyUtils from "./../../util/property-utils.js";

function op() {
	return "colDoesExists";
}

function evaluate(paramInfo, param2Info, value, controller) {
	const dataModelFields = controller.getDatasetMetadataFields();
	if (!dataModelFields) {
		return false;
	}

	const controlType = paramInfo.control.controlType;
	switch (controlType) {
	case "selectcolumns":
	case "selectcolumn": {
		if (Array.isArray(paramInfo.value) && typeof paramInfo.control.editStyle !== "undefined") { // Control is inside a table.
			if (paramInfo.value.length > 0) {
				let allValid = true;
				paramInfo.value.forEach((paramValue) => {
					allValid = allValid && typeof valueInDataset(dataModelFields, paramValue) !== "undefined";
				});
				return allValid;
			}
			return true;
		}
		return typeof valueInDataset(dataModelFields, paramInfo.value) !== "undefined";
	}
	default:
		logger.warn("Ignoring unsupported condition operation 'colDoesExists' for control type " + controlType);
		return true;
	}
}

// Return the field if found in dataset, else undefined
function valueInDataset(dataset, field) {
	return dataset.find(function(dataModelField) {
		return PropertyUtils.fieldValueMatchesProto(field, dataModelField);
	});
}


// Public Methods ------------------------------------------------------------->

export {
	op,
	evaluate
};
