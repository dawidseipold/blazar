import type { NextApiRequest, NextApiResponse } from "next";

export default (req: NextApiRequest, res: NextApiResponse) => {
  if (req.method === "POST") {
    const payload = req.body;
    console.log(payload);
    res.status(200).json({ message: "Webhook received" });
  }
};
