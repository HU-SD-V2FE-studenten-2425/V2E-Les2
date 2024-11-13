export class CustomEventCounter extends HTMLElement {

  #INITIAL_VALUE = 0;
  #INCREMENT_VALUE = 1;

  constructor() {
    super();
    this.shadowDom = this.attachShadow({mode: 'open'});
    this.counterValue = this.#INITIAL_VALUE;
  }

  connectedCallback() {
    const sectionElement = document.createElement('section');
    const h2Element = document.createElement('h2');
    this.buttonElement = document.createElement('button');
    const spanElement = document.createElement('span');

    h2Element.textContent = 'Simple CustomEvent Counter';

    this.buttonElement.textContent = 'Click me!';
    this.buttonElement.addEventListener('click', this.updateCounter.bind(this));

    sectionElement.appendChild(h2Element);
    sectionElement.appendChild(this.buttonElement);
    sectionElement.appendChild(spanElement);

    this.shadowDom.appendChild(sectionElement);

    this.render();
  }

  disconnectedCallback() {
    this.buttonElement.removeEventListener('click', this.updateCounter.bind(this));
  }

  updateCounter() {
    this.counterValue += this.#INCREMENT_VALUE;

    const eventOptions = {
      bubbles: true,
      cancelable: true,
      composed: false,
      detail: {
        value: this.counterValue
      }
    };
    const counterUpdateEvent = new CustomEvent('customEventCounterUpdate', eventOptions);
    this.buttonElement.dispatchEvent(counterUpdateEvent);

    this.render();
  }

  render() {
    const counterField = this.shadowDom.querySelector('span');
    counterField.textContent = this.counterValue;
  }

}

customElements.define('custom-event-counter', CustomEventCounter);