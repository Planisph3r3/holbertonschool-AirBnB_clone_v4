// 1

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
