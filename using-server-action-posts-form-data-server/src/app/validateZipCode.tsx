"use server";

export async function validateZipCode(zipCode: string): Promise<boolean> {
  console.log("validateZipcode on SERVER", zipCode);
  return /^\d{5}/.test(zipCode) && zipCode.startsWith("9");
}
