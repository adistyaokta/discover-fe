export function getInitials(data: string) {
  const dataParts = data.trim().split(' ');

  const initials = dataParts.map((part) => part.charAt(0).toUpperCase()).join('');

  return initials;
}
