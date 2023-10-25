const { connection } = require("../database/index")
const Crash_history = require("../model/crash-game-history")
const crash_game = require("../model/crash_hash")

// Store crash_ history after it crash
const handleCrashHistory = (async(e)=>{
    let data = {hash: e.hash, game_id:e.game_id, crash_point: e.crashpoint}
   let result = await Crash_history.create(data)
   return result
})

const handleGameCrash = (async(event)=>{
    await crash_game.updateMany({ game_type: "Classic", user_status: true }, {
      has_won: false,
      user_status: false,
      cashout: 0,
      profit: 0
     });
    const re=  await crash_game.updateMany({ game_type: "Classic", game_type: event.game_id }, {
      game_hash: event.hash,
      payout: event.crashpoint,
      game_status: 0,
     });

     await crash_game.updateMany({ game_type: event.game_id }, {
      game_hash: event.hash,
      game_status: 0,
     });
})


//================== update payout and crash hash ===========================
const handleMoonTrendballEl = ((game)=>{
    let sql2 = `UPDATE crash_game SET payout="${game.crashpoint}",  game_hash="${game.hash}", game_status="${0}" WHERE game_id="${game.game_id}" AND game_type="Moon" `;
    connection.query(sql2, function (err, result) {
      if (err) throw err;
      (result)
    });
})



module.exports = { handleCrashHistory,handleGameCrash , handleMoonTrendballEl}