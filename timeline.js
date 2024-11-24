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

// Wait for the document to load
document.addEventListener("DOMContentLoaded", function () {
    var collapsibles = document.querySelectorAll(".collapsible");

    collapsibles.forEach(function(button) {
        button.addEventListener("click", function () {
            // Toggle the active class
            this.classList.toggle("active");

            // Get the next sibling of the button (the .content div)
            var content = this.nextElementSibling;

            // If the content is visible, hide it; otherwise, show it
            if (content.style.maxHeight) {
                content.style.maxHeight = null;
            } else {
                content.style.maxHeight = content.scrollHeight + "px";
            }
        });
    });
});


const items = document.querySelectorAll('.timeline-item');

items.forEach(item => {
    item.addEventListener('mouseover', () => {
        item.classList.add('active');
    });
    item.addEventListener('mouseout', () => {
        item.classList.remove('active');
    });

    // Optional: Scroll detection using Intersection Observer (for when items come into view)
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.5 });

    observer.observe(item);
});

const items = document.querySelectorAll('.timeline-item');

// Add active class on hover (for enlarging the item)
items.forEach(item => {
    item.addEventListener('mouseenter', () => {
        item.classList.add('active');
    });

    item.addEventListener('mouseleave', () => {
        item.classList.remove('active');
    });

    // Intersection Observer to trigger when item is in view during scrolling
    const observer = new IntersectionObserver(entries => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('active');
            } else {
                entry.target.classList.remove('active');
            }
        });
    }, { threshold: 0.5 });

    observer.observe(item);
});

document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const body = document.body;

    // Function to handle scaling on scroll (minimize/enlarge items)
    function handleScaling() {
        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.left < window.innerWidth && rect.right > 0) {
                item.classList.add('active');  // Enlarging the active item
            } else {
                item.classList.remove('active');  // Minimized state
            }
        });
    }

    // Update background based on the active timeline item
    function updateBackground() {
        let foundVisible = false;

        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            if (rect.left < window.innerWidth && rect.right > 0 && !foundVisible) {
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

    // Add 'active' class on hover (for enlarging the item)
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('active');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('active');
        });

        // Intersection Observer to trigger when item is in view during scrolling
        const observer = new IntersectionObserver(entries => {
            entries.forEach(entry => {
                if (entry.isIntersecting) {
                    entry.target.classList.add('active');
                } else {
                    entry.target.classList.remove('active');
                }
            });
        }, { threshold: 0.5 });

        observer.observe(item);
    });

    // Scroll event listener to trigger the scaling effect and background update
    window.addEventListener('scroll', throttle(() => {
        handleScaling();  // Handle item scaling during scroll
        updateBackground();  // Update background based on active item
    }, 100));

    // Initial call to ensure proper scaling and background update on page load
    handleScaling();
    updateBackground();
});


// Create an IntersectionObserver to observe when the timeline items come into view
const observer = new IntersectionObserver((entries, observer) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            // Add the 'visible' class to make images fade in
            entry.target.classList.add('visible');
        } else {
            // Optionally remove the 'visible' class when the item is not in view
            entry.target.classList.remove('visible');
        }
    });
}, {
    threshold: 0.5 // Trigger when 50% of the item is in view
});

// Select all the timeline items and observe them
document.querySelectorAll('.timeline-item').forEach(item => {
    observer.observe(item);
});

// Select all collapsible buttons
const collapsibles = document.querySelectorAll('.collapsible');

collapsibles.forEach(button => {
    button.addEventListener('click', function () {
        // Toggle active class on the button
        this.classList.toggle('active');
        
        // Toggle visibility of the next sibling element (the .content div)
        const content = this.nextElementSibling;
        if (content.style.maxHeight) {
            content.style.maxHeight = null; // Collapse content
        } else {
            content.style.maxHeight = content.scrollHeight + "px"; // Expand content
        }
    });
});

