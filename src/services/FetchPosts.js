export default class FetchPosts {
  static async execute() {
    const myHeaders = new Headers()
    myHeaders.append('Authorization', `Bearer ${import.meta.env.BEARER_TOKEN}`)
    myHeaders.append('Content-Type', 'application/json')
    myHeaders.append('Notion-Version', '2022-02-22')

    const raw = JSON.stringify({
      sorts: [
        {
          property: 'Name',
          direction: 'ascending'
        }
      ]
    })

    const requestOptions = {
      method: 'POST',
      headers: myHeaders,
      body: raw,
      redirect: 'follow'
    }

    const data = await fetch(
      `https://api.notion.com/v1/databases/${import.meta.env.DATABASE_ID}/query`,
      requestOptions
    )
    return data.json()
  }
}
