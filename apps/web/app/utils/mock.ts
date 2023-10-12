import {promises as fs} from "fs"
async function getMockUsers(): Promise<User[]> {
  try {
    const data = await fs.readFile(process.cwd() + '/app/data/mock-users.json', "utf-8")
    const dataParsed = JSON.parse(data)
    return dataParsed.users
  } catch (error) {
    console.error("Error fetching mock users", error)
    return []
  }

}

type User = {
  id: string,
  username: string,
}

export default getMockUsers
