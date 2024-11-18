document.addEventListener("DOMContentLoaded", function() {
    const timelineItems = document.querySelectorAll('.timeline-item');

    function getClosestItemInViewport() {
        let closestItem = null;
        let closestDistance = Infinity;

        timelineItems.forEach(item => {
            const rect = item.getBoundingClientRect();
            const distance = Math.abs(rect.top - window.innerHeight / 2);

            if (distance < closestDistance) {
                closestDistance = distance;
                closestItem = item;
            }
        });

        return closestItem;
    }

    function updateTimeline() {
        const activeItem = getClosestItemInViewport();

        timelineItems.forEach(item => {
            if (item === activeItem) {
                item.classList.add('visible');
                item.querySelector('.more-info').style.display = 'block';
            } else {
                item.classList.remove('visible');
                item.querySelector('.more-info').style.display = 'none';
            }
        });
    }

    function smoothScrollToActive() {
        const activeItem = getClosestItemInViewport();

        if (activeItem) {
            activeItem.scrollIntoView({
                behavior: 'smooth',
                block: 'center',
            });
        }
    }

    window.addEventListener('scroll', updateTimeline);
    window.addEventListener('scroll', () => {
        // Optional: Add a slight delay before snapping to the closest item.
        clearTimeout(window.scrollTimeout);
        window.scrollTimeout = setTimeout(smoothScrollToActive, 100);
    });

    updateTimeline(); // Initial call
});


