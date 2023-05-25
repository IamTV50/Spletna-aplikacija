import React from 'react';


function LandingPage() {
  return (
    <div className="container">
      <div className="row justify-content-center">
        <div className="col-md-8">
          <div className="landing-page">
            <h1>Spletna stran za upravljanje pametnih paketnikov</h1>
            <p>
              <strong>Opis:</strong> To je spletna stran, ki uporablja podatkovno bazo za upravljanje uporabnikov in njihovih pametnih paketnikov. Uporabniki se lahko registrirajo, prijavijo in dodajo paketnike, ki jih nato lahko upravljajo.
            </p>
            <h2>Funkcionalnosti:</h2>
            <ul>
              <li>Registracija in prijava uporabnikov</li>
              <li>Dodajanje, urejanje in brisanje pametnih paketnikov</li>
              <li>Ogled seznama vseh paketnikov na uporabnikovem računu</li>
            </ul>
            <h2>Tehnologije:</h2>
            <ul>
              <li>HTML, CSS in JavaScript za prikazovanje in interakcijo s spletno stranjo</li>
              <li>Node.js in Express.js za spletni strežnik</li>
              <li>MongoDB kot podatkovno bazo</li>
              <li>Mongoose.js kot knjižnico za povezavo s podatkovno bazo</li>
              <li>React za izgled spletne strani</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
