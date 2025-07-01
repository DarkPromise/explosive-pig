import { redirect } from 'react-router';

export const loader = async () => {
  // Force redirect to classes page
  return redirect("/classes");
}

function Home() {
  return <></>
}

export default Home
