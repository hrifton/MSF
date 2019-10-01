const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

var userSchema = new mongoose.Schema({
  fullName: {
    type: String,
    required: "FullName can't be empty"
  },
  email: {
    type: String,
    required: "email can't be empty",
    unique: true
  },
  status: {
    type: String
  },
  idHopital: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "hopital",
    required: false
  },
  idDepartement: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "departement",
    required: false
  }
 /* password: {
    type: String,
    required: "password can't be empty",
    minlength: [6, "Password must be atleast 6 character long"]
  },
  saltSecret: {
    type: String
  }*/
});

// Regle structure email Via Regex
userSchema.path("email").validate(val => {
  emailRegex = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,13}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  return emailRegex.test(val);
}, "Invalid e-mail.");

/*fonction exectuer avant le save hashage du password
userSchema.pre("save", function(next) {
  bcrypt.genSalt(10, (err, salt) => {
    bcrypt.hash(this.password, salt, (err, hash) => {
      this.password = hash;
      this.saltSecret = salt;
      next();
    });
  });
});

// Methods
userSchema.methods.verifyPassword = function(password) {
  return bcrypt.compareSync(password, this.password);
};
/**
 * composition de notre token id, fullname, email et status
 
userSchema.methods.generateJwt = function() {
  return jwt.sign(
    {
      _id: this._id,
      fullName: this.fullName,
      email: this.email,
      status: this.status,
      idHopital:this.idHopital,
    },
    process.env.JWT_SECRET,
    {
      expiresIn: process.env.JWT_EXP
    }
  );
};*/

userSchema.pre("save", function(next) {
  // Middlware to verify if action already existe
  var self = this; 
  console.log('avant le check : ',self);
  User.find(
    {
      fullName: self.fullName
    },
    function(err, user) {
      console.log("ERR : ", err, "USER : ",user.length)
      if (!err) {
        console.log("USER exists: ", self);
        next(new Error("USER exists!"));
        
      } else {
        console.log('Existe pas : ',err);
        next();
      }
    }
  );
});


User = mongoose.model("User", userSchema);
mongoose.model("User", userSchema);
