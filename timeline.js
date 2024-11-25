document.addEventListener("DOMContentLoaded", function () {
    const timelineItems = document.querySelectorAll('.timeline-item');
    const body = document.body;

    // Add event listeners for mouse enter and mouse leave on all timeline items
    timelineItems.forEach(item => {
        item.addEventListener('mouseenter', () => {
            // Enlarge the item on hover
            item.classList.add('active');

            // Change the background image of the body to match the item's data-background
            const background = item.getAttribute('data-background');
            if (background) {
                body.style.backgroundImage = background;  // Set body background to the item's image
            }
        });

        item.addEventListener('mouseleave', () => {
            // Remove the enlargement on hover leave
            item.classList.remove('active');

            // Reset the background image when mouse leaves
            body.style.backgroundImage = '';  // Remove background image
        });
    });

    // Function to check visibility of timeline items and update the background if needed
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
            body.style.backgroundImage = "url('default.jpg')";  // Reset to default image
        }
    }

    window.addEventListener('scroll', throttle(checkVisibilityAndUpdateBackground, 100));
    checkVisibilityAndUpdateBackground(); // Trigger on page load

    // Add event listeners to all collapsible buttons
    document.querySelectorAll('.collapsible').forEach(button => {
        button.addEventListener('click', () => {
            // Toggle the 'active' class to show/hide the content
            const content = button.nextElementSibling;
            if (content.style.maxHeight) {
                content.style.maxHeight = null; // Hide content
            } else {
                content.style.maxHeight = content.scrollHeight + "px"; // Show content
            }
            button.classList.toggle('active');
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

// Get all the buttons and modals
const buttons = document.querySelectorAll('.collapsible');
const modals = document.querySelectorAll('.modal');
const closeButtons = document.querySelectorAll('.close');

// Open the corresponding modal when a button is clicked
buttons.forEach(button => {
    button.addEventListener('click', function () {
        const modalId = this.getAttribute('data-target');
        const modal = document.getElementById(modalId);
        modal.style.display = "block";  // Show the modal
    });
});

// Close the modal when the close button is clicked
closeButtons.forEach(closeBtn => {
    closeBtn.addEventListener('click', () => {
        const modal = closeBtn.closest('.modal');
        modal.style.display = "none";  // Hide the modal
    });
});

// Close the modal when the user clicks anywhere outside the modal content
window.addEventListener('click', function (event) {
    modals.forEach(modal => {
        if (event.target === modal) {
            modal.style.display = "none";  // Close modal if clicked outside of content
        }
    });
});

// Function to open the modal
function openModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "block";
}

// Function to close the modal
function closeModal(modalId) {
    const modal = document.getElementById(modalId);
    modal.style.display = "none";
}

// Event listener to close modal when clicking outside of it
window.onclick = function(event) {
    const modals = document.getElementsByClassName('modal');
    for (let i = 0; i < modals.length; i++) {
        if (event.target === modals[i]) {
            modals[i].style.display = "none";
        }
    }
};

// Throttle function to limit the rate at which a function can fire
function throttle(func, limit) {
    let inThrottle;
    return function() {
        const args = arguments;
        const context = this;
        if (!inThrottle) {
            func.apply(context, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    }
}
