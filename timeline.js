document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const body = document.body;

    function checkVisibilityAndUpdateBackground() {
        let foundVisible = false;
        timelineItems.forEach(item => {
            if (isElementInViewport(item)) {
                item.classList.add('visible');
                if (!foundVisible) {
                    const background = item.getAttribute('data-background');
                    if (background) {
                        body.style.backgroundImage = background;
                        foundVisible = true;
                    }
                }
            } else {
                item.classList.remove('visible');
            }
        });

        if (!foundVisible) {
            body.style.backgroundImage = "url('default.jpg')";
        }
    }

    window.addEventListener('scroll', throttle(checkVisibilityAndUpdateBackground, 100));
    checkVisibilityAndUpdateBackground(); // Trigger on page load

    // Add hover scaling effect on timeline items
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            item.classList.add('active');
        });
        item.addEventListener('mouseleave', () => {
            item.classList.remove('active');
        });
    });

    // Collapsible Content (For showing information when clicked)
    document.querySelectorAll('.collapsible').forEach(button => {
        button.addEventListener('click', function () {
            this.classList.toggle('active');
            const content = this.nextElementSibling;
            content.style.maxHeight = content.style.maxHeight ? null : content.scrollHeight + "px";

            const title = this.closest('.timeline-item').querySelector('h2').textContent;
            const contentText = this.getAttribute('onclick').match(/'([^']+)', '([^']+)'/)[2]; // Extract content
            showCard(title, contentText);
        });
    });

    // Function to show the central card with information
    function showCard(title, content) {
        const card = document.getElementById('info-box');
        const cardTitle = document.getElementById('info-title');
        const cardContent = document.getElementById('info-text');

        if (card && cardTitle && cardContent) {
            cardTitle.textContent = title;
            cardContent.textContent = content;

            card.style.display = "block";
        } else {
            console.error("One or more card elements not found!");
        }
    }

    // Function to hide the card
    function hideCard() {
        const card = document.getElementById('info-box');
        if (card) {
            card.style.display = "none";
        }
    }
});
