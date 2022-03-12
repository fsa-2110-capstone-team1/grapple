const router = require('express').Router();
const {
  models: { User },
} = require('../../db');
module.exports = router;

// GET /api/users
router.get('/', async (req, res, next) => {
  try {
    const users = await User.findAll({
      // do not include password (even though it's hashed, for extra protection since it's not needed by the FE)
      attributes: [
        'id',
        'username',
        'email',
        'firstName',
        'lastName',
        'image',
        'isPrivate',
        'isAdmin',
        'createdAt',
      ],
      order: [['id']],
    });
    res.json(users);
  } catch (err) {
    next(err);
  }
});

// PUT /api/users/:id
router.put('/:id', async (req, res, next) => {
  try {
    const user = await User.findByPk(req.params.id);
    //updating the entire user to be able to use this route to update any property
    const updatedUser = await user.update(req.body);
    res.json(updatedUser);
  } catch (err) {
    next(err);
  }
});
