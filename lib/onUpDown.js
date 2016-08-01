const moveSelection = require('./transforms/moveSelection');

function onUpDown(event, data, state, opts) {
    let transform = state.transform();

    let newTransform = moveSelection(
        opts, transform,
        0, data.key === 'up'? -1 : +1
    );

    if (newTransform !== transform) {
        event.preventDefault();
    }

    return newTransform
        .apply();
}

module.exports = onUpDown;
