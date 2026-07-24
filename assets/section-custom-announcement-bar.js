class CustomAnnouncementBar extends HTMLElement {
  connectedCallback() {
    this.sliderEl = this.querySelector('.swiper');

    if (!this.sliderEl || typeof Swiper === 'undefined') return;

    const autoRotate = this.dataset.autoplay === 'true';
    const speed = Number(this.dataset.speed) || 5000;

    this.swiper = new Swiper(this.sliderEl, {
      loop: true,
      speed: 500,
      autoplay: autoRotate
        ? {
          delay: speed,
          disableOnInteraction: false,
        }
        : false,
      navigation: {
        nextEl: this.querySelector('.custom-announcement-bar__button--next'),
        prevEl: this.querySelector('.custom-announcement-bar__button--prev'),
      },
      a11y: {
        enabled: true,
      },
    });
  }

  disconnectedCallback() {
    if (this.swiper) {
      this.swiper.destroy(true, true);
      this.swiper = null;
    }
  }
}

if (!customElements.get('custom-announcement-bar')) {
  customElements.define('custom-announcement-bar', CustomAnnouncementBar);
}
