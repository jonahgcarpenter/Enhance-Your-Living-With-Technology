// Load external data for smart devices from Firebase
function loadDeviceData(device) {
  firebase.database().ref(`catalog/devices/${device}`).once("value")
    .then(snapshot => {
      if (!snapshot.exists()) {
        throw new Error('Device data not found');
      }

      const data = snapshot.val();
      // Update the DOM with fetched data
      const deviceDescription = data.description || 'Description not available';
      const deviceDetails = data.details || 'Details not available';

      document.getElementById(`${device}Description`).innerText = deviceDescription;
      document.getElementById(`${device}Details`).innerText = deviceDetails;
    })
    .catch(error => {
      document.getElementById("error-message").innerText = error.message;
      document.getElementById("error-message").style.display = 'block';
    });
}

// Call loadDeviceData when a section is clicked
function toggleSubCategory(sectionId, detailId) {
const section = document.getElementById(sectionId);
const details = document.getElementById(detailId);
const button = document.querySelector(`[onclick="toggleSubCategory('${sectionId}', '${detailId}')"]`);

if (section.classList.contains('active')) {
    section.classList.remove('active');
    details.classList.remove('active');
    button.setAttribute('aria-expanded', 'false');
} else {
    section.classList.add('active');
    details.classList.add('active');
    button.setAttribute('aria-expanded', 'true');
    loadDeviceData(sectionId);
}
}
