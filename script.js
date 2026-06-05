document.getElementById('booking-form').addEventListener('submit', function (e) {
  e.preventDefault();
  alert("Thanks! Your appointment request has been received. We'll call you to confirm.");
  this.reset();
});
