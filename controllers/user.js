import { db } from "../db.js";

export const getUser = (req, res) => {
    const q = "SELECT * FROM users WHERE id =?";
    db.query(q, [req.params.id], (err, data) => {
        if (err) return res.status(500).send(err);
        const { password, ...user} = data[0];
        return res.status(200).json(user);
    });
}
