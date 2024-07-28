/**
 * This module contains functions that are used to handle the color cards and their selection, including the grid positioning of the selected color card.
 *
 * @module itemSelection
 * 
 * @exports clickColorCard
 * @exports selectItem
 * @exports deselectItem
 * @exports setGridPosition
 * @exports resetGridPosition
 * @exports setGridElementSize
 * 
 */
import { appendInnerDiv, removeInnerDiv } from "./gridItem.js";
import { getGridElementSize } from "./gridItem.js";

/**
 * Variable to store the status of the selection.
 *
 */
let selectionStatus = null;

/**
 * Function to handle the click event on a color card.
 *
 */
function clickColorCard() {
    const selectedDiv = this;
    const selectedDivId = selectedDiv.id;

    /**
     * If the selection status is null, the clicked color card is selected.
     * If the selection status is the same as the clicked color card, the color card is deselected.
     * If the selection status is different from the clicked color card, the previously selected color card is deselected and the new one is selected.
     */
    console.log("SelectionStatus: " + selectionStatus);
    if (selectionStatus === null) {
        selectItem(selectedDiv);
    } else if (selectionStatus === selectedDivId) {
        deselectItem(selectedDivId);
    } else {
        deselectItem(selectionStatus);
        selectItem(selectedDiv);
    }
}

/**
 * Function to select a color card.
 * The selected color card is highlighted, its position in the grid is set and the inner div with the color code is appended.
 * 
 * @param {Div} selectedDiv 
 * 
 */
function selectItem(selectedDiv) {
    selectionStatus = selectedDiv.id;
    selectedDiv.classList.add("selected");
    console.log("Selected: " + selectedDiv.id);
    selectedDiv.style.marginLeft = "0.25vh";
    selectedDiv.style.marginTop = "0.25vh";
    setGridPosition(selectedDiv.id);
    console.log("Set Grid Position reached");
    appendInnerDiv(selectedDiv.id, selectedDiv.dataset.value);
}

/**
 * Function to deselect a color card.
 * The color card is unhighlighted, its position in the grid is reset and the inner div with the color code is removed.
 * 
 * @param {DivId} selectionStat
 * 
 */
function deselectItem(selectionStat) {
    const selectedDiv = document.getElementById(selectionStat);
    selectionStatus = null;
    selectedDiv.classList.remove("selected");
    selectedDiv.style.backgroundColor = selectedDiv.dataset.value;
    selectedDiv.style.marginLeft = "0";
    selectedDiv.style.marginTop = "0";
    resetGridPosition(selectedDiv.id);
    removeInnerDiv(selectedDiv.id);
}

/**
 * Variables to store the number of columns and rows the selected color card should span.
 * Easy to adjust for different screen sizes or layouts.
 */
var ItemSpanColumn = 2;
var ItemSpanRow = 2;
/**
 * If the window width is less than 600px, the number of columns and rows the selected color card should span is adjusted.
 * This assures that the selected color card is displayed correctly and aesthetically pleasing on mobile devices.
 */
if (window.innerWidth < 600) {
    console.log("Inner Width: " + window.innerWidth);
    ItemSpanColumn = 3;
    ItemSpanRow = 1;
}

/**
 * Function to set the position of the selected color card in the grid.
 * The selected color card spans over the specified number of columns and rows.
 * The size of the selected color card is adjusted to fit the grid.
 * 
 * @param {DivId} div 
 */
function setGridPosition(div) {
    const gridContainer = document.getElementById("color-grid");
    const Viewport = window.innerWidth;
    const gridItem = document.getElementById(div);
    // The gap between the grid items is set to 0.5% of the viewport width. This value comes from the CSS grid-gap property.
    const gap = 0.005 * Viewport;
    // The size of a grid item is set to 5% of the viewport width. This value comes from the CSS --grid-item-size property set for larger screens.
    let gridItemSize = 0.05 * Viewport;
    // The size of the selected color card is calculated based on the number of columns and rows it should span including the gap between the grid items.
    let ItemExpandedColumn = gridItemSize * ItemSpanColumn + gap * (ItemSpanColumn - 1);
    let ItemExpandedRow = gridItemSize * ItemSpanRow + gap * (ItemSpanRow - 1);

    // If the window width is less than 600px, the size of the grid item is adjusted to fit the grid.
    if (window.innerWidth < 600) {
        gridItemSize = getGridElementSize();
        ItemExpandedColumn = gridItemSize * ItemSpanColumn;
        ItemExpandedRow = gridItemSize * ItemSpanRow;
    }
    /**
     * The position of the selected color card in the grid is calculated based on the number of items per row and the position of the selected color card.
     * If the selected color card would exceed to the right of the grid, the selected item is moved to the left to assure that it fits into the grid and stays in the same row.
     * The grid column and row span of the selected color card is set. 
     * 
     */
    const ContainerWidth = gridContainer.clientWidth;
    const ItemWidth = gridItemSize + gap;
    const ItemNumber = parseInt(gridItem.dataset.number);
    const itemsPerRow = Math.floor(ContainerWidth / ItemWidth);
    const ItemPositionRow = ((ItemNumber - 1) % itemsPerRow) + 1;
    const ItemPositionColumn = Math.floor((ItemNumber - 1) / itemsPerRow) + 1;

    if (ItemPositionRow > itemsPerRow - ItemSpanColumn + 1) {
        const start = document.getElementById(
            "grid-item-" + (itemsPerRow * ItemPositionColumn - (ItemSpanColumn - 1))
        );
        if (start) {
            gridContainer.insertBefore(gridItem, start);
        }
    }
    // The necessary CSS properties are set to position the selected color card in the grid.
    gridItem.style.gridColumn = "span " + ItemSpanColumn;
    console.log("Set Grid Column span to:" + ItemSpanColumn);
    gridItem.style.gridRow = "span " + ItemSpanRow;
    console.log("Set Grid Row span to:" + ItemSpanRow);
    gridItem.style.width = ItemExpandedColumn + "px";
    console.log("Set Grid Width to:" + ItemExpandedColumn);
    gridItem.style.height = ItemExpandedRow + "px";
    console.log("Set Grid Height to:" + ItemExpandedRow);
}

/**
 * Function to reset the position of the selected color card in the grid.
 * The selected color card is moved to its original position in the grid.
 * 
 * @param {DivId} div 
 * 
 */
function resetGridPosition(div) {
    const gridContainer = document.getElementById("color-grid");
    const gridItem = document.getElementById(div);
    const divNumber = gridItem.dataset.number;
    const followingDiv = document.getElementById(
        "grid-item-" + (parseInt(divNumber) + 1)
    );
    gridContainer.insertBefore(gridItem, followingDiv);

    gridItem.style.gridColumn = "span 1";
    gridItem.style.gridRow = "span 1";
    gridItem.style.width = "calc(var(--grid-item-size) * 1)";
    gridItem.style.height = "calc(var(--grid-item-size) * 1)";
}

/**
 * Function to set the size of the grid element for mobile devices (<600px).
 * The size of the grid element is calculated based on the viewport width.
 * 
 */
function setGridElementSize() {
    if (window.innerWidth < 600) {
        const gridElementSize = getGridElementSize();
        const root = document.documentElement;
        root.style.setProperty("--grid-item-size", gridElementSize + "px");
    }
}

/**
 * Export the functions to be used in other modules.
 * 
 */
export { clickColorCard, selectItem, deselectItem, setGridPosition, resetGridPosition, setGridElementSize, };
