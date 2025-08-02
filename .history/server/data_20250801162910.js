import { JSONFilePreset } from 'lowdb/node'

const db = await JSONFilePreset('db.json',{
    users: [],
    chatRooms: []
})
await db.write()
export default db