import { useSession, signIn, signOut } from "next-auth/react";

export default function LoginBtn() {
  const { data: session } = useSession();
  if (session) {
    return (
      <>
        Angemeldet: {session.user.email} <br />
        <button onClick={() => signOut()}>Logout</button>
      </>
    );
  }
  return (
    <>
      <button onClick={() => signIn()}>Login</button>
    </>
  );
}
