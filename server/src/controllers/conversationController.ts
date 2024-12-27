import express, { Router, Request, Response, } from "express";
import { getInboxByUserId } from "../services/conversationService";
import { ConversationModel } from "../models/converstationModel";

const router: Router = express.Router();

router.get("/:userId", async (req: Request, res: Response) => {
  const pid: number = parseInt(req.params.userId);
  const rawData = await getInboxByUserId(pid);
  const data = rawData.map((conversation) => {
    return {
      conversationId: conversation.conversation_id as string,
      name: conversation.name as string,
      updatedAt: conversation.updated_at as Date,
    };
  });

  const response = { data: data, message: "Inbox fetched successfully" };

  if (data.length) {
    res.status(200).send(response);
  } else {
    res.status(404).send({ message: "No inbox found" });
  }
});

// router.post("/:userId", (req: Request, res: Response) => {
//   const pid = req.params.participiantId;
//   res.send("Hello World!");
// });

export default router;