import PostModel from '../models/Post.js';

export const createPost = async (req, res) => {
  try {
    const doc = new PostModel({
      title: req.body.title,
      text: req.body.text,
      imageUrl: req.body.imageUrl,
      tags: req.body.tags,
      createdBy: req.userId,
    });
    const post = await doc.save();
    res.json(post);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getAllPosts = async (req, res) => {
  try {
    const posts = await PostModel.find().populate('createdBy').exec();
    res.status(200).json(posts);
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const getOnePost = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.findOneAndUpdate(
      {
        _id: postId,
      },
      {
        $inc: { viewsCount: 1 },
      },
      {
        returnDocument: 'after',
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({ message: 'Something went wrong' });
        }
        if (!doc) {
          return res.status(404).json({ message: 'Post not fount' });
        }
        res.json(doc);
      }
    );
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: 'Something went wrong' });
  }
};

export const deletePost = async (req, res) => {
  try {
    const postId = req.params.id;
    await PostModel.findOneAndDelete(
      {
        _id: postId,
      },
      (err, doc) => {
        if (err) {
          return res.status(500).json({ message: 'Cant delete post' });
        }
        if (!doc) {
          return res.status(500).json({ message: 'Post not found' });
        }
        res.json({ success: true });
      }
    );
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong, can delete post' });
  }
};

export const updatePost = async (req, res) => {
  try {
    const postId = req.params.id;

    await PostModel.updateOne(
      {
        _id: postId,
      },
      {
        title: req.body.title,
        text: req.body.text,
        imageUrl: req.body.imageUrl,
        createdBy: req.userId,
        tags: req.body.tags,
      }
    );
    res.json({ success: true });
  } catch (error) {
    res.status(500).json({ message: 'Something went wrong, cant update post' });
  }
};
