export interface ConversationModel extends Document {
  conversationId: string;
  name: string;
  updatedAt: Date;
}