/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2017. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

const haloLayout = {

	// CSS classes
	cssNodeSelectionHighlight: "d3-node-selection-highlight",
	cssNodeBody: "d3-node-body-outline",
	cssNodeLabel: "d3-node-label",
	cssNodePortOutput: "d3-node-port-output",
	cssNodePortInput: "d3-node-port-input",
	cssNodePortInputArrow: "d3-node-port-input-arrow",
	cssCommentSelectionHighlight: "d3-comment-selection-highlight",

	// Connection type decides whether the node to node connections use the
	// 'halo' connection mechanism and arrows pointing directly from source to
	// target or the 'ports' connections with connection lines draw from output
	// ports to input ports.
	connectionType: "halo",

	// Node format specifies whether the image and label are arranged side by side
	// (horizontal) or with the image above the label (vertical).
	nodeFormatType: "vertical",

	// Default node sizes. The height might be overridden for nodes with a more ports
	// than will fit in the default size.
	defaultNodeWidth: 60,
	defaultNodeHeight: 66,

	imageWidth: 48,
	imageHeight: 48,

	imagePosX: 6,
	imagePosY: 0,

	// Sizes of snap to grid as a percentage of default node height and width
	snapToGridX: "25%",
	snapToGridY: "20%",

	// Sets the justification of label and icon within the node height. This
	// overrides any labelPosY value provided. Possible value are "center" or
	// "none". Specify "none" to use the labelPosY value.
	labelAndIconVerticalJustification: "none",

	// Horizontal Justification of the lable based on label position X and Y.
	labelHorizontalJustification: "center",

	labelWidth: 52,
	labelHeight: 13, // Should match the font size specified in common-canvas-d3.scss

	// The underhang of letters below the baseline for the label font used
	labelDescent: 3, // Should match the font size specified in common-canvas-d3.scss

	labelPosX: 4,
	labelPosY: 53,

	decoratorHeight: 12,
	decoratorWidth: 12,

	decoratorTopY: 0,
	decoratorBottomY: 36,

	decoratorLeftX: 6,
	decoratorRightX: 42,

	// Draw node as a simple rectangle
	nodeShape: "rectangle",

	// The gap between a node or comment and its selection highlight rectangle
	highlightGap: 4,

	// Whether to display a link line when linked node/comments overlap. For halo
	// we don't want to show the link when objects overlap but for ports we do.
	displayLinkOnOverlap: false,

	// What point to draw the link line towards. Possible values are image_center or node_center.
	// This is used for comment links going towards nodes.
	drawLinkLineTo: "image_center",

	// Error indicator dimensions
	errorXPos: 52,
	errorYPos: 0,
	errorWidth: 14,
	errorHeight: 14,

	// The gap between node or comment and the link line.
	linkGap: 7,

	// When sizing a comment this decides the size of the corner area for
	// diagonal sizing.
	cornerResizeArea: 10,

	// The gap between the edge of the comment rectangle and the comment text.
	commentWidthPadding: 10,
	commentHeightPadding: 8,

	// Display an arrow head on the comment-to-node links
	commentLinkArrowHead: true,

	// Initialize values for drawing connectors. minInitialLine is the
	// size of the horizontal line protruding from the source or target handles
	// when such a line is required for drawing connectors. wrapAroundSpacing
	// the spacing for wraparound curved connectors.:
	elbowSize: 10,
	minInitialLine: 30,
	wrapAroundSpacing: 20,
	wrapAroundNodePadding: 10,

	// Values for AutoLayout and AutoNode function
	autoLayoutInitialMarginX: 50,
	autoLayoutInitialMarginY: 50,
	autoLayoutVerticalSpacing: 80,
	autoLayoutHorizontalSpacing: 80,

	// Add comment toolbar action, default offset from viewport
	addCommentOffset: 30,

	// Supernode in-place containment area attributes
	supernodeLabelPosX: 30,
	supernodeLabelPosY: 8,
	supernodeImageWidth: 18,
	supernodeImageHeight: 18,
	supernodeImagePosX: 5,
	supernodeImagePosY: 4,
	supernodeEllipsisPosY: 3,
	supernodeEllipsisWidth: 10,
	supernodeEllipsisHeight: 20,
	supernodeExpansionIconPosY: 4,
	supernodeExpansionIconHeight: 18,
	supernodeExpansionIconWidth: 18,
	supernodeExpansionIconHoverAreaPadding: 2,
	supernodeIconSeparation: 3,
	supernodeDefaultWidth: 200,
	supernodeDefaultHeight: 200,
	supernodeMinWidth: 100,
	supernodeMinHeight: 80,
	supernodeSVGTopAreaHeight: 25,
	supernodeSVGAreaPadding: 3,
	supernodeBindingPortRadius: 10,
	supernodeZoomPadding: 40,

	// ---------------------------------------------------------------------------
	// Below here are halo specific properties
	// ---------------------------------------------------------------------------

	// Comment Halo size
	haloCommentGap: 11, // Gap between comment rectangle and its halo

	// Node Halo sizes
	haloCenterX: 30,
	haloCenterY: 24,
	haloRadius: 29
};

