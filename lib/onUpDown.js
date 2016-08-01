const moveSelection = require('./transforms/moveSelection');

function onUpDown(event, data, state, opts) {
    let transform = state.transform();

    let newTranform = moveSelection(
        opts, transform,
        0, data.key === 'up'? -1 : +1
    );

    if (newTranform != transform) {
        event.preventDefault();
    }

    return newTranform
        .apply();
}

module.exports = onUpDown;
