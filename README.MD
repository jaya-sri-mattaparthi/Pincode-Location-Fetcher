# Pincode Location Fetcher (India)

A simple web app to fetch location details (Post Office, District, State, Country) and display a map for any Indian PIN code using free APIs.

## 🔧 Features
- Fetches location details using pincode (India Post API)
- Displays full location details (Post Office, District, State, Country)
- Shows an interactive map for the location (OpenStreetMap)
- Finds and lists nearby tourist attractions (Overpass API)
- Validates user input and handles errors

## 📦 Tech Used
- HTML
- JavaScript (Fetch API)
- [India Post API](https://api.postalpincode.in)
- [OpenStreetMap & Nominatim](https://nominatim.openstreetmap.org/)
- [Overpass API](https://overpass-api.de/)

## 📡 APIs Used
- **India Post API:**  
  `https://api.postalpincode.in/pincode/<your_pincode>`
- **Nominatim (OpenStreetMap) Geocoding:**  
  Used to convert location to latitude/longitude
- **Overpass API:**  
  Used to find nearby tourist attractions

## 🏁 How to Run
1. Open `index.html` in your browser
2. Enter a 6-digit Indian pincode
3. Click "Get Location" to see the result, map, and nearby attractions

## ✅ Example
- **Input:** `600001`
- **Output:**  
  - Location: Chennai GPO, Chennai, Tamil Nadu, India  
  - Map centered on the location  
  - List of nearby tourist attractions (if available)

---

**Note:**  
All APIs used are free for personal/small projects. For heavy usage, check their usage policies.