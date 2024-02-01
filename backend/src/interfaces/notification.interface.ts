import { Types } from "mongoose";

export type INotification = {
  id: number;
  type: string;
  createdAt: Date;
  read: boolean;
  content: {
    title: string;
    message: string;
    link: string;
    data: {
      sendBy: string;
    };
  };
  recipient: {
    userId: string | Types.ObjectId;
    name: string;
  };
};
