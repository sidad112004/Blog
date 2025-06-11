import Asynchandler from "../utils/Asynchandler.js"
import ApiError from "../utils/ApiError.js"
import ApiRespoance from "../utils/ApiResponse.js";
import Post from "../models/post.model.js";
import User from "../models/user.model.js";

const createPost = Asynchandler(async (req, res) => {
    const { title, content, image ,tag} = req.body;
      const user = await User.findById(req.user._id)
    //  console.log("sii");
    if (!user) {
        throw new ApiError(400, "user is not found")
    }

    if (!title || !content ) {
        throw new ApiError(400, "Please provide all fields");
    }

    const post = await Post.create({
        title,
        content,
        image,
        author: req.user._id,
        tags: tag || [],
    });

    if (!post) {
        throw new ApiError(400, "Post not created");
    }

    res.status(201).json(new ApiRespoance(201, post, "Post created successfully"));
}
);

const deletePost = Asynchandler(async (req, res) => {
  const { postId } = req.body;
  const userId = req.user._id;

  if (!postId) {
    throw new ApiError(400, "Post ID is required");
  }


  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.author.toString() !== userId.toString()) {
    throw new ApiError(403, "You can only delete your own posts");
  }

  await post.deleteOne();

  res
    .status(200)
    .json(new ApiRespoance(200, null, "Post deleted successfully"));
});

const updatePost = Asynchandler(async (req, res) => {
  const { postId, title, content, image, tag } = req.body;
  const userId = req.user._id;

  if (!postId) {
    throw new ApiError(400, "Post ID is required");
  }

  const post = await Post.findById(postId);

  if (!post) {
    throw new ApiError(404, "Post not found");
  }

  if (post.author.toString() !== userId.toString()) {
    throw new ApiError(403, "You can only update your own posts");
  }

  post.title = title || post.title;
  post.content = content || post.content;
  post.image = image || post.image;
  post.tags = tag || post.tags;

  await post.save();

  res.status(200).json(new ApiRespoance(200, post, "Post updated successfully"));
}
);

const myposts = Asynchandler(async (req, res) => {
  const userId = req.user._id;
  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }
  const temp = await Post.find({ author: userId });
  const posts = temp.reverse();
  if (!posts || posts.length === 0) {
    throw new ApiError(404, "No posts found for this user");
  }

  res.status(200).json(new ApiRespoance(200, posts, "Posts retrieved successfully"));
});

const allPosts = Asynchandler(async (req, res) => {
  const temp = await Post.find().populate('author', 'name email username bio');
   const posts=temp.reverse();
  if (!posts || posts.length === 0) {
    throw new ApiError(404, "No posts found");
  }

  res.status(200).json(new ApiRespoance(200, posts, "Posts retrieved successfully"));
}
);

const visitedUserPosts = Asynchandler(async (req, res) => {
  const { userId } = req.params;

  if (!userId) {
    throw new ApiError(400, "User ID is required");
  }

  const posts = await Post.find({ author: userId }).populate('author', 'name email username bio');

  if (!posts || posts.length === 0) {
    throw new ApiError(404, "No posts found for this user");
  }

  res.status(200).json(new ApiRespoance(200, posts, "Posts retrieved successfully"));
});

export {createPost,deletePost, updatePost, myposts, allPosts,visitedUserPosts};