const express = require("express");
const {
  getStates,
  getStateByName,
  getDistrictByName,
  getMandalByName
} = require("../controllers/locationController");

const router = express.Router();

router.get("/states", getStates);
router.get("/state/:stateName", getStateByName);
router.get("/district/:districtName", getDistrictByName);
router.get("/mandal/:mandalName", getMandalByName);

module.exports = router;
