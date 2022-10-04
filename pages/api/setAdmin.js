import { adminAuth } from "../../lib/firebase-admin";

export default async (req, res) => {
  try {
    // const { uid } = await adminAuth.verifyIdToken(req.headers.token);
    console.log(req.body.uid);
    const uid = req.body.uid;
    const user = await adminAuth.getUser(uid);
    console.log(user);
    if (user.email == "info@larsknoke.com") {
      adminAuth.setCustomUserClaims(uid, { admin: true });
    } else {
      adminAuth.setCustomUserClaims(uid, { admin: false });
    }
    res.status(200).json({ uid });
  } catch (error) {
    res.status(401).json({ error });
  }
};
