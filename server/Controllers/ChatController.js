import ChatModel from "../Models/chatModel.js"
export const createChat = async (req, res) => {
    const { senderId, receiverId } = req.body;

    try {
        // Check if a chat with both senderId and receiverId already exists
        const existingChat = await ChatModel.findOne({
            members: { $all: [senderId, receiverId] }
        });

        if (existingChat) {
            return res.status(200).send({success:true,existingChat}); // Return existing chat
        }

        // Create a new chat if it doesn't exist
        const newChat = new ChatModel({
            members: [senderId, receiverId]
        });

        const result = await newChat.save();
        return res.status(200).send({suceess:true,result});
    } catch (error) {
        console.error('Error in createChat:', error);
        return res.status(500).send('Error in createChat');
    }
};

export const userChat =async(req,res)=>{
try {
    const chat = await ChatModel.find({
        members:{$in:[req.params.userId]}
    })
    return res.status(200).send(chat)
} catch (error) {
    return res.status(500).send('error in userChat')
}
}

export const findChat =async(req,res)=>{
try {
    const chat = await ChatModel.findOne({members:{$in:[req.params.firstId,req.params.secondId]}})
return res.status(200).send(chat)
} catch (error) {
    return res.status(500).send('error in findChat')
}
}