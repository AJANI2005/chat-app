export const db = await JSONFilePreset<any>('db.json',{
    users: [],
    chatRooms: []
})