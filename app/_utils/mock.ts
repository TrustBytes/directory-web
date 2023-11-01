import { promises as fs } from "node:fs"

async function getMockUsers(): Promise<User[]> {
  try {
    const data: string = await fs.readFile(`${process.cwd()}/app/_data/mock-users.json`, "utf-8")
    const dataParsed: Data = JSON.parse(data) as Data
    return dataParsed.users
  } catch (error) {
    return []
  }

}

interface User {
  id: string,
  username: string,
}


interface Data {
  users: User[]
} 

export default getMockUsers
