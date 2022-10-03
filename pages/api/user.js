import { adminAuth } from "../../lib/firebase-admin";

export default async (req, res) => {
  try {
    const { uid } = await adminAuth.verifyIdToken(req.headers.token);
    const user = await adminAuth.getUser(uid);
    if (user.email == "info@larsknoke.com") {
      adminAuth.setCustomUserClaims(uid, { admin: true });
    } else {
      adminAuth.setCustomUserClaims(uid, { admin: false });
    }
    console.log(user);

    res.status(200).json({ uid });
  } catch (error) {
    res.status(401).json({ error });
  }
};
