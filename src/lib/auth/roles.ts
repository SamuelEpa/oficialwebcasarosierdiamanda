export type AdminRole = "admin" | "editor" | "teacher" | "collaborator";

export const ADMIN_ROLES: AdminRole[] = ["admin", "editor"];

export function isAdminRole(role: string): role is AdminRole {
  return ADMIN_ROLES.includes(role as AdminRole);
}