import {
  IMessage,
  IMessagePayloadForSocket,
} from "@/interfaces/message.interface";
import { Message } from "@/models/message.model";
import { UserSelect } from "propertySelections";

export class Service {
  async createMessage(data: IMessage): Promise<IMessagePayloadForSocket> {
    const result = await Message.create(data);
    const populatedResult: any = await result.populate({
      path: "poster",
      model: "User",
      select: UserSelect,
    });
    const {
      _id: msId,
      conversationId,
      text,
      type,
      images,
      files,
      createdAt,
      poster: { _id: userId, name, profile_picture },
    } = populatedResult;
    const emitData: IMessagePayloadForSocket = {
      id: msId,
      conversationId: conversationId,
      text: text,
      type: type,
      poster: {
        id: userId,
        name: name,
        profile_picture: profile_picture,
      },
      files: files,
      images: images,
      createdAt: createdAt,
    };
    console.log(emitData);
    return emitData;
  }

  async getMessagesByType(
    messageType: string,
    conversationId: string
  ): Promise<any> {
    const result = await Message.find({
      type: messageType,
      conversationId,
    }).populate({
      path: "poster",
      model: "User",
      select: UserSelect,
    });

    return result;
  }

  async getMessage(messageId: string): Promise<any> {
    const result = await Message.findById(messageId).populate({
      path: "poster",
      model: "User",
      select: UserSelect,
    });

    return result;
  }
  async getMessageById(messageId: string): Promise<IMessage | null> {
    return await Message.findById(messageId).populate({
      path: "poster",
      model: "User",
      select: UserSelect,
    });
  }

  async updateMessage(messageId: string, text: string): Promise<any> {
    const result = await Message.findByIdAndUpdate(
      messageId,
      { $set: { text } },
      { new: true }
    ).populate({
      path: "poster",
      model: "User",
      select: UserSelect,
    });

    return result;
  }

  async deleteMessage(messageId: string): Promise<any> {
    const result = await Message.findByIdAndDelete(messageId);
    return result;
  }
}

export const MessageService = new Service();
