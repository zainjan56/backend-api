const express = require("express");
const axios = require("axios");
var cors = require("cors");

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
const corsOptions = {
  origin: 'https://mass-genetic-flying-spectacular.trycloudflare.com'
}

app.use(cors(corsOptions));

// Define a route to handle CORS requests
app.post("/api/proxy", async (req, res) => {
  const { apiUrl, accessToken, requestData } = req.body;

  try {
    const response = await axios.post(apiUrl, requestData, {
      headers: {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": accessToken,
      },
    });
    res.json(response.data);
  } catch (error) {
    console.error("Error:", error);
    res.status(500).json({ error: "An error occurred" });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});
