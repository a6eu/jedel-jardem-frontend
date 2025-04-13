export const formatDate = (date: string) => {
  return new Date(date).toLocaleDateString('en-EN', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
    hour: 'numeric',
    minute: 'numeric'
  })
}