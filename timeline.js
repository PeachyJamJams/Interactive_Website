document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll(".timeline-item");

    // Function to check if the item is in the viewport
    function isElementInViewport(el) {
        const rect = el.getBoundingClientRect();
        return (
            rect.top >= 0 &&
            rect.left >= 0 &&
            rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
            rect.right <= (window.innerWidth || document.documentElement.clientWidth)
        );
    }

    // Function to handle visibility transitions
    function updateTimeline() {
        timelineItems.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add("visible");
            } else {
                item.classList.remove("visible");
            }
        });
    }

    // Smooth scroll to the active item in the viewport
    function smoothScrollToActive() {
        const activeItem = getClosestItemInViewport();
        if (activeItem) {
            activeItem.scrollIntoView({
                behavior: "smooth",
                block: "center",
            });
        }
    }

    // Tooltip logic for hovering over timeline items
    const tooltip = document.createElement("div");
    tooltip.className = "tooltip";
    document.body.appendChild(tooltip);

    document.addEventListener("mousemove", function (e) {
        const target = e.target.closest(".timeline-item[data-tooltip]");
        if (target) {
            tooltip.textContent = target.getAttribute("data-tooltip");
            tooltip.style.top = e.pageY + 10 + "px";
            tooltip.style.left = e.pageX + 10 + "px";
            tooltip.style.opacity = "1";
        } else {
            tooltip.style.opacity = "0";
        }
    });

    // Click-to-expand functionality
    timelineItems.forEach(item => {
        item.addEventListener("click", function () {
            const moreInfo = item.querySelector(".more-info");
            if (moreInfo) {
                moreInfo.classList.toggle("show");
            }
        });
    });

    // Listen for scroll events
    window.addEventListener("scroll", updateTimeline);
    window.addEventListener("scroll", () => {
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(smoothScrollToActive, 100);
    });

    // Initial visibility check
    updateTimeline();
});