const portsHorizontal = {
	// CSS classes
	cssNodeSelectionHighlight: "d3-node-selection-highlight-austin",
	cssNodeBody: "d3-node-body-outline-austin",
	cssNodeLabel: "d3-node-label-austin",
	cssNodePortOutput: "d3-node-port-output-austin",
	cssNodePortInput: "d3-node-port-input-austin",
	cssNodePortInputArrow: "d3-node-port-input-arrow-austin",
	cssCommentSelectionHighlight: "d3-comment-selection-highlight-austin",

	// Connection type decides whether the node to node connections use the
	// 'halo' connection mechanism and arrows pointing directly from source to
	// target or the 'ports' connections with connection lines draw from output
	// ports to input ports.
	connectionType: "ports",

	// Node format specifies whether the image and label are arranged side by side
	// (horizontal) or with the image above the label (vertical).
	nodeFormatType: "horizontal",

	// Default node sizes. The height might be overridden for nodes with a more ports
	// than will fit in the default size.
	defaultNodeWidth: 160,
	defaultNodeHeight: 40,

	imageWidth: 26,
	imageHeight: 26,

	imagePosX: 6,
	imagePosY: 7,

	// Sizes of snap to grid as a percentage of default node height and width
	snapToGridX: "20%",
	snapToGridY: "33.33%",

	// Sets the justification of label and icon within the node height. This
	// overrides any labelPosY value provided. Possible value are "center" or
	// "none". Specify "none" to use the labelPosY value.
	labelAndIconVerticalJustification: "center",

	// Horizontal Justification of the lable based on label position X and Y.
	labelHorizontalJustification: "left",

	labelWidth: 104,
	labelHeight: 12, // Should match the font size specified in common-canvas-d3.scss

	// The underhang of letters below the baseline for the label font used
	labelDescent: 3, // Should match the font size specified in common-canvas-d3.scss

	labelPosX: 38,
	labelPosY: 14,

	decoratorHeight: 12,
	decoratorWidth: 12,

	decoratorTopY: 0,
	decoratorBottomY: 26,

	decoratorLeftX: 2,
	decoratorRightX: 130,

	// Draw node as a rectangle with port arcs around the ports
	nodeShape: "port-arcs",

	// The gap between a node or comment and its selection highlight outline
	highlightGap: 1,

	// Whether to display a link line when linked node/comments overlap. For halo
	// we don't want to show the link when objects overlap but for ports we do.
	displayLinkOnOverlap: true,

	// What point to draw the link line towards. Possible values are image_center or node_center.
	// This is used for comment links going towards nodes.
	drawLinkLineTo: "node_center",

	// Error indicator dimensions
	errorXPos: 24,
	errorYPos: 10,
	errorWidth: 10.5,
	errorHeight: 10.5,

	// The gap between node or comment and the link line.
	linkGap: 7,

	// When sizing a comment this decides the size of the corner area for
	// diagonal sizing.
	cornerResizeArea: 10,

	// The gap between the edge of the comment rectangle and the comment text.
	commentWidthPadding: 10,
	commentHeightPadding: 8,

	// Display an arrow head on the comment-to-node links
	commentLinkArrowHead: false,

	// Initialize values for drawing connectors. minInitialLine is the
	// size of the horizontal line protruding from the source or target handles
	// when such a line is required for drawing connectors. wrapAroundSpacing
	// the spacing for wraparound curved connectors.:
	elbowSize: 10,
	minInitialLine: 30,
	wrapAroundSpacing: 20,
	wrapAroundNodePadding: 10,

	// Values for AutoLayout and AutoNode function
	autoLayoutInitialMarginX: 50,
	autoLayoutInitialMarginY: 50,
	autoLayoutVerticalSpacing: 80,
	autoLayoutHorizontalSpacing: 80,

	// Add comment toolbar action, default offset from viewport
	addCommentOffset: 30,

	// Supernode in-place containment area attributes
	supernodeLabelPosX: 30,
	supernodeLabelPosY: 8,
	supernodeImageWidth: 18,
	supernodeImageHeight: 18,
	supernodeImagePosX: 5,
	supernodeImagePosY: 4,
	supernodeEllipsisPosY: 3,
	supernodeEllipsisWidth: 10,
	supernodeEllipsisHeight: 20,
	supernodeExpansionIconPosY: 4,
	supernodeExpansionIconHeight: 18,
	supernodeExpansionIconWidth: 18,
	supernodeExpansionIconHoverAreaPadding: 2,
	supernodeIconSeparation: 3,
	supernodeDefaultWidth: 200,
	supernodeDefaultHeight: 200,
	supernodeMinWidth: 100,
	supernodeMinHeight: 80,
	supernodeSVGTopAreaHeight: 25,
	supernodeSVGAreaPadding: 3,
	supernodeBindingPortRadius: 7,
	supernodeZoomPadding: 40,

	// ---------------------------------------------------------------------------
	// Below here are ports horizontal specific properties
	// ---------------------------------------------------------------------------

	// This can be overrriden from common-canvas config properties
	linkType: "Curve",

	// Radius of the port circle
	portRadius: 3,

	// Radius of an imaginary circle around the port. This controls the
	// spacing of ports and the size of port arcs when nodeShape is set to
	// port-arcs.
	portArcRadius: 6,

	// Spacing between the port arcs around the ports.
	portArcSpacing: 3,

	// Default position of a single port - for vertical node format this
	// is half way down the image rather than the center of the node.
	portPosY: 20,

	// Comment port (circle) radius
	commentPortRadius: 5,

	// Display of vertical ellipsis to show context menu
	ellipsisWidth: 10,
	ellipsisHeight: 22,
	ellipsisPosX: 145,
	ellipsisPosY: 9,
	ellipsisHoverAreaPadding: 3
};

