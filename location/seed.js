require("dotenv").config();

const mongoose = require("mongoose");

const connectDB = require("./config/db");
const State = require("./models/State");

const sampleStateData = {
  name: "Andhra Pradesh",
  districts: [
    {
      name: "Visakhapatnam",
      mandals: [
        {
          name: "Bheemunipatnam",
          villages: [
            "Bheemunipatnam",
            "Annavaram",
            "Dakamarri",
            "Majjivalasa"
          ]
        },
        {
          name: "Anandapuram",
          villages: [
            "Anandapuram",
            "Gambheeram",
            "Kapuluppada",
            "Bakurupalem"
          ]
        }
      ]
    },
    {
      name: "Krishna",
      mandals: [
        {
          name: "Vijayawada Rural",
          villages: [
            "Nidamanuru",
            "Enikepadu",
            "Gannavaram Colony",
            "Pathapadu"
          ]
        },
        {
          name: "Penamaluru",
          villages: [
            "Poranki",
            "Kanuru",
            "Yanamalakuduru",
            "Penamaluru"
          ]
        }
      ]
    },
    {
      name: "Guntur",
      mandals: [
        {
          name: "Mangalagiri",
          villages: [
            "Mangalagiri",
            "Chinakakani",
            "Nuthakki",
            "Nowluru"
          ]
        },
        {
          name: "Tenali",
          villages: [
            "Tenali",
            "Angalakuduru",
            "Burripalem",
            "Pedaravuru"
          ]
        }
      ]
    },
    {
      name: "Anantapur",
      mandals: [
        {
          name: "Tadipatri",
          villages: [
            "Tadipatri",
            "Alur",
            "Chinnapolamada",
            "Kaverisamudram"
          ]
        },
        {
          name: "Uravakonda",
          villages: [
            "Uravakonda",
            "Amidala",
            "Budagavi",
            "Veligonda"
          ]
        }
      ]
    },
    {
      name: "Chittoor",
      mandals: [
        {
          name: "Tirupati Rural",
          villages: [
            "Perur",
            "Mundlapudi",
            "Padipeta",
            "Thummalagunta"
          ]
        },
        {
          name: "Srikalahasti",
          villages: [
            "Srikalahasti",
            "Akkurthi",
            "Panagal",
            "Mangalampeta"
          ]
        }
      ]
    }
  ]
};

const seedData = async () => {
  let hasError = false;

  try {
    await connectDB();

    await State.deleteMany({ name: sampleStateData.name });
    await State.create(sampleStateData);

    console.log("Sample Andhra Pradesh location data seeded successfully.");
  } catch (error) {
    hasError = true;
    console.error(`Seeding failed: ${error.message}`);
  } finally {
    await mongoose.connection.close();
    process.exit(hasError ? 1 : 0);
  }
};

seedData();
