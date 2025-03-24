document.addEventListener("DOMContentLoaded", function() {
    // Enable copy-paste in all input fields
    document.querySelectorAll("input, textarea").forEach(input => {
        input.onpaste = function(event) {
            event.stopPropagation(); // Allow paste
        };
        input.oncopy = function(event) {
            event.stopPropagation(); // Allow copy
        };
        input.oncut = function(event) {
            event.stopPropagation(); // Allow cut
        };
    });
});
