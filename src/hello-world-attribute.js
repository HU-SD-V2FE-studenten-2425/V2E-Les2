export class HelloWorldAttribute extends HTMLElement {

  constructor() {
    super();
    this.name = "World";
  }

  static get observedAttributes() {
    return ['name'];
  }

  attributeChangedCallback(property, oldValue, newValue) {
    if (oldValue === newValue) return;
    this[property] = newValue; 
    console.log(this.name);
  }

  connectedCallback() {
    this.textContent = `Hello ${this.name}`;
  }
}

customElements.define('hello-world-attribute', HelloWorldAttribute);