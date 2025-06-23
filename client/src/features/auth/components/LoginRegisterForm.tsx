import { Input } from "@/components/form/Input"
import { useLoginMutation, useRegisterMutation } from "@/redux/services/auth"
import { useEffect } from "react"
import { useForm } from "react-hook-form"
import { useAuth } from "../context/AuthContext"
import { useNavigate } from "react-router-dom"
import { useUser } from "@/hooks/useUser"

type LoginRegisterFormInputs = {
  username: string
  password: string
  confirmPassword: string
  firstName: string
  lastName: string
  email: string
}

export function LoginRegisterForm({
  isRegister,
  toLogin,
}: {
  isRegister: boolean
  toLogin: () => void
}) {
  const formDefault = {
    username: "",
    password: "",
    email: "",
    confirmPassword: "",
    firstName: "",
    lastName: "",
  }
  const navigate = useNavigate()
  const { handleSetAccessToken } = useAuth()
  const [registerUser, { isLoading: registerLoading }] = useRegisterMutation()
  const [loginUser, { isLoading: loginLoading }] = useLoginMutation()
  const { setUser } = useUser()

  const {
    register,
    handleSubmit,
    reset,
    setError,
    formState: { errors },
  } = useForm<LoginRegisterFormInputs>({
    defaultValues: formDefault,
  })

  const onSubmit = async (data: LoginRegisterFormInputs) => {
    if (isRegister && data.confirmPassword !== data.password) {
      setError("confirmPassword", { message: "Password fields do not match" })
    }

    try {
      if (isRegister) {
        await registerUser(data).unwrap()
        alert("New user added successfully")
        toLogin()
      } else {
        const { username, password } = data
        const response = await loginUser({
          username,
          password,
        })
        if (response.data) {
          handleSetAccessToken(response.data.accessToken)
          setUser(response.data.userInfo)
          navigate("/")
        }
      }
    } catch (error) {
      console.error(error)
    }
  }

  useEffect(() => {
    reset(formDefault)
  }, [isRegister])

  return (
    <form onSubmit={handleSubmit(onSubmit)} className="w-full">
      <div className="space-y-2 flex flex-col justify-center">
        <Input
          label="Username"
          {...register("username", { required: "Field is required" })}
          error={errors.username}
        />
        {isRegister && (
          <>
            <Input
              label="First Name"
              {...register("firstName", { required: "Field is required" })}
              error={errors.firstName}
            />
            <Input
              label="Last Name"
              {...register("lastName", { required: "Field is required" })}
              error={errors.lastName}
            />
            <Input
              label="Email"
              {...register("email", { required: "Field is required" })}
              error={errors.email}
              type="email"
            />
          </>
        )}
        <Input
          label="Password"
          type="password"
          {...register("password", {
            required: "Field is required",
          })}
          error={errors.password}
        />
        {isRegister && (
          <Input
            label="Confirm Password"
            type="password"
            {...register("confirmPassword", {
              required: "Field is required",
            })}
            error={errors.confirmPassword}
          />
        )}
        <button
          disabled={registerLoading || loginLoading}
          className="m-2 bg-secondary text-primary font-semibold rounded-lg hover:bg-gray-200 focus:outline-none cursor-pointer"
        >
          {isRegister ? "Register" : "Login"}
        </button>
      </div>
    </form>
  )
}
