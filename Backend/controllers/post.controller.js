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


export {createPost,deletePost};