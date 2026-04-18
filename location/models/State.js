const mongoose = require("mongoose");

const MandalSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    villages: {
      type: [String],
      default: []
    }
  },
  {
    _id: false
  }
);

const DistrictSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      trim: true
    },
    mandals: {
      type: [MandalSchema],
      default: []
    }
  },
  {
    _id: false
  }
);

const StateSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
      unique: true,
      trim: true
    },
    districts: {
      type: [DistrictSchema],
      default: []
    }
  },
  {
    timestamps: true
  }
);

StateSchema.index({ name: 1 });
StateSchema.index({ "districts.name": 1 });
StateSchema.index({ "districts.mandals.name": 1 });

module.exports = mongoose.model("State", StateSchema);
