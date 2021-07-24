const jwt = require('jsonwebtoken');
const Users = require('../database/user.schema');

const refreshTokens = [];

module.exports.login = async (req, res, next) => {
    const { username, password } = req.body;
    const users = await Users.find({});
    const user = users.find(user => user.username === username && user.password === password);

    if (user) {
        const accessToken = jwt.sign({
            username: user.username,
            role: user.role,
    }, process.env.ACCESS_TOKEN_SECRET, {
        expiresIn: process.env.TOKEN_EXPIRY,
    });

    const refreshToken = jwt.sign({
        username: user.username,
        role: user.role,
    }, process.env.REFRESH_TOKEN_SECRET);
    refreshTokens.push(refreshToken);

    res.json({ accessToken, refreshToken });
  } else {
    res.send('Username or password is not correct.');
  }
};

module.exports.refresh = (req, res, next) => {
    const { token } = req.body;

    if (!token) {
        return res.sendStatus(401);
    };

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    };

    jwt.verify(token, process.env.REFRESH_TOKEN_SECRET, (error, user) => {
        if (error) {
            return res.sendStatus(403);
        };

        const accessToken = jwt.sign({
            username: user.username,
            role: user.role,
    }, process.env.ACCESS_TOKEN_SECRET, {
            expiresIn: process.env.TOKEN_EXPIRY,
    });

    res.json({accessToken});
  });
};

module.exports.logout = (req, res, next) => {
    const { token } = req.body;

    if (!refreshTokens.includes(token)) {
        return res.sendStatus(403);
    };

    const tokenIndex = refreshTokens.indexOf(token);
    refreshTokens.splice(tokenIndex, 1);

    res.sendStatus(200);
};
