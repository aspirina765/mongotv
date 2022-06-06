const express = require('express')
const router = express.Router()
const { registerUser, loginUser, getMe } = require('../controllers/userController')

const { protect } = require('../middleware/authMiddleware')


var object = [
    {
      name: "John",
      age: 21
    },
    {
      name: "Sam",
      age: 25
    },
    {
      name: "Lisa",
      age: 33
    }
];

router.route("/add").post(function(req, res) {
    var object = {
      name: "John",
      age: 21
    };
  
    detail.insertMany(object, function(err, result) {
      if (err) {
        console.log(err);
      } else {
        console.log(result);
      }
    });
  });

router.post('/tv', registerUser)
router.post('/tv', loginUser)
router.get('/me', protect, getMe)

module.exports = router