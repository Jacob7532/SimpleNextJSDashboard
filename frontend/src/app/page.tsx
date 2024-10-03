import { redirect } from 'next/navigation'

//Redirects to the dashboard page
export default function Home() {
  redirect('/dashboard')
}