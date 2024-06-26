// A dynamic page with JQuery.

/**
 * Make an AJAX request to find places and render the received information in the UI.
 * @param {Object} body - The body of the request containing the place search parameters (optional).
 */
function renderPlaces(body = {}) {
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
        ${place.number_rooms} Bedroom${place.number_rooms !== 1 ? 's' : ''}
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
}

/**
 * Gets the names and IDs of selected amenities in checkboxes in the DOM.
 * @returns {Object} - An object containing two arrays: aminitiesNames (names of the selected amenities)
 *                     and amenitiesIds (IDs of the selected amenities).
 */
function inputBoxChecked() {
  const amenitiesCollection = $('input[type="checkbox"]');
  const aminitiesNames = [];
  const amenitiesIds = [];
  amenitiesCollection.each(function (_, element) {
    if (element.checked) {
      aminitiesNames.push(element.dataset.name);
      amenitiesIds.push(element.dataset.id);
    }
  });
  const data = {
    aminitiesNames,
    amenitiesIds,
  };
  return data;
}

/**
 * Check the availability of the API service by querying its status using an AJAX request.
 * Updates the class of an HTML element to reflect service availability.
 */
function available() {
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
        console.error('Error en la solictud:', status, error);
      },
    });
  });
}

/**
 * Updates the text of an h4 element with the names of the selected amenities
 * each time a checkbox is changed.
 */
function addAminitiesToH4() {
  $('.amenities input[type="checkbox"]').on('change', function () {
    const data = inputBoxChecked();
    let txt = data.aminitiesNames.join(',');
    txt = txt.length >= 30 ? txt.slice(0, 30) + '...' : txt;
    $('.amenities h4').text(txt);
  });
}

/**
 * Filter places based on selected amenities
 * Click a button and render the results.
 */
function filterPlacesForAminities() {
  $('button').on('click', function () {
    const data = inputBoxChecked();
    const amenitiesIds = data.amenitiesIds;
    const body = {
      places: '',
      amenities: amenitiesIds,
    };
    renderPlaces(body);
  });
}

function main() {
  addAminitiesToH4();
  renderPlaces();
  available();
  filterPlacesForAminities();
}

$(document).ready(function () {
  main();
});
