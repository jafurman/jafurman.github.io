// Toggles the "Description" text and the per-project media buttons.
// Media is now <img>/<video> pairs (the old animated GIFs were 20+ MB), and the
// show/hide is scoped to one project card instead of the whole page, so
// clicking a button here no longer hides another project's media.

function toggleDescription(documentID) {
    var description = document.getElementById(documentID);
    if (!description) {
        console.error("Element with ID '" + documentID + "' not found.");
        return;
    }
    var open = description.style.display === 'none' || description.style.display === '';
    description.style.display = open ? 'block' : 'none';
    var button = document.querySelector('[onclick="toggleDescription(\'' + documentID + '\')"]');
    if (button) {
        button.textContent = open ? 'Hide details' : 'Description';
    }
}

function toggleImage(index, clicked) {
    var card = clicked ? clicked.closest('.project') : document;
    if (!card) { card = document; }
    var media = card.querySelectorAll('.image');
    var buttons = card.querySelectorAll('.buttons button');

    media.forEach(function (el, i) {
        var on = (i === index);
        el.style.display = on ? 'block' : 'none';
        if (el.tagName === 'VIDEO') {
            if (on) { el.play().catch(function () {}); } else { el.pause(); }
        }
    });

    buttons.forEach(function (button, i) {
        button.disabled = (i === index);
    });
}

document.addEventListener("DOMContentLoaded", function () {
    // Each project card starts on its first image instead of showing nothing
    // until a button is pressed.
    document.querySelectorAll('.project-images').forEach(function (group) {
        var card = group.closest('.project');
        if (!card) { return; }
        var first = group.querySelector('.image');
        var buttons = card.querySelectorAll('.buttons button');
        if (first) { first.style.display = 'block'; }
        card.querySelectorAll('.image').forEach(function (el, i) {
            if (i !== 0) { el.style.display = 'none'; }
        });
        buttons.forEach(function (button, i) { button.disabled = (i === 0); });
    });
});
