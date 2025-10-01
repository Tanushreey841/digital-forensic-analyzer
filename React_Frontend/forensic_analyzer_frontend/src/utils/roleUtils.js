// utils/roleUtils.js
export function formatRole(role) {
  if (!role) return "";

  // Remove the "ROLE_" prefix if present
  if (role.startsWith("ROLE_")) {
    role = role.substring(5);
  }

  // Capitalize first letter only (e.g. ADMIN -> Admin)
  return role.charAt(0).toUpperCase() + role.slice(1).toLowerCase();
}
