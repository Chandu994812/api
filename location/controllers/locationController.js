const State = require("../models/State");

const escapeRegex = (value) => value.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");

const buildExactNameRegex = (value) => new RegExp(`^${escapeRegex(value.trim())}$`, "i");

const parsePositiveInteger = (value, fallback) => {
  const parsed = Number.parseInt(value, 10);

  if (Number.isNaN(parsed) || parsed <= 0) {
    return fallback;
  }

  return parsed;
};

const getStates = async (req, res) => {
  try {
    const states = await State.find({}, { __v: 0 }).lean();

    return res.status(200).json({
      success: true,
      count: states.length,
      data: states
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch states.",
      error: error.message
    });
  }
};

const getStateByName = async (req, res) => {
  try {
    const stateName = req.params.stateName;
    const state = await State.findOne(
      { name: buildExactNameRegex(stateName) },
      { __v: 0 }
    ).lean();

    if (!state) {
      return res.status(404).json({
        success: false,
        message: `State '${stateName}' not found.`
      });
    }

    return res.status(200).json({
      success: true,
      data: state
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch state hierarchy.",
      error: error.message
    });
  }
};

const getDistrictByName = async (req, res) => {
  try {
    const districtName = req.params.districtName;
    const districtRegex = buildExactNameRegex(districtName);

    const result = await State.aggregate([
      { $unwind: "$districts" },
      { $match: { "districts.name": districtRegex } },
      {
        $project: {
          _id: 0,
          state: "$name",
          district: "$districts"
        }
      }
    ]);

    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: `District '${districtName}' not found.`
      });
    }

    return res.status(200).json({
      success: true,
      data: result[0]
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch district hierarchy.",
      error: error.message
    });
  }
};

const getMandalByName = async (req, res) => {
  try {
    const mandalName = req.params.mandalName;
    const mandalRegex = buildExactNameRegex(mandalName);
    const page = parsePositiveInteger(req.query.page, 1);
    const limit = Math.min(parsePositiveInteger(req.query.limit, 25), 100);
    const skip = (page - 1) * limit;

    const result = await State.aggregate([
      { $unwind: "$districts" },
      { $unwind: "$districts.mandals" },
      { $match: { "districts.mandals.name": mandalRegex } },
      {
        $project: {
          _id: 0,
          state: "$name",
          district: "$districts.name",
          mandal: "$districts.mandals.name",
          totalVillages: { $size: "$districts.mandals.villages" },
          villages: {
            $slice: ["$districts.mandals.villages", skip, limit]
          }
        }
      }
    ]);

    if (!result.length) {
      return res.status(404).json({
        success: false,
        message: `Mandal '${mandalName}' not found.`
      });
    }

    const mandal = result[0];
    const totalPages = Math.max(Math.ceil(mandal.totalVillages / limit), 1);

    return res.status(200).json({
      success: true,
      data: mandal,
      pagination: {
        page,
        limit,
        totalVillages: mandal.totalVillages,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      }
    });
  } catch (error) {
    return res.status(500).json({
      success: false,
      message: "Failed to fetch mandal villages.",
      error: error.message
    });
  }
};

module.exports = {
  getStates,
  getStateByName,
  getDistrictByName,
  getMandalByName
};