const portsVertical = {
	// CSS classes
	cssNodeSelectionHighlight: "d3-node-selection-highlight",
	cssNodeBody: "d3-node-body-outline",
	cssNodeLabel: "d3-node-label",
	cssNodePortOutput: "d3-node-port-output",
	cssNodePortInput: "d3-node-port-input",
	cssNodePortInputArrow: "d3-node-port-input-arrow",
	cssCommentSelectionHighlight: "d3-comment-selection-highlight",

	// Connection type decides whether the node to node connections use the
	// 'halo' connection mechanism and arrows pointing directly from source to
	// target or the 'ports' connections with connection lines draw from output
	// ports to input ports.
	connectionType: "ports",

	// Node format specifies whether the image and label are arranged side by side
	// (horizontal) or with the image above the label (vertical).
	nodeFormatType: "vertical",

	// Default node sizes. The height might be overridden for nodes with a more ports
	// than will fit in the default size.
	defaultNodeWidth: 70,
	defaultNodeHeight: 75,

	imageWidth: 48,
	imageHeight: 48,

	imagePosX: 11,
	imagePosY: 5,

	// Sizes of snap to grid as a percentage of default node height and width
	snapToGridX: "25%",
	snapToGridY: "20%",

	// Sets the justification of label and icon within the node height. This
	// overrides any labelPosY value provided. Possible value are "center" or
	// "none". Specify "none" to use the labelPosY value.
	labelAndIconVerticalJustification: "center",

	// Horizontal Justification of the lable based on label position X and Y.
	labelHorizontalJustification: "center",

	labelWidth: 64,
	labelHeight: 13, // Should match the font size specified in common-canvas-d3.scss

	// The underhang of letters below the baseline for the label font used
	labelDescent: 3, // Should match the font size specified in common-canvas-d3.scss

	labelPosX: 3,
	labelPosY: 57,

	decoratorHeight: 12,
	decoratorWidth: 12,

	decoratorTopY: 5,
	decoratorBottomY: 41,

	decoratorLeftX: 10,
	decoratorRightX: 46,

	// Draw node as a simple rectangle
	nodeShape: "rectangle",

	// The gap between a node or comment and its selection highlight rectangle
	highlightGap: 4,

	// Whether to display a link line when linked node/comments overlap. For halo
	// we don't want to show the link when objects overlap but for ports we do.
	displayLinkOnOverlap: true,

	// What point to draw the link line towards. Possible values are image_center or node_center.
	// This is used for comment links going towards nodes.
	drawLinkLineTo: "node_center",

	// Error indicator dimensions
	errorXPos: 45,
	errorYPos: 0,
	errorWidth: 14,
	errorHeight: 14,

	// The gap between node or comment and the link line.
	linkGap: 7,

	// When sizing a comment this decides the size of the corner area for
	// diagonal sizing.
	cornerResizeArea: 10,

	// The gap between the edge of the comment rectangle and the comment text.
	commentWidthPadding: 10,
	commentHeightPadding: 8,

	// Display an arrow head on the comment-to-node links
	commentLinkArrowHead: false,

	// Initialize values for drawing connectors. minInitialLine is the
	// size of the horizontal line protruding from the source or target handles
	// when such a line is required for drawing connectors. wrapAroundSpacing
	// the spacing for wraparound curved connectors.:
	elbowSize: 10,
	minInitialLine: 30,
	wrapAroundSpacing: 20,
	wrapAroundNodePadding: 10,

	// Values for AutoLayout and AutoNode function
	autoLayoutInitialMarginX: 50,
	autoLayoutInitialMarginY: 50,
	autoLayoutVerticalSpacing: 80,
	autoLayoutHorizontalSpacing: 80,

	// Add comment toolbar action, default offset from viewport
	addCommentOffset: 30,

	// Supernode in-place containment area attributes
	supernodeLabelPosX: 30,
	supernodeLabelPosY: 8,
	supernodeImageWidth: 18,
	supernodeImageHeight: 18,
	supernodeImagePosX: 5,
	supernodeImagePosY: 4,
	supernodeEllipsisPosY: 3,
	supernodeEllipsisWidth: 10,
	supernodeEllipsisHeight: 20,
	supernodeExpansionIconPosY: 4,
	supernodeExpansionIconHeight: 18,
	supernodeExpansionIconWidth: 18,
	supernodeExpansionIconHoverAreaPadding: 2,
	supernodeIconSeparation: 3,
	supernodeDefaultWidth: 200,
	supernodeDefaultHeight: 200,
	supernodeMinWidth: 100,
	supernodeMinHeight: 80,
	supernodeSVGTopAreaHeight: 25,
	supernodeSVGAreaPadding: 3,
	supernodeBindingPortRadius: 10,
	supernodeZoomPadding: 40,

	// ---------------------------------------------------------------------------
	// Below here are ports vertical specific properties
	// ---------------------------------------------------------------------------

	// This can be overrriden from common-canvas config properties
	linkType: "Curve",

	// Radius of the port circle
	portRadius: 6,

	// Radius of an imaginary circle around the port. This controls the
	// spacing of ports and the size of port arcs when nodeShape is set to
	// port-arcs.
	portArcRadius: 10, // Defines an imaginary circle around the circle port

	// Spacing between the port arcs around the ports.
	portArcSpacing: 0,

	// Default position of a single port - for vertical node format this
	// is half way down the image rather than the center of the node.
	portPosY: 29,

	// Comment port (circle) radius
	commentPortRadius: 5,

	// Display of vertical ellipsis to show context menu
	ellipsisWidth: 11,
	ellipsisHeight: 21,
	ellipsisPosX: 57,
	ellipsisPosY: 8,
	ellipsisHoverAreaPadding: 3
};


export default class LayoutDimensions {
	static getLayout(type) {
		if (type === "halo") {
			return haloLayout;
		} else if (type === "ports-vertical") {
			return portsVertical;
		}
		return portsHorizontal;
	}
}
