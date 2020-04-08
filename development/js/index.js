function Slider(selektor) {
    this.slider = document.querySelector(selektor);
    this.btnPrev = this.slider.querySelector(".slider-prev");
    this.btnNext = this.slider.querySelector(".slider-next");
    this.slides = this.slider.querySelectorAll(".slider-el");
    this.current = 0;
}
Slider.prototype.changeSlide = function () {
    for (const el of this.slides) {
        el.classList.remove("slider-el-active");
    }
    this.slides[this.current].classList.add("slider-el-active");
}
Slider.prototype.prevSlide = function () {
    this.current--;
    if (this.current < 0) {
        this.current = this.slides.length - 1;
    }
    this.changeSlide();
}
Slider.prototype.nextSlide = function () {
    this.current++;
    if (this.current >= this.slides.length) {
        this.current = 0;
    }
    this.changeSlide();
}
Slider.prototype.bindButtons = function () {
    this.btnPrev.addEventListener('click', () => {
        console.log("klik")
        this.prevSlide();
    });
    this.btnNext.addEventListener('click', () => {
        console.log("klik")
        this.nextSlide();
    });
}
const slider = new Slider("#slider")
slider.bindButtons();
//comment