class UserCard extends HTMLElement {
  constructor() {
    super();
    this.attachShadow({ mode: 'open' });
  }

  set data(value) {
    this.render(value);
  }

  render(data) {
    if (!data) return;

    this.shadowRoot.innerHTML = `
      <style>
        :host {
          display: block; 
        }

        .card {
          width: 260px;
          min-height: 360px;
          border: 1px solid #e0e0e0;
          border-radius: 15px; 
          padding: 25px;
          margin: 15px;
          background: #ffffff;
          box-shadow: 0 4px 15px rgba(0,0,0,0.1);
          
          /ЦЕНТРУВАННЯ ВСЕРЕДИНІ КАРТКИ /
          display: flex;
          flex-direction: column;
          align-items: center; 
          text-align: center;
          
          transition: transform 0.3s ease;
        }

        .card:hover {
          transform: translateY(-10px);
        }

        img {
          width: 130px;
          height: 130px;
          border-radius: 50%; 
          object-fit: cover;
          margin-bottom: 20px;
          border: 4px solid #f0f0f0;
        }

        h2 {
          margin: 0 0 15px 0;
          font-size: 1.5rem;
          color: #333;
        }

        .info {
          font-size: 1rem;
          color: #666;
          line-height: 1.4;
        }

        .label {
          font-weight: bold;
          color: #2c3e50;
        }

        p {
          margin: 5px 0;
        }
      </style>

      <div class="card">
        <img src="${data.photo}" alt="${data.name}">
        <h2>${data.name}</h2>
        <div class="info">
          <p><span class="label">ДН:</span> ${data.birthday}</p>
          <p><span class="label">Місто:</span> ${data.city}</p>
          <p><span class="label">Країна:</span> ${data.country}</p>
        </div>
      </div>
    `;
  }
}

customElements.define('user-card', UserCard);