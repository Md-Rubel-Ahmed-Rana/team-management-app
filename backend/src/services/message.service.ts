import { IMessage } from "../interfaces/message.interface";
import { Message } from "../models/message.model";

class Service {
  async createMessage(data: IMessage) {
    const result = await Message.create(data);
    return result;
  }

  async getMessagesByType(messageType: string, conversationId: string) {
    const result = await Message.find({
      type: messageType,
      conversationId,
    }).populate({
      path: "poster",
      model: "User",
      select: ["name", "profile_picture"],
    });

    return result;
  }

  async getAllMessages() {
    const result = await Message.find()
      .populate({
        path: "poster",
        model: "User",
      })
      .exec();

    return result;
  }

  async getMessageById(messageId: string) {
    const result = await Message.findById(messageId)
      .populate({
        path: "poster",
        model: "User",
      })
      .exec();

    return result;
  }

  async updateMessage(messageId: string, text: string) {
    const result = await Message.findByIdAndUpdate(
      messageId,
      { $set: { text } },
      { new: true }
    );

    return result;
  }

  async deleteMessage(messageId: string) {
    const result = await Message.findByIdAndDelete(messageId);
    return result;
  }
}

export const MessageService = new Service();