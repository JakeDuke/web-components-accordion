const template = document.createElement('template');
template.innerHTML = `
  <style>
  .accordion {
		font-family: 'Arial', sans-serif;
		background: #f4f4f4;
		width: 300px;
    display: flex;
    align-items: center;
    justify-content: center;
    text-align: center;
		margin-bottom: 15px;
	}
  </style>
  <div class="accordion">
    <div>
      <h3></h3>
      <div class="info">
        <p><slot name="text" /></p>
      </div>
    </div>
  </div>
`;

class CustomAccordion extends HTMLElement {
  constructor() {
    super();

    this.showInfo = true;
    this.attachShadow({ mode: 'open' });
    this.shadowRoot.appendChild(template.content.cloneNode(true));
    this.shadowRoot.querySelector('h3').innerText = this.getAttribute('header');
    this.info = this.shadowRoot.querySelector('.info');
    this.info.style.display = 'none';
  }

  toggleText(e) {
    this.showInfo = !this.showInfo;
    if(this.showInfo) {
        this.info.style.display = 'none';
    } else {
        this.info.style.display = 'block';
    }
  }

  connectedCallback() {
    this.shadowRoot.querySelector('.accordion')
    .addEventListener('click', (e) => this.toggleText(e));
  }

  disconnectedCallback() {
    this.shadowRoot.querySelector('.accordion').removeEventListener();
  }
}

window.customElements.define('accordion-item', CustomAccordion);