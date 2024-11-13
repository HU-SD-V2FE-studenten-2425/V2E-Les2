export class CustomEventListener extends HTMLElement {
  constructor() {
    super();
    this.customEventCounterValue = -1;
  }

  connectedCallback() {
    const sectionElement = document.createElement('section');
    const h2Element = document.createElement('h2');
    const pElement = document.createElement('p');
    pElement.setAttribute('class', 'custom-event-counter-value');

    h2Element.textContent='Custom Event Listener';

    sectionElement.appendChild(h2Element);
    sectionElement.appendChild(pElement);
    this.appendChild(sectionElement);

    this.render();

    document.addEventListener('customEventCounterUpdate', this.customEventCounterUpdateHandler.bind(this));
  }

  disconnectedCallback() {
    document.removeEventListener('customEventCounterUpdate', this.customEventCounterUpdateHandler.bind(this));
  }

  customEventCounterUpdateHandler(event) {
    this.customEventCounterValue = event.detail.value;
    this.render();
  }

  render() {
    const customEventCounterValueElement = this.querySelector('.custom-event-counter-value');
    customEventCounterValueElement.textContent = `Custom Event Counter Value: ${this.customEventCounterValue}`;
  }
}

customElements.define('custom-event-listener', CustomEventListener);