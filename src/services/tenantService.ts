import supabase from "@/config/supabaseClient"

// Function to get estates by user_id
export const getEstate = async (userId: string | undefined) => {
  if (!userId) return { estates: [], error: "User ID is missing" }

  const { data: estates, error } = await supabase
    .from("estates")
    .select("*")
    .eq("user_id", userId)

  if (error) return { estates: [], error: error.message }
  if (!estates || estates.length === 0) return { estates: [], error: "No estates found" }

  return { estates, error: null }
}

// Function to get tenants based on the estates
export const getTenants = async (userId: string | undefined) => {
  const { estates, error: estatesError } = await getEstate(userId)
  if (estatesError) return { tenants: [], error: estatesError }

  const estateIds = estates.map((estate) => estate.id)

  const { data: tenants, error: tenantsError } = await supabase
    .from("tenants")
    .select("*")
    .in("estate_id", estateIds)

  return { tenants: tenants || [], error: tenantsError ? tenantsError.message : null }
}
