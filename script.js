// Fading Navbar
let lastScrollTop = 0;
const header = document.querySelector('header');

window.addEventListener(
    'scroll',
    throttle(() => {
        const currentScrollTop = window.scrollY;

        if (currentScrollTop > lastScrollTop) {
            header.classList.add('hidden');
        } else {
            header.classList.remove('hidden');
        }

        lastScrollTop = currentScrollTop <= 0 ? 0 : currentScrollTop;
    }, 100)
);

// Timeline Animation
document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll('.timeline-item');

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top < (window.innerHeight || document.documentElement.clientHeight) &&
            rect.bottom > 0
        );
    }

    function checkVisibility() {
        timelineItems.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add('visible');
            }
        });
    }

    window.addEventListener('scroll', throttle(checkVisibility, 100));
    checkVisibility();
});

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

document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const body = document.body;

    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top < window.innerHeight && rect.bottom > 0
        );
    }

    function updateBackground() {
        let foundVisible = false;

        timelineItems.forEach(item => {
            if (isElementInViewport(item) && !foundVisible) {
                const background = item.getAttribute('data-background');
                if (background) {
                    body.style.backgroundImage = background;
                    foundVisible = true; // Ensure only one item sets the background
                }
            }
        });

        // Optional: Set a default background when no timeline item is in view
        if (!foundVisible) {
            body.style.backgroundImage = "url('default.jpg')";
        }
    }

    window.addEventListener('scroll', throttle(updateBackground, 100));
    updateBackground(); // Trigger on page load
});

// Throttle function to improve performance
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
