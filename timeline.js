// Throttle Helper
function throttle(func, limit) {
    let lastFunc;
    let lastRan;
    return function () {
        const context = this;
        const args = arguments;
        if (!lastRan) {
            func.apply(context, args);
            lastRan = Date.now();
        } else {
            clearTimeout(lastFunc);
            lastFunc = setTimeout(function () {
                if (Date.now() - lastRan >= limit) {
                    func.apply(context, args);
                    lastRan = Date.now();
                }
            }, limit - (Date.now() - lastRan));
        }
    };
}

// Function to check if an element is in the viewport
function isElementInViewport(el) {
    const rect = el.getBoundingClientRect();
    return (
        rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
        rect.bottom > 0
    );
}

// Fading Navbar on Scroll
let lastScrollTop = 0;
const header = document.querySelector('header');
window.addEventListener('scroll', throttle(() => {
    const currentScrollTop = window.scrollY;
    if (currentScrollTop > lastScrollTop) {
        header.classList.add('hidden');
    } else {
        header.classList.remove('hidden');
    }
    lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
}, 100));

// Timeline Animation
document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const body = document.body;

    function checkVisibility() {
        timelineItems.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add('visible');
            }
        });
    }

    // Update background based on timeline item visibility
    function updateBackground() {
        let foundVisible = false;

        timelineItems.forEach(item => {
            if (isElementInViewport(item) && !foundVisible) {
                const background = item.getAttribute('data-background');
                if (background) {
                    body.style.backgroundImage = background;
                    foundVisible = true;
                }
            }
        });

        // Optional: Set a default background when no timeline item is in view
        if (!foundVisible && body.style.backgroundImage !== "url('default.jpg')") {
            body.style.backgroundImage = "url('default.jpg')";
        }
    }

    window.addEventListener('scroll', throttle(checkVisibility, 100));
    window.addEventListener('scroll', throttle(updateBackground, 100));

    checkVisibility(); // Trigger on page load
    updateBackground(); // Trigger on page load
});

// Collapsible Content
var coll = document.getElementsByClassName("collapsible");
for (let i = 0; i < coll.length; i++) {
    coll[i].addEventListener("click", function() {
        this.classList.toggle("active");
        var content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null;
        } else {
            content.style.maxHeight = content.scrollHeight + "px";
        }
    });
}

document.addEventListener("DOMContentLoaded", function () {
    const timeline = document.querySelector('.timeline');
    let isScrolling = false;  // Flag to prevent multiple scroll events

    // Enable horizontal scroll with mouse wheel
    timeline.addEventListener('wheel', function (event) {
        if (isScrolling) return;  // Prevent multiple scroll events
        isScrolling = true;

        // Determine scroll direction
        if (event.deltaY !== 0) {
            timeline.scrollLeft += event.deltaY;  // Scroll horizontally based on vertical scroll
        }

        // Prevent default scroll behavior
        event.preventDefault();

        // Reset the scrolling flag after a short delay
        setTimeout(() => {
            isScrolling = false;
        }, 100);
    });

    // Existing Timeline Animation and Visibility Logic
    const timelineItems = document.querySelectorAll('.timeline-item');
    const body = document.body;

    function checkVisibility() {
        timelineItems.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add('visible');
            }
        });
    }

    // Update background based on timeline item visibility
    function updateBackground() {
        let foundVisible = false;

        timelineItems.forEach(item => {
            if (isElementInViewport(item) && !foundVisible) {
                const background = item.getAttribute('data-background');
                if (background) {
                    body.style.backgroundImage = background;
                    foundVisible = true;
                }
            }
        });

        // Optional: Set a default background when no timeline item is in view
        if (!foundVisible && body.style.backgroundImage !== "url('default.jpg')") {
            body.style.backgroundImage = "url('default.jpg')";
        }
    }

    window.addEventListener('scroll', throttle(checkVisibility, 100));
    window.addEventListener('scroll', throttle(updateBackground, 100));

    checkVisibility(); // Trigger on page load
    updateBackground(); // Trigger on page load
});



