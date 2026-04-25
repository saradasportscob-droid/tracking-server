const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const API_TOKEN = process.env.277495f71bb285c4e10be9d96c4131151a156098;

app.get("/track", async (req, res) => {
  const awb = req.query.awb;

  try {
    const response = await axios.get(
      `https://track.delhivery.com/api/v1/packages/json/?waybill=${awb}`,
      {
        headers: {
          Authorization: `Token ${API_TOKEN}`,
        },
      }
    );

    const shipment = response.data.ShipmentData[0].Shipment;

    res.json({
      status: shipment.Status.Status,
      scans: shipment.Scans
    });

  } catch (err) {
    res.status(500).json({ error: "Tracking failed" });
  }
});

app.listen(10000);
