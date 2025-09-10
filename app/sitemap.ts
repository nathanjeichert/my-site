// Sitemap for Northern Disconnection band website
export const baseUrl = 'https://northerndisconnection.com'

export default async function sitemap() {
  let routes = ['', '/about', '/shows', '/music'].map((route) => ({
    url: `${baseUrl}${route}`,
    lastModified: new Date().toISOString().split('T')[0],
  }))

  return routes
}
