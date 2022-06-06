const express = require('express')
const colors = require('colors')
const dotenv = require('dotenv').config()
const PORT = process.env.PORT || 5000
const { errorHandler } = require('./middleware/errorMiddleware') 
var uniqueValidator = require('mongoose-unique-validator');


const asset = 'BMFBOVESPA:IBOV'

const getData = async () => {
const TradingView = require('../tradingViewAPI/main.js');
const client = new TradingView.Client();

const chart = await new client.Session.Chart();
chart.setMarket(asset, {
  timeframe: '1',
  range: 10, // Can be positive to get before or negative to get after
  to: Date.now(),
});

// This works with indicators

await TradingView.getIndicator('STD;Supertrend').then(async (indic) => {
  console.log(`Loading '${indic.description}' study...`);
  const SUPERTREND = new chart.Study(indic);

  SUPERTREND.onUpdate(() => {
    console.log('Prices periods:', chart.periods);
    console.log(typeof chart.periods);
    console.log('Study periods:', SUPERTREND.periods);
    client.end();
  });
});

var mongoose = require("mongoose");

mongoose.connect(process.env.MONGO_URI, {
  useUnifiedTopology: true,
  useNewUrlParser: true
});

var db = mongoose.connection;

db.on("error", console.error.bind(console, "connection error:"));

db.once("open", function() {
  console.log("Connection Successful!");
});


const { Schema } = mongoose;
mongoose.Promise = global.Promise;

const schema = new Schema({
  time: {
    type: Number,
    trim: true, 
    index: true, 
    unique: true, 
    sparse: true
  },
  open: {
    type: Number
  },
  close: {
    type: Number
  },
  max: {
    type: Number
  },
  min: {
    type: Number
  },
  volume: {
    type: Number
  },
});

schema.plugin(uniqueValidator);

var SData = mongoose.Schema({
  dataId: { type: String, index: true, unique: true, required: true },
  time: {
    type: Number,
    // trim: true, 
    // index: true, 
    // unique: true, 
    // sparse: true
  },
  open: {
    type: Number
  },
  close: {
    type: Number
  },
  max: {
    type: Number
  },
  min: {
    type: Number
  },
  volume: {
    type: Number
  },
});

createdata: (body) => {
  let sEntry = new SData(Object.assign({}, {
      dataId: body.DataId
  }));
  return sEntry.save(function() {
      console.log(error)
  });
}

if (mongoose.models.model) {
  delete mongoose.models.model
}

var Model = mongoose.model("model", SData, "myCollection1");
var doc1 = new Model({...chart.periods})

doc1.save(function(err, doc) {
  if (err) return console.error(err);
  console.log("Document inserted succussfully!");
});
};

// getData();
setInterval(() => {
  // runs every 2 seconds
  getData()
}, 1000);
