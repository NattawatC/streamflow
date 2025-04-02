import supabase from "@/config/supabaseClient"

export const getTenants = async (userId: string | undefined) => {
  if (!userId) return { tenants: [], error: "User ID is missing" }

  const { data: estates, error: estatesError } = await supabase
    .from("estates")
    .select("id")
    .eq("user_id", userId)

  if (estatesError) return { tenants: [], error: estatesError.message }
  if (!estates || estates.length === 0) return { tenants: [], error: "No estates found" }

  const estateIds = estates.map((estate) => estate.id)

  const { data: tenants, error: tenantsError } = await supabase
    .from("tenants")
    .select("*")
    .in("estate_id", estateIds)

  return { tenants: tenants || [], error: tenantsError ? tenantsError.message : null }
}
