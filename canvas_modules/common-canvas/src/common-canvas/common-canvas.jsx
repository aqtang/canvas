/*******************************************************************************
 * Licensed Materials - Property of IBM
 * (c) Copyright IBM Corporation 2016, 2018. All Rights Reserved.
 *
 * Note to U.S. Government Users Restricted Rights:
 * Use, duplication or disclosure restricted by GSA ADP Schedule
 * Contract with IBM Corp.
 *******************************************************************************/

/* eslint max-depth: ["error", 5] */
/* eslint no-return-assign: "off" */

import React from "react";
import PropTypes from "prop-types";
import ContextMenuWrapper from "../context-menu/context-menu-wrapper.jsx";
import DiagramCanvasD3 from "./diagram-canvas-d3.jsx";
import Palette from "../palette/palette.jsx";
import PaletteFlyout from "../palette/palette-flyout.jsx";
import Toolbar from "../toolbar/toolbar.jsx";
import NotificationPanel from "../notification-panel/notification-panel.jsx";
import TooltipWrapper from "../tooltip/tooltip-wrapper.jsx";
import isEmpty from "lodash/isEmpty";

import { DEFAULT_NOTIFICATION_HEADER, PALETTE } from "./constants/canvas-constants.js";

export default class CommonCanvas extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			isPaletteOpen: this.props.config.paletteInitialState || false,
			isNotificationOpen: false,
			showContextMenu: false,
			contextMenuDef: {},
			toolbarConfig: this.props.toolbarConfig,
			notificationConfig: this.props.notificationConfig,
			contextMenuConfig: this.props.contextMenuConfig,
			rightFlyoutContent: this.props.rightFlyoutContent,
			tipDef: {},
			rightFlyoutWidth: 0,
			paletteWidth: PALETTE.OPEN_WIDTH
		};

		this.openContextMenu = this.openContextMenu.bind(this);
		this.closeContextMenu = this.closeContextMenu.bind(this);
		this.isContextMenuDisplayed = this.isContextMenuDisplayed.bind(this);

		this.openTip = this.openTip.bind(this);
		this.closeTip = this.closeTip.bind(this);
		this.isTipOpen = this.isTipOpen.bind(this);
		this.isTipOpening = this.isTipOpening.bind(this);
		this.isTipClosing = this.isTipClosing.bind(this);

		this.openPalette = this.openPalette.bind(this);
		this.closePalette = this.closePalette.bind(this);

		this.openNotificationPanel = this.openNotificationPanel.bind(this);
		this.closeNotificationPanel = this.closeNotificationPanel.bind(this);

		this.initializeController = this.initializeController.bind(this);

		this.setPaletteWidth = this.setPaletteWidth.bind(this);

		this.canvasController = this.props.canvasController;
		this.initializeController(props);

		this.canvasController.setCommonCanvas(this);

		this.itemsContainerDivId = "common-canvas-items-container-" + this.canvasController.getInstanceId();

		this.objectModel = this.canvasController.getObjectModel();

		this.unsubscribe = this.objectModel.subscribe(() => {
			this.forceUpdate();
		});

		this.pendingTooltip = null;
		this.tipOpening = false;
		this.tipClosing = false;
	}

	componentDidMount() {
		document.addEventListener("mousedown", this.canvasController.closeTip.bind(this.canvasController), true);
		this.setPaletteWidth();
	}

	componentWillReceiveProps(newProps) {
		if (newProps.toolbarConfig) {
			const newToolbarConfig = newProps.toolbarConfig;
			const oldToolbarConfig = this.state.toolbarConfig;

			let identical = true;
			if (newToolbarConfig.length !== oldToolbarConfig.length) {
				identical = false;
			}
			if (identical) {
				for (let i = 0; i < newToolbarConfig.length; i++) {
					for (let j = 0; j < oldToolbarConfig.length; j++) {
						if (newToolbarConfig[i].action && oldToolbarConfig[j].action &&
								((newToolbarConfig[i].action.startsWith("palette") &&
									oldToolbarConfig[j].action.startsWith("palette")) &&
									newToolbarConfig[i].enable !== oldToolbarConfig[j].enable) ||
								(newToolbarConfig[i].action === oldToolbarConfig[j].action) &&
									(newToolbarConfig[i].label !== oldToolbarConfig[j].label ||
									newToolbarConfig[i].enable !== oldToolbarConfig[j].enable)) {
							identical = false;
							break;
						}
					}
				}
			}

			if (!identical) {
				this.setState({ toolbarConfig: newProps.toolbarConfig });
			}
		}

		if (newProps.rightFlyoutContent !== this.state.rightFlyoutContent) {
			this.setState({
				rightFlyoutContent: newProps.rightFlyoutContent
			});
		}

		if (newProps.notificationConfig) {
			if ((this.state.notificationConfig.label !== newProps.notificationConfig.label) ||
					(this.state.notificationConfig.enable !== newProps.notificationConfig.enable)) {
				this.setState({ notificationConfig: newProps.notificationConfig });
			}
		}

		this.initializeController(newProps);
	}

	componentDidUpdate() {
		this.setPaletteWidth();
	}

	componentWillUnmount() {
		this.unsubscribe();
		document.removeEventListener("mousedown", this.canvasController.closeTip, true);
	}

	// Prevent the default behavior (which is to show a plus-sign pointer) as
	// an object is being dragged over the common canvas components.
	// Note: this is overriden by the canvas area itself to allow external objects
	// to be dragged over it.
	onDragOver(evt) {
		evt.preventDefault();
	}

	// Prevent an object being dropped on the common canvas causing a file
	// download event (which is the default!). Note: this is overriden by the
	// canvas area itself to allow external objects to be dropped on it.
	onDrop(evt) {
		evt.preventDefault();
	}

	setPaletteWidth() {
		let paletteWidth = this.props.config.enableNarrowPalette || typeof this.props.config.enableNarrowPalette === "undefined" ? PALETTE.NARROW_WIDTH : PALETTE.CLOSED_WIDTH;
		if (this.state.isPaletteOpen) {
			paletteWidth = PALETTE.OPEN_WIDTH;
		}
		if (paletteWidth !== this.state.paletteWidth) {
			this.setState({ paletteWidth: paletteWidth });
		}
	}

	getSvgViewportOffset() {
		return this.refs.canvas.getSvgViewportOffset();
	}

	initializeController(props) {
		this.canvasController.setCanvasConfig(props.config);
		this.canvasController.setContextMenuConfig(props.contextMenuConfig);

		this.canvasController.setHandlers({
			contextMenuHandler: props.contextMenuHandler,
			contextMenuActionHandler: props.contextMenuActionHandler,
			editActionHandler: props.editActionHandler,
			clickActionHandler: props.clickActionHandler,
			decorationActionHandler: props.decorationActionHandler,
			toolbarMenuActionHandler: props.toolbarMenuActionHandler,
			tipHandler: props.tipHandler,
			idGeneratorHandler: props.idGeneratorHandler,
			selectionChangeHandler: props.selectionChangeHandler
		});
	}

	openPalette() {
		if (this.objectModel.getPaletteData()) {
			this.setState({ isPaletteOpen: true });
		}
		this.setPaletteWidth();
	}

	closePalette() {
		this.setState({ isPaletteOpen: false });
		this.setPaletteWidth();
	}

	isPaletteOpen() {
		return this.state.isPaletteOpen;
	}

	openContextMenu(menuDef) {
		this.setState({ showContextMenu: true, contextMenuDef: menuDef });
	}

	closeContextMenu() {
		this.setState({ showContextMenu: false, contextMenuDef: {} });
	}

	isContextMenuDisplayed() {
		return this.state.showContextMenu;
	}

	openNotificationPanel() {
		this.setState({ isNotificationOpen: true });
	}

	closeNotificationPanel() {
		this.setState({ isNotificationOpen: false });
	}

	openTip(tipDef) {
		const that = this;
		if (this.pendingTooltip) {
			clearTimeout(this.pendingTooltip);
		}

		this.pendingTooltip = setTimeout(function() {
			that.tipOpening = true;
			that.setState({ tipDef: tipDef });
			that.tipOpening = false;
		}, tipDef.delay ? tipDef.delay : 750);
	}

	closeTip() {
		if (this.pendingTooltip) {
			clearTimeout(this.pendingTooltip);
		}
		if (this.isTipOpen()) {
			this.tipClosing = true;
			this.setState({ tipDef: {} });
			this.tipClosing = false;
		}
	}

	isTipOpen() {
		return !isEmpty(this.state.tipDef);
	}

	isTipOpening() {
		return this.tipOpening;
	}

	isTipClosing() {
		return this.tipClosing;
	}

	zoomIn() {
		this.refs.canvas.zoomIn();
	}

	zoomOut() {
		this.refs.canvas.zoomOut();
	}

	zoomToFit() {
		this.refs.canvas.zoomToFit();
	}

	focusOnCanvas() {
		this.refs.canvas.focusOnCanvas(); // Set focus on div so keybord events go there.
	}

	configureToolbarButtonsState() {
		// We only set toolbar state with the internal object model. With the
		// external object model the host app must set toolbar state through the
		// toolbar config params.
		if (!this.canvasController.isInternalObjectModelEnabled()) {
			return;
		}

		let undoState = true;
		let redoState = true;
		let cutState = true;
		let copyState = true;
		let pasteState = true;
		let deleteState = true;

		if (!this.canvasController.canUndo()) {
			undoState = false;
		}
		if (!this.canvasController.canRedo()) {
			redoState = false;
		}
		if (this.objectModel.getSelectedObjectIds().length === 0) {
			cutState = false;
			copyState = false;
			deleteState = false;
		}
		if (this.canvasController.isClipboardEmpty()) {
			pasteState = false;
		}

		if (typeof this.state.toolbarConfig !== "undefined") {
			for (let i = 0; i < this.state.toolbarConfig.length; i++) {
				if (this.state.toolbarConfig[i].action === "undo") {
					this.state.toolbarConfig[i].enable = undoState;
				}
				if (this.state.toolbarConfig[i].action === "redo") {
					this.state.toolbarConfig[i].enable = redoState;
				}
				if (this.state.toolbarConfig[i].action === "cut") {
					this.state.toolbarConfig[i].enable = cutState;
				}
				if (this.state.toolbarConfig[i].action === "copy") {
					this.state.toolbarConfig[i].enable = copyState;
				}
				if (this.state.toolbarConfig[i].action === "paste") {
					this.state.toolbarConfig[i].enable = pasteState;
				}
				if (this.state.toolbarConfig[i].action === "delete") {
					this.state.toolbarConfig[i].enable = deleteState;
				}
			}
		}

		if (typeof this.state.notificationConfig !== "undefined") {
			this.state.notificationConfig.enable = this.canvasController.getNotificationMessages().length > 0;
		}
	}

	render() {
		let canvas = null;
		let palette = null;
		let contextMenuWrapper = null;
		let canvasToolbar = null;
		let notificationPanel = null;
		let rightFlyout = (<div className="right-flyout-panel" />);
		let tip = null;
		const canvasInfo = this.objectModel.getCanvasInfo();

		if (canvasInfo !== null) {
			if (this.state.showContextMenu) {
				contextMenuWrapper = (<ContextMenuWrapper
					containingDivId={this.itemsContainerDivId}
					contextMenuDef={this.state.contextMenuDef}
					canvasController={this.canvasController}
				/>);
			}

			canvas = (
				<DiagramCanvasD3
					ref="canvas"
					canvasInfo={canvasInfo}
					config={this.props.config}
					canvasController={this.canvasController}
					isCanvasEmpty={this.objectModel.isPrimaryPipelineEmpty()}
				>
					{contextMenuWrapper}
				</DiagramCanvasD3>);

			if (this.objectModel.getPaletteData()) {
				if (this.props.config.enablePaletteLayout === "Modal") {
					palette = (<Palette
						paletteJSON={this.objectModel.getPaletteData()}
						showPalette={this.state.isPaletteOpen}
						parentDivId={this.itemsContainerDivId}
						canvasController={this.canvasController}
					/>);
				} else {
					palette = (<PaletteFlyout
						paletteJSON={this.objectModel.getPaletteData()}
						showPalette={this.state.isPaletteOpen}
						canvasController={this.canvasController}
						paletteWidth={this.state.paletteWidth}
					/>);
				}
			}

			const notificationHeader = this.state.notificationConfig && this.state.notificationConfig.notificationHeader
				? this.state.notificationConfig.notificationHeader
				: DEFAULT_NOTIFICATION_HEADER;
			notificationPanel = (<NotificationPanel
				notificationHeader={notificationHeader}
				isNotificationOpen={this.state.isNotificationOpen}
				messages={this.canvasController.getNotificationMessages()}
				canvasController={this.canvasController}
			/>);

			if (this.props.toolbarConfig) {
				this.configureToolbarButtonsState();
				canvasToolbar = (<Toolbar
					config={this.state.toolbarConfig}
					notificationConfig={this.state.notificationConfig}
					isPaletteOpen={this.state.isPaletteOpen}
					isNotificationOpen={this.state.isNotificationOpen}
					canvasController={this.canvasController}
				/>);
			}
		}

		if (typeof this.state.rightFlyoutContent !== "undefined" &&
				this.state.rightFlyoutContent !== null &&
				this.props.showRightFlyout) {
			rightFlyout = (<div className="right-flyout-panel">
				{this.state.rightFlyoutContent}
			</div>);
		}

		if (!isEmpty(this.state.tipDef)) {
			tip = (<TooltipWrapper
				id={this.state.tipDef.id}
				type={this.state.tipDef.type}
				customContent={this.state.tipDef.customContent}
				targetObj={this.state.tipDef.targetObj}
				mousePos={this.state.tipDef.mousePos}
				node={this.state.tipDef.node}
				port={this.state.tipDef.port}
				nodeTemplate={this.state.tipDef.nodeTemplate}
				category={this.state.tipDef.category}
				canvasController={this.canvasController}
			/>);
		}

		return (
			<div className="common-canvas" onDragOver={this.onDragOver} onDrop={this.onDrop}>
				{palette}
				<div className="common-canvas-right-side-items">
					<div id={this.itemsContainerDivId} className="common-canvas-items-container">
						{canvas}
						{canvasToolbar}
						{notificationPanel}
					</div>
					{rightFlyout}
				</div>
				{tip}
			</div>
		);
	}
}

CommonCanvas.propTypes = {
	canvasController: PropTypes.object.isRequired,
	config: PropTypes.object.isRequired,
	toolbarConfig: PropTypes.array,
	notificationConfig: PropTypes.object,
	contextMenuConfig: PropTypes.object,
	contextMenuHandler: PropTypes.func,
	contextMenuActionHandler: PropTypes.func,
	editActionHandler: PropTypes.func,
	clickActionHandler: PropTypes.func,
	decorationActionHandler: PropTypes.func,
	toolbarMenuActionHandler: PropTypes.func,
	tipHandler: PropTypes.func,
	idGeneratorHandler: PropTypes.func,
	selectionChangeHandler: PropTypes.func,
	rightFlyoutContent: PropTypes.object,
	showRightFlyout: PropTypes.bool
};
