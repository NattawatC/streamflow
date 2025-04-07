import supabase from "@/config/supabaseClient"

// Update Electricity Meter
export const updateElectricityMeter = async ({
  room_no,
  meter_no,
  kWh,
}: {
  room_no: string;
  meter_no: string;
  kWh: number;
}) => {
  const { data, error } = await supabase
    .from("electricity") // Use your actual table name
    .update({ 
      meter_no: meter_no,
      kWh: kWh,
    })
    .eq("room_no", room_no)
    .select();

  if (error) {
    console.error("Error updating electricity meter:", error);
    return { error: error.message };
  }

  return { data };
};

// Update Water Meter
export const updateWaterMeter = async ({
  room_no,
  meter_no,
  usage,
}: {
  room_no: string;
  meter_no: string;
  usage: number;
}) => {
  const { data, error } = await supabase
    .from("water") // Use your actual table name
    .update({ 
      meter_no: meter_no,
      usage: usage,
    })
    .eq("room_no", room_no)
    .select();

  if (error) {
    console.error("Error updating water meter:", error);
    return { error: error.message };
  }

  return { data };
};