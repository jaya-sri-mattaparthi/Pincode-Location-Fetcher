function getLocation() {
  const pincode = document.getElementById("pincode").value.trim();
  const resultDiv = document.getElementById("result");
  resultDiv.innerHTML = ""; // Clear previous result

  if (pincode === "") {
    resultDiv.innerHTML = "Please enter a valid pincode.";
    return;
  }

  const url = `https://api.postalpincode.in/pincode/${pincode}`;

  fetch(url)
    .then(response => {
      if (!response.ok) throw new Error("Network error");
      return response.json();
    })
    .then(data => {
      const postOffices = data[0].PostOffice;

      if (data[0].Status === "Success" && postOffices && postOffices.length > 0) {
        const post = postOffices[0];
        const displayLocation = `${post.Name}, ${post.District}, ${post.State}, ${post.Country}`;
        const searchLocation = `${post.District}, ${post.State}, ${post.Country}`;
        resultDiv.innerHTML = `<p><strong>Location:</strong> ${displayLocation}</p>`;

        fetch(`https://nominatim.openstreetmap.org/search?format=json&q=${encodeURIComponent(searchLocation)}`)
          .then(res => res.json())
          .then(geoData => {
            if (geoData.length > 0) {
              const lat = parseFloat(geoData[0].lat);
              const lon = parseFloat(geoData[0].lon);

              const mapIframe = `
                <iframe width="100%" height="300" frameborder="0"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=${lon - 0.01},${lat - 0.01},${lon + 0.01},${lat + 0.01}&layer=mapnik&marker=${lat},${lon}">
                </iframe>
                <br/><a href="https://www.openstreetmap.org/?mlat=${lat}&mlon=${lon}#map=14/${lat}/${lon}" target="_blank">View on OpenStreetMap</a>
              `;
              resultDiv.innerHTML += mapIframe;

              // Fetch tourist places nearby using Overpass API
              const overpassQuery = `
                [out:json];
                (
                  node["tourism"](around:2000,${lat},${lon});
                  way["tourism"](around:2000,${lat},${lon});
                  relation["tourism"](around:2000,${lat},${lon});
                );
                out center 10;
              `;

              fetch("https://overpass-api.de/api/interpreter", {
                method: "POST",
                body: overpassQuery,
              })
                .then(res => res.json())
                .then(overpassData => {
                  const elements = overpassData.elements;
                  if (elements.length > 0) {
                    resultDiv.innerHTML += `<h3>Nearby Tourist Attractions:</h3><ul>`;
                    elements.slice(0, 5).forEach(el => {
                      const name = el.tags && el.tags.name ? el.tags.name : "Unnamed place";
                      resultDiv.innerHTML += `<li>📍 ${name}</li>`;
                    });
                    resultDiv.innerHTML += `</ul>`;
                  } else {
                    resultDiv.innerHTML += "<p>No major tourist attractions found nearby.</p>";
                  }
                });
            } else {
              resultDiv.innerHTML += "<p>Map not found for this location.</p>";
            }
          });
      } else {
        resultDiv.innerHTML = "No location found for this pincode.";
      }
    })
    .catch(error => {
      console.error("Error:", error);
      resultDiv.innerHTML = "Something went wrong. Please try again.";
    });
}
