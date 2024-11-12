// Enhanced fetch and populate data with Firebase Realtime Database
document.addEventListener('DOMContentLoaded', function() {
  // Ensure error message is hidden initially
  const errorMessage = document.getElementById('error-message');
  errorMessage.style.display = 'none';  // Hide the error message at the start

  // Load the data from Firebase for each category
  fetchDataFromFirebase('catalog/devices', 'devices');
  fetchDataFromFirebase('catalog/ecosystems', 'ecosystems');
  fetchDataFromFirebase('catalog/security', 'security');
  fetchDataFromFirebase('catalog/additions', 'additions');
});

// Fetch data from Firebase and populate sections
function fetchDataFromFirebase(path, sectionId) {
  document.getElementById(`${sectionId}-spinner`).style.display = 'block';

  firebase.database().ref(path).once("value")
    .then(snapshot => {
      if (snapshot.exists()) {
        const data = snapshot.val();
        populateSection(data, sectionId);
        document.getElementById('error-message').style.display = 'none';  // Ensure error message stays hidden
      } else {
        throw new Error('No data available');
      }
    })
    .catch(error => {
      console.error(`Error loading ${sectionId}:`, error.message);
      const errorMessage = document.getElementById('error-message');
      errorMessage.innerHTML = `Error loading ${sectionId}: ${error.message}`;
      errorMessage.style.display = 'block';
    })
    .finally(() => {
      document.getElementById(`${sectionId}-spinner`).style.display = 'none';
    });
}

// Populate the section with dynamic data and models comparison
function populateSection(data, sectionId) {
  const section = document.getElementById(sectionId);

  // Iterate over each sub-category in the data
  Object.entries(data).forEach(([subCategoryName, subCategory]) => {
    const li = document.createElement('li');
    li.className = 'toggle';
    li.textContent = subCategoryName; // Set sub-category name as the title

    const ul = document.createElement('ul');
    ul.className = 'sub-options';

    // Ensure subCategory.models is an array before iterating
    subCategory.models.forEach(model => {
      const modelLi = document.createElement('li');
      modelLi.innerHTML = `
        <strong>${model.modelName}</strong>: ${model.price} <br> 
        Features: ${model.features.join(", ")}<br>
        <strong>Competitive Advantages:</strong> ${model.competitionDiff}`;
      ul.appendChild(modelLi);
    });

    li.appendChild(ul);
    li.addEventListener('click', function() {
      ul.classList.toggle('active');
    });

    section.appendChild(li);
  });
}

// Toggle sections visibility
function toggleSection(sectionId) {
  const section = document.getElementById(sectionId);
  if (section) {
    section.classList.toggle('active');
  }
}
