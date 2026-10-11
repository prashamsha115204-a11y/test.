class ImageSlider {
    constructor(selector) {
        this.ImageSlider = document.querySelector(selector);
        this.track = this.ImageSlider.querySelector('.slider-track');
        this.slides = Array.from(this.track.children);
        this.prevBtn = this.ImageSlider.querySelector('.prev');
        this.nextBtn = this.ImageSlider.querySelector('.next');
        this.dotsContainer = this.ImageSlider.querySelector('.slider-dots');
        this.dots = [];
        this.currentIndex = 0;
        this.autoSlide = null;
        this.isHovered = false;

        this.init();
    }

    init() {
        this.bindEvents();
        this.createDots();
        this.updateSlidePosition();
        this.updateDots();
        this.startAutoSlide();
    }

    updateSlidePosition() {
        const offset = this.currentIndex * this.ImageSlider.offsetWidth;
        this.track.style.transform = `translateX(-${offset}px)`;
    }

    nextslide() {
        this.currentIndex = (this.currentIndex + 1) % this.slides.length;
        this.updateSlidePosition();
        this.updateDots();
    }

    prevslide() {
        if (this.currentIndex > 0) {
            this.currentIndex--;
        } else {
            this.currentIndex = this.slides.length - 1;
        }

        this.updateSlidePosition();
        this.updateDots();
    }

    startAutoSlide() {
        this.stopAutoSlide();

        if (this.isHovered) {
            return;
        }

        this.autoSlide = setInterval(() => {
            this.nextslide();
        }, 5000);
    }

    stopAutoSlide() {
        clearInterval(this.autoSlide);
    }

    bindEvents() {
        this.nextBtn.addEventListener('click', () => {
            this.nextslide();
            this.startAutoSlide();
        });

        this.prevBtn.addEventListener('click', () => {
            this.prevslide();
            this.startAutoSlide();
        });

        this.ImageSlider.addEventListener('mouseenter', () => {
            this.isHovered = true;
            this.stopAutoSlide();
        });

        this.ImageSlider.addEventListener('mouseleave', () => {
            this.isHovered = false;
            this.startAutoSlide();
        });

        window.addEventListener('resize', () => {
            this.updateSlidePosition();
        });
    }

    createDots() {
        this.dotsContainer.innerHTML = "";
        this.dots = [];

        this.slides.forEach((_, index) => {
            const dot = document.createElement("span");

            dot.classList.add("dot");
            dot.setAttribute("role", "button");
            dot.setAttribute("tabindex", "0");
            dot.setAttribute("aria-label", `Go to image ${index + 1}`);

            dot.addEventListener("click", () => {
                this.currentIndex = index;
                this.updateSlidePosition();
                this.updateDots();
                this.startAutoSlide();
            });

            dot.addEventListener("keydown", (event) => {
                if (event.key === "Enter" || event.key === " ") {
                    event.preventDefault();
                    this.currentIndex = index;
                    this.updateSlidePosition();
                    this.updateDots();
                    this.startAutoSlide();
                }
            });

            this.dotsContainer.appendChild(dot);
            this.dots.push(dot);
        });
    }

    updateDots() {
        this.dots.forEach((dot, index) => {
            dot.classList.toggle("active", index === this.currentIndex);
        });
    }
}

document.addEventListener('DOMContentLoaded', () => {
    new ImageSlider('.slider');
});
