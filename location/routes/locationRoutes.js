const express = require("express");
const {
  getStates,
  getStateByName,
  getDistrictsByState,
  getDistrictByName,
  getMandalsByDistrict,
  getMandalByName
} = require("../controllers/locationController");

const router = express.Router();

router.get("/states", getStates);
router.get("/state/:stateName", getStateByName);
router.get("/state/:stateName/districts", getDistrictsByState);
router.get("/district/:districtName", getDistrictByName);
router.get("/district/:districtName/mandals", getMandalsByDistrict);
router.get("/mandal/:mandalName", getMandalByName);
router.get("/mandal/:mandalName/villages", getMandalByName);

module.exports = router;
