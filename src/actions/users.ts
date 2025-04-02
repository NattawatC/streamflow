"use server"
import { createSupabaseClient } from "../auth/server"
import { getErrorMessage } from "@/lib/utils"

export const createAccountAction = async (values: {
  email: string
  password: string
}) => {
  try {
    const { email, password } = values // Destructure values

    const supabase = await createSupabaseClient()

    const { error } = await supabase.auth.signUp({
      email,
      password,
    })

    if (error) throw error

    return { errorMessage: null }
  } catch (error) {
    return { errorMessage: getErrorMessage(error) }
  }
}

export const loginAction = async (values: {
  email: string
  password: string
}) => {
  try {
    const { email, password } = values // Destructure values

    const supabase = await createSupabaseClient()

    const { error } = await supabase.auth.signInWithPassword({
      email,
      password,
    })

    if (error) throw error

    return { errorMessage: null }
  } catch (error) {
    return { errorMessage: getErrorMessage(error) }
  }
}

export const logOutAction = async () => {
  try {
    const supabase = await createSupabaseClient()

    const { error } = await supabase.auth.signOut()

    if (error) throw error

    return { errorMessage: null }
  } catch (error) {
    return { errorMessage: getErrorMessage(error) }
  }
}
