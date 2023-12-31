import { db } from "../db.js";
import jwt from "jsonwebtoken";

export const getPosts = (req, res) => {
  const q = req.query.cat
    ? "SELECT * FROM posts WHERE cat=?"
    : "SELECT * FROM posts";

  db.query(q, [req.query.cat], (err, data) => {
    if (err) return res.status(500).send(err);

    return res.status(200).json(data);
  });
};

export const getPostsByPage = (req, res) => {
  const q = "SELECT * FROM posts LIMIT ? OFFSET ?";

  db.query(q, [+req.query.limit, +req.query.offset], (err, data) => {
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  })
}

export const getPostsByQuery = (req, res) => {
  const q = "SELECT * FROM `posts` WHERE MATCH(posts.title, posts.desc) AGAINST (?) LIMIT 0,100"
  db.query(q, [req.query.text], (err, data) => {
    console.log(req)
    if (err) return res.status(500).send(err);
    return res.status(200).json(data);
  })
}

export const getPost = (req, res) => {
  const q =
    "SELECT p.id, `username`, `title`, `desc`, `extended`, p.img, u.img AS userImg, `cat`,`date` FROM users u JOIN posts p ON u.id = p.uid WHERE p.id = ? ";

  db.query(q, [req.params.id], (err, data) => {
    if (err) return res.status(500).json(err);

    return res.status(200).json(data[0]);
  });
};

export const addPost = (req, res) => {
    const q =
      "INSERT INTO posts(`title`, `desc`, `img`, `extended`, `cat`, `date`,`uid`) VALUES (?)";

    const values = [
      req.body.title,
      req.body.desc,
      req.body.img,
      req.body.extended,
      req.body.cat,
      req.body.date,
      req.body.uid,
    ];

    db.query(q, [values], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been created.");
    });
};

export const deletePost = (req, res) => {
    const postId = req.params.id;
    const q = "DELETE FROM posts WHERE `id` = ? ";

    db.query(q, [postId], (err, data) => {
      if (err) return res.status(403).json("You can delete only your post!");

      return res.json("Post has been deleted!");
  });
};

export const updatePost = (req, res) => {

    const postId = req.params.id;
    const q =
      "UPDATE posts SET `title`=?,`desc`=?, `extended`=?, `img`=?,`cat`=? WHERE `id` = ?";

    const values = [
      req.body.title, 
      req.body.desc, 
      req.body.extended,
      req.body.img, 
      req.body.cat
    ];

    db.query(q, [...values, postId], (err, data) => {
      if (err) return res.status(500).json(err);
      return res.json("Post has been updated.");
  });
};
