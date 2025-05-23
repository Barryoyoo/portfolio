let mySwiper; // Declare swiper instance globally

document.addEventListener('DOMContentLoaded', () => {
    // Initialize Swiper with cube effect
    mySwiper = new Swiper(".mySwiper", {
        direction: "horizontal", // Cube effect typically works horizontally
        loop: false, // Keep as false unless you want continuous looping
        speed: 1000, // Speed of the slide transition in ms (adjusted to 1000 for your navigate function)
        allowTouchMove: false, // Disable touch swipe for navigation
        grabCursor: false, // Hide grab cursor

        effect: "cube", // Your preferred cube effect
        cubeEffect: {
            shadow: true,
            slideShadows: true,
            shadowOffset: 20, // Distance for the shadow from the slide
            shadowScale: 0.94, // Scale of the shadow
        },

        // Keyboard control (optional, but good for accessibility)
        keyboard: {
            enabled: true,
            onlyInViewport: true,
        },

        // Mousewheel control (optional)


        // Update navigation active state on slide change
        on: {
            slideChange: function () {
                // 'this' refers to the swiper instance inside this function
                updateNavigationActiveState(this.activeIndex);

                // Optional: Trigger skill bar animation when 'About' slide is active
                if (this.activeIndex === 1) { // Assuming 'About' is the second slide (index 1)
                    animateSkillBars();
                }
            },
        },
    });

    // Initial update of navigation active state when the page loads
    updateNavigationActiveState(mySwiper.activeIndex);
});

// Function to navigate to a specific slide (called from onclick in HTML)
function navigate(indx) {
    if (mySwiper) {
        // Remove 'active' class from all navigation links
        document.querySelectorAll("aside .links li").forEach(link => {
            link.classList.remove("active");
        });

        // Add 'active' class to the clicked navigation link
        // Use 'indx' to select the correct list item
        const clickedLink = document.querySelectorAll("aside .links li")[indx];
        if (clickedLink) {
            clickedLink.classList.add("active");
        }

        // Slide to the corresponding Swiper slide
        mySwiper.slideTo(indx, 1000, true); // Use the same speed as swiper initialization for consistency
    }
}

// Function to update the active class on navigation links when Swiper changes slides (e.g., via keyboard, mousewheel if enabled)
function updateNavigationActiveState(activeIndex) {
    const navLinks = document.querySelectorAll('aside .links li');
    navLinks.forEach((link, index) => {
        if (index === activeIndex) {
            link.classList.add('active');
        } else {
            link.classList.remove('active');
        }
    });
}

// Function to animate skill bars
function animateSkillBars() {
    document.querySelectorAll('.Skill-bar .active-bar').forEach(bar => {
        const width = bar.style.width; // Get the target width set in HTML
        bar.style.width = '0%'; // Reset to 0 to re-trigger animation
        // Force reflow
        void bar.offsetWidth;
        bar.style.width = width; // Set back to target width
    });
}

// Optional: Add event listener for the "Scroll for next slide" if you want it to trigger Swiper
// You could also simply rely on mousewheel/keyboard or touch swipe if enabled.
document.querySelector('.slide-help')?.addEventListener('click', () => {
    if (mySwiper) {
        mySwiper.slideNext();
    }
});