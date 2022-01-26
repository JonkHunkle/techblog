const router = require('express').Router();
const { User } = require('../../models');


router.get('/', async (req, res) => {
    try {
        const userData = await User.findAll(
        );

        res.status(200).json(userData);
    } catch (err) {
        console.log(err)
        res.status(500).json(err);
    }
});



router.post('/', async (req, res) => {
    try {

        const newUserData = await User.create(req.body.signup);


        req.session.save(() => {
            req.session.user_id = newUserData.dataValues.id;
            req.session.logged_in = true;
            res.status(200).json(newUserData);
        });
    } catch (err) {
        console.log(err);
        res.status(500).json(err);
    }
});

router.post('/login', async (req, res) => {
    try {

        //Find the user who matches the posted e-mail address
        const userData = await User.findOne({ where: { email: req.body.login.email } });

        if (!userData) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }

        // Verify the posted password with the password store in the database
        const validPassword = await userData.checkPassword(req.body.login.password);

        if (!validPassword) {
            res
                .status(400)
                .json({ message: 'Incorrect email or password, please try again' });
            return;
        }


        // Create session variables based on the logged in user
        req.session.save(() => {
            req.session.user_id = userData.dataValues.id;
            req.session.logged_in = true;

            res.json({ message: 'You are now logged in!' });
        });
    } catch (err) {
        res.status(400).json(err);
    }
});

router.get('/logout', (req, res) => {

    if (req.session.logged_in) {
        req.session.destroy(() => {
            res.status(204).end();
        });
    } else {
        res.status(404).end();
    }
});

module.exports = router