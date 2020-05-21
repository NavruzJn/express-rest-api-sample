import jwt from 'jsonwebtoken';

export default class JwtMiddleware {
    // constructor() {
    //     this.options = {
    //         payload: {},
    //         options: {
    //             issuer: 'TEST',
    //             audience: 'https://www.testing.com',
    //             expiresIn: '12h',
    //             algorithm: 'RS256'
    //         }
    //     }
    // }

    static getToken(id, username ){
        return jwt.sign({id, username},
            config.secret,
            { expiresIn: '24h' // expires in 24 hours
            }
        );
    }

    static verify(token) {
        try {
            return jwt.verify(token, config.secret);
        } catch(error) {
            return false;
        }
    }

    static decode(token) {
        return jwt.decode(token, { complete: true });
    }
}