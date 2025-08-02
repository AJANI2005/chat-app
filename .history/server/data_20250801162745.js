import { JSONFilePreset } from 'lowdb/node'

export const db = await JSONFilePreset<any>('db.json',{
    users: [],
    chatRooms: []
})