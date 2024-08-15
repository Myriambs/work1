const express = require('express');
const router = express.Router();
const Agence = require('../models/Agence');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET; // Changez cette clé en production et mettez-la dans un fichier d'environnement
const {isAuth} = require('../middleware/agenceToken');

router.get('/protected', isAuth, async (req, res) => {
  console.log(req.user);
  res.send(req.user); // Uncommented to send the user info
});
// Route pour l'inscription
router.post('/signup', async (req, res) => {
  const { name, email, password, numero , adress, cin , matricule } = req.body;

  try {
    const user = new Agence({ name, email, password,numero , adress, cin , matricule });
    await user.save();
    res.status(201).json({ message: 'User registered successfully' });
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
});

// Route pour la connexion
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await Agence.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    // Include status in the response
    const token = jwt.sign(
      { id: user._id, role: user.role, status: user.status }, 
      JWT_SECRET, 
      { expiresIn: '1h' }
    );

    res.json({ token, status: user.status }); // Include status in the response
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});
// @route   PUT /api/agences/:id/status
// @desc    Update the status of an agence
// @access  Public or Private depending on your needs
router.put('/:id/status', async (req, res) => {
    const { status } = req.body;
    const { id } = req.params;

    try {
        // Validate the status
        const validStatuses = ['pending', 'confirmed', 'cancelled'];
        if (!validStatuses.includes(status)) {
            return res.status(400).json({ msg: 'Invalid status' });
        }

        // Find the agence by ID and update the status
        let agence = await Agence.findById(id);
        if (!agence) {
            return res.status(404).json({ msg: 'Agence not found' });
        }

        agence.status = status;
        await agence.save();

        res.json({ msg: 'Status updated successfully', agence });
    } catch (err) {
        console.error(err.message);
        res.status(500).json({ msg: 'Server error' });
    }
});

module.exports = router;
