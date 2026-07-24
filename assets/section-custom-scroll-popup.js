if (!customElements.get('scroll-popup')) {
  customElements.define(
    'scroll-popup',
    class ScrollPopup extends HTMLElement {
      static STORAGE_KEY = 'dawn-scroll-popup-dismissed';

      connectedCallback() {
        if (localStorage.getItem(ScrollPopup.STORAGE_KEY) === 'true') return;

        this.closeBtn = this.querySelector('.scroll-popup__close');
        this.closeBtn.addEventListener('click', this.close.bind(this));
        this.onScroll = this.handleScroll.bind(this);
        window.addEventListener('scroll', this.onScroll, { passive: true });
      }

      disconnectedCallback() {
        window.removeEventListener('scroll', this.onScroll);
      }

      handleScroll() {
        const scrolled = window.scrollY || window.pageYOffset;
        const docHeight = document.documentElement.scrollHeight - window.innerHeight;
        if (docHeight > 0 && scrolled / docHeight >= 0.5) {
          this.show();
        }
      }

      show() {
        window.removeEventListener('scroll', this.onScroll);
        this.removeAttribute('hidden');
        requestAnimationFrame(() => {
          requestAnimationFrame(() => {
            this.classList.add('is-visible');
          });
        });
      }

      close() {
        localStorage.setItem(ScrollPopup.STORAGE_KEY, 'true');
        this.classList.remove('is-visible');
        this.addEventListener(
          'transitionend',
          () => this.setAttribute('hidden', ''),
          { once: true }
        );
      }
    }
  );
}
