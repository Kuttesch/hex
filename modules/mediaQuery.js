function getGridElementSize() {
    const viewportWidth = window.innerWidth;
    const gridElementWidth = viewportWidth / 5;
    console.log(gridElementWidth);
    return gridElementWidth;
}

export { getGridElementSize };