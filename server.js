const express = require("express");
const axios = require("axios");
const cors = require("cors");

const app = express();
app.use(cors());

const API_TOKEN = "216736ccf1fd0ca5d9ebf8c619b70a3a19f59cd3";

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
