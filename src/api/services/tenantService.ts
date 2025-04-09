import supabase from "@/config/supabaseClient"

// Function to get estates by user_id
export const getEstate = async (userId: string | undefined) => {
  if (!userId) return { estates: [], error: "User ID is missing" }

  const { data: estates, error } = await supabase
    .from("estates")
    .select("*")
    .eq("user_id", userId)

  if (error) return { estates: [], error: error.message }
  if (!estates || estates.length === 0)
    return { estates: [], error: "No estates found" }

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

  return {
    tenants: tenants || [],
    error: tenantsError ? tenantsError.message : null,
  }
}

export async function calculateRentalCost(tenant: any) {
  // Get estate info for rates
  const { data: estate, error: estateError } = await supabase
    .from("estates")
    .select("electricity_cost, water_cost, furniture_cost, room_charge") // Fixed typo: electricity_cost
    .eq("id", tenant.estate_id)
    .single()

  if (estateError || !estate) {
    console.error("Error fetching estate data:", estateError)
    return 0
  }

  // Get electricity usage
  const { data: electricity, error: electricityError } = await supabase
    .from("electricity")
    .select("kWh, initial_value")
    .eq("room_no", tenant.room_no)
    .eq("estate_id", tenant.estate_id) // Added estate_id filter for safety
    .single()

  // Get water usage
  const { data: water, error: waterError } = await supabase
    .from("water")
    .select("usage, initial_value")
    .eq("room_no", tenant.room_no)
    .eq("estate_id", tenant.estate_id) // Added estate_id filter for safety
    .single()

  // Calculate costs
  const electricUsage = electricity
    ? (electricity.kWh || 0) - (electricity.initial_value || 0)
    : 0
  const waterUsage = water ? (water.usage || 0) - (water.initial_value || 0) : 0

  const electricCost = (estate.electricity_cost || 0) * electricUsage
  const waterCost = (estate.water_cost || 0) * waterUsage
  const totalCost = Math.round(
    // Round to whole number for currency
    electricCost +
      waterCost +
      (estate.furniture_cost || 0) +
      (estate.room_charge || 0)
  )

  // Update tenant record with calculated cost
  const { error: updateError } = await supabase
    .from("tenants")
    .update({ rental_cost: totalCost }) // Correct update syntax
    .eq("id", tenant.id) // Better to use tenant.id than room_no which might not be unique

  if (updateError) {
    console.error("Error updating tenant rental cost:", updateError)
  }

  return totalCost
}
