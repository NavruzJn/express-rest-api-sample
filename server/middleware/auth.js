const jwt = require('jsonwebtoken');

const privateKey = fs.readFileSync('config/private.key', 'utf8');
const publicKey = fs.readFileSync('config/public.key', 'utf8');

class JwtMiddleware {

    constructor() {
        this.options = {
            payload: {},
            options: {
                issuer: 'TEST',
                audience: 'https://www.testing.com',
                expiresIn: '12h',
                algorithm: 'RS256'
            }
        }
    }

    login (req, res) {
        let username = req.body.username;
        let password = req.body.password;
        // For the given username fetch user from DB
        let mockedUsername = 'admin';
        let mockedPassword = 'password';

        if (username && password) {
            if (username === mockedUsername && password === mockedPassword) {
                let token = jwt.sign({id: username},
                    config.secret,
                    { expiresIn: '24h' // expires in 24 hours
                    }
                );
                // return the JWT token for the future API calls
                res.json({
                    success: true,
                    message: 'Authentication successful!',
                    token: token
                });
            } else {
                res.send(403).json({
                    success: false,
                    message: 'Incorrect username or password'
                });
            }
        } else {
            res.send(400).json({
                success: false,
                message: 'Authentication failed! Please check the request'
            });
        }
    }

    verify(token) {
        try {
            return jwt.verify(token, config.secret);
        } catch(error) {
            return false;
        }
    }

    decode(token) {
        return jwt.decode(token, { complete: true });
    }
}