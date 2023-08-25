import PostModel from "../Models/postModel.js";
import UserModel from "../Models/userModel.js";
import mongoose from "mongoose";


//new post
export const createPost=async(req,res)=>{
    try {
        const newPost = new PostModel(req.body);

        await newPost.save();
        return res.status(200).send({
            success:true,
            message:"Post Created",
            newPost
        })
        
    } catch (error) {
        return res.status(500).send("error in create post")
    }
}

//get a post 

export const getPost = async(req,res)=>{
    try {
        const pid =req.params.id;
        
        const post = await PostModel.findById(pid);

        if(!post){
            return res.status(404).send('Not Found')
        }
        return res.status(200).send({
            success:true,
            post
        })
        
    } catch (error) {
        return res.status(500).send("error in getPost")
    }
}

//update a post
export const updatePost = async (req, res) => {
    try {
        const pid = req.params.id;
        const { userId } = req.body;

        const post = await PostModel.findById(pid);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        if (post.userId === userId) {
            
            const updatedPost = await PostModel.findByIdAndUpdate(pid, { $set: req.body }, { new: true });

            return res.status(200).send({
                success: true,
                message: 'Post Updated',
                post: updatedPost, 
            });
        } else {
            return res.status(403).send('Action Forbidden');
        }
    } catch (error) {
        return res.status(500).send('Error in updatePost');
    }
};

//update a post
export const deletePost = async (req, res) => {
    try {
        const pid = req.params.id;
        const { userId } = req.body;

        const post = await PostModel.findById(pid);
        if (!post) {
            return res.status(404).send('Post not found');
        }

        if (post.userId === userId) {
            await PostModel.findByIdAndDelete(pid);

            return res.status(200).send({
                success: true,
                message: 'Post Deleted',
            });

        } else {
            return res.status(403).send('Action Forbidden');
        }
    } catch (error) {
        return res.status(500).send('Error in updatePost');
    }
};

//like/dislike post 

export const likePost = async(req,res)=>{
    try {
        const pid = req.params.id;
        const {userId} = req.body;

      const post = await PostModel.findById(pid);
     
     
   if(!post.likes.includes(userId))
   {
    await post.updateOne({$push :{likes: userId}})
    return res.status(200).send("Post liked")
   }
   else{
    await post.updateOne({$pull:{likes:userId}})
    return res.status(200).send("Post Unliked")
   }
      

    } catch (error) {
        return res.status(500).send("Error in like post")
    }
}

//get timeline post-timeline post includes users own post and its follwing user post whom he followed

export const getTimelinePost = async(req,res)=>{
    const userId = req.params.uid
  try {
    const currentUserPosts = await PostModel.find({ userId: userId });

    const followingPosts = await UserModel.aggregate([
      { 
        $match: {
          _id: new mongoose.Types.ObjectId(userId),
        },
      },
      {
        $lookup: {
          from: "posts",
          localField: "following",
          foreignField: "userId",
          as: "followingPosts",
        },
      },
      {
        $project: {
          followingPosts: 1,
          _id: 0,
        },
      },
    ]);

    res.status(200).json(
      currentUserPosts
        .concat(...followingPosts[0].followingPosts)
        .sort((a, b) => {
          return new Date(b.createdAt) - new Date(a.createdAt);
        })
    );
  } catch (error) {
    res.status(500).json(error);
  }
}