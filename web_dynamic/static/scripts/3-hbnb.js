// Update the content within h4 in Amenities

$(document).ready(function () {
  /**
   * Gets a list of amenities selected in checkboxes and returns them as a string.
   * @returns {string} A string containing the names of the selected amenities, separated by commas.
   */
  function inputBoxChecked() {
    const amenitiesCollection = $('input[type="checkbox"]');
    const amenitiesChecked = [];
    amenitiesCollection.each(function (_, element) {
      if (element.checked) {
        amenitiesChecked.push(element.dataset.name);
      }
    });
    return amenitiesChecked.join(',');
  }
  // Event is thrown every time the checkbox changes
  $('.amenities input[type="checkbox"]').on('change', function () {
    $('.amenities h4').text(inputBoxChecked());
  });
});

$(document).ready(function () {
  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/status',
    method: 'GET',
    dataType: 'json',
    success: function (data) {
      if (data.status === 'OK') {
        $('#api_status').addClass('available');
      }
    },
    error: function (_, status, error) {
      console.error('Request error:', status, error);
    },
  });
});

$(document).ready(function () {
  const body = {};
  $.ajax({
    url: 'http://127.0.0.1:5001/api/v1/places_search/',
    method: 'POST',
    contentType: 'application/json',
    data: JSON.stringify(body),
    dataType: 'json',
    success: function (response) {
      let placesHTML = '';
      response.forEach((place) => {
        placesHTML += `
        <article>
          <div class="title_box">
            <h2>${place.name}</h2>
            <div class="price_by_night">$${place.price_by_night}</div>
          </div>
          <div class="information">
            <div class="max_guest">
              ${place.max_guest} Guest${place.max_guest !== 1 ? 's' : ''}
            </div>
            <div class="number_rooms">
              ${place.number_rooms} Bedroom${
          place.number_rooms !== 1 ? 's' : ''
        }
            </div>
            <div class="number_bathrooms">
              ${place.number_bathrooms} Bathroom${
          place.number_bathrooms !== 1 ? 's' : ''
        }
            </div>
          </div>
          <div class="description">${place.description}</div>
        </article>
        `;
      });
      $('section.places').html(placesHTML);
    },
    error: function (_, status, error) {
      console.error('There was an error sending data', status, error);
    },
  });
});
