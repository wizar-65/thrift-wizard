import { useAuth } from "@/features/auth/hooks/useAuth"

export function Welcome() {
  const { user } = useAuth()
  console.log(user, "this should be the user")
  return (
    <header className="text-center">
      <h1 className="text-2xl">{`Welcome to Thrift Wizard${
        user.firstName ? `, ${user.firstName}!` : "!"
      }`}</h1>
    </header>
  )
}
