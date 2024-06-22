export default class FetchPosts {
  static async execute() {
    const requestOptions = {
      method: 'GET'
    }
    const data = await fetch(import.meta.env.VITE_API_URL, requestOptions)
    return data.json()
  }
}
