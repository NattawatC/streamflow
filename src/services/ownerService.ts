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
      console.error("Error fetching bank information:", error)
      return null
    }

    return bank.length > 0 ? bank : null
  }
  
  export const getUserEstate = async (userId: string | undefined) => {
    if (!userId) return { estates: [], error: "User ID is missing" }
  
    const { data: estates, error } = await supabase
      .from("estates")
      .select("*")
      .eq("user_id", userId)
  
    if (error) return { estates: [], error: error.message }
    if (!estates || estates.length === 0) return { estates: [], error: "No estates found" }
  
    return { estates, error: null }
  }
  export const getUserEstateId = async (userId: string | undefined) => {
    if (!userId) return { estateId: null, error: "User ID is missing" }
  
    const { data: estates, error } = await supabase
      .from("estates")
      .select("id")
      .eq("user_id", userId)
      .single()
  
    if (error) return { estateId: null, error: error.message }
    if (!estates) return { estateId: null, error: "No estate found" }
  
    return { estateId: estates.id, error: null }
  }

  export const getAllElectricityMeterById = async (estateId: number | undefined) => {
    if (!estateId) return { electricity: [], error: "Estate ID is missing" }
  
    const { data: electricity, error } = await supabase
      .from("electricity")
      .select("*")
      .eq("estate_id", estateId)
  
    if (error) return { electricity: [], error: error.message }
  
    return { electricity, error: null }
  }

  export const getAllWaterMeterById = async (estateId: number | undefined) => {
    if (!estateId) return { water: [], error: "Estate ID is missing" }
  
    const { data: water, error } = await supabase
      .from("water")
      .select("*")
      .eq("estate_id", estateId)
  
    if (error) return { water: [], error: error.message }
  
    return { water, error: null }
  }