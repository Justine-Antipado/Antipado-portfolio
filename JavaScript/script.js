document.addEventListener("DOMContentLoaded", function() {
    const sliderWrapper = document.querySelector(".slider-wrapper");
    const sliderItems = document.querySelectorAll(".slider-item");
    const prevButton = document.getElementById("slide-prev");
    const nextButton = document.getElementById("slide-next");
    const tabs = document.querySelectorAll(".slider-tab");
    const indicator = document.querySelector(".slider-indicator");

    let currentIndex = 0;

    // Function to update the slider position
    function updateSlider() {
        const itemWidth = sliderItems[0].offsetWidth;
        sliderWrapper.scrollLeft = currentIndex * itemWidth;
        updatePaginationIndicator(currentIndex);
    }

    // Function to update the pagination indicator
    function updatePaginationIndicator(index) {
        tabs.forEach(tab => tab.classList.remove("current"));
        tabs[index].classList.add("current");
        
        const currentTab = tabs[index];
        indicator.style.width = `${currentTab.offsetWidth}px`;
        indicator.style.transform = `translateX(${currentTab.offsetLeft}px)`;
    }

    // Event listeners for navigation buttons
    nextButton.addEventListener("click", () => {
        currentIndex = (currentIndex + 1) % sliderItems.length;
        updateSlider();
    });

    prevButton.addEventListener("click", () => {
        currentIndex = (currentIndex - 1 + sliderItems.length) % sliderItems.length;
        updateSlider();
    });

    // Event listeners for pagination tabs
    tabs.forEach((tab, index) => {
        tab.addEventListener("click", () => {
            currentIndex = index;
            updateSlider();
        });
    });

    // Listen for scroll events to update the indicator
    sliderWrapper.addEventListener("scroll", () => {
        const itemWidth = sliderItems[0].offsetWidth;
        const newIndex = Math.round(sliderWrapper.scrollLeft / itemWidth);
        if (newIndex !== currentIndex) {
            currentIndex = newIndex;
            updatePaginationIndicator(currentIndex);
        }
    });

    // Initial setup
    updatePaginationIndicator(currentIndex);
});