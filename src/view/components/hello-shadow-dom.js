export class HelloShadowDom extends HTMLElement {

  constructor() {
    super();
    this.shadowDom = this.attachShadow({ mode: 'open'});
    this.name = 'ShadowWorld';
  }

  connectedCallback() {
    const sectionElement = document.createElement('section');
    const h2Element = document.createElement('h2');
    const css = `
      <style>
        h2 {
          color: purple;
        }
      </style>
    `;

    sectionElement.appendChild(h2Element);
    this.shadowDom.innerHTML = css;
    this.shadowDom.appendChild(sectionElement);
    

    this.render();
  }

  render() {
    console.log(this);
    console.log(this.shadowDom.querySelector('h2'));
    this.shadowDom.querySelector('h2').textContent = `Hello ${this.name}`;
  }

}

customElements.define('hello-shadow-dom', HelloShadowDom);