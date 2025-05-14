// utils/gravatar.ts
import md5 from "md5";

export function getGravatarUrl(email: string, size = 128): string {
    const trimmedEmail = email.trim().toLowerCase();
    const hash = md5(trimmedEmail);
    return `https://www.gravatar.com/avatar/${hash}?s=${size}&d=mp`;
}
