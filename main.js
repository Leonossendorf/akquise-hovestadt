// Entwurfsnotizen ein-/ausblenden
const toggle = document.querySelector('.notes-toggle');
toggle.addEventListener('click', () => {
  const hidden = document.body.classList.toggle('hide-notes');
  toggle.setAttribute('aria-pressed', String(!hidden));
  toggle.textContent = hidden ? 'Entwurfsnotizen zeigen' : 'Entwurfsnotizen ausblenden';
});

// Formular: im Entwurf wird nichts verschickt
const form = document.querySelector('.form');
const status = form.querySelector('.form-status');
form.addEventListener('submit', (e) => {
  e.preventDefault();
  status.classList.add('show');
  status.textContent = 'Das ist ein Entwurf, deshalb wurde nichts verschickt. In der fertigen Seite landet diese Anfrage mit Datum, Gästezahl und Anlass direkt bei Hovestadt. Für echte Anfragen: 02561 96 10 33.';
});

// Kein Datum in der Vergangenheit
const today = new Date().toISOString().slice(0, 10);
form.querySelectorAll('input[type=date]').forEach((el) => (el.min = today));
