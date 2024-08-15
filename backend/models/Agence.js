const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const Schema = mongoose.Schema;

const agenceSchema = new Schema({
  name: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  numero:{type:Number},
  adress:{type: String},
  cin:{type:String , required:true} , 
  matricule:{type:String, required:true},
  status: { type: String, enum: ['pending', 'confirmed', 'cancelled'], default: 'pending' },
 
});

// Pré-hook pour hacher le mot de passe avant de sauvegarder
agenceSchema.pre('save', async function (next) {
  if (!this.isModified('password')) return next();

  try {
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(this.password, salt);
    this.password = hashedPassword;
    next();
  } catch (err) {
    next(err);
  }
});

// Méthode pour vérifier le mot de passe
agenceSchema.methods.comparePassword = function (candidatePassword) {
  return bcrypt.compare(candidatePassword, this.password);
};

const Agence = mongoose.model('AGENCE', agenceSchema);

module.exports = Agence;
