import { JSONFilePreset } from 'lowdb/node'

let db = null
(async ()=>{
    db = await JSONFilePreset('db.json',{
        users: [],
        chatRooms: []
    })
    await db.write()
})();
export default db