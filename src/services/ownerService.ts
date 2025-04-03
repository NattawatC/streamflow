import supabase from "@/config/supabaseClient"
import { OwnerProfile } from "@/interfaces/ownerProfile"

export const getUserProfile = async (
  userId: string | undefined
): Promise<OwnerProfile | null> => {
  if (!userId) return null // If userId is undefined, return null

  const { data: profile, error } = await supabase
    .from("profile")
    .select("*")
    .eq("user_id", userId)
    .single()

  if (error) {
    // console.error("Error fetching profile:", error)
    return null // Return null if there's an error
  }

  return profile ?? null // Return the profile or null if not found
}

export const getUserBanks = async (userId: string | undefined) => {
    if (!userId) return null // If userId is undefined, return null
  
    const { data: bank, error } = await supabase
      .from("bank_info")
      .select("*")
      .eq("user_id", userId)
  
    if (error) {
      // Handle any error that occurred while fetching the bank data
      console.error("Error fetching bank information:", error)
      return null // Return null if there's an error
    }
  
    // Return bank data if found, otherwise return null
    return bank.length > 0 ? bank : null
  }
  
