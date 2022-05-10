import jwt from 'jsonwebtoken';

export default function verify(req, res, next) {
    const token = req.header('auth-token');
    if (!token) {
        return res.status(401).send('Access Denied');
    }

    try {
        const verified = jwt.verify(token, "gbf0wvx7AOqkU0p9p30mqHYC");
        req.user = verified;
        next();
    } catch { err =>
        res.status(400).send(err);
    }
}