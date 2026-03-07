// Chat.log("why")/

// // GET THE BLOCK INFRONT OF THE CAM (Not the player)
// let blockPos = Client.getMinecraft().field_1765.method_17777()
// let blockPosX = blockPos.method_10263()
// let blockPosY = blockPos.method_10264()
// let blockPosZ = blockPos.method_10260()

// Chat.log(World.getBlock(blockPosX, blockPosY, blockPosZ))

// const globalName = "Block_search"
// const globalNameToggle = "Block_search_toggle"
// const RADIUS = 1000;

// const player = Player.getPlayer();
// const px = Math.floor(player.getX());
// const py = Math.floor(player.getY());
// const pz = Math.floor(player.getZ());

// if (GlobalVars.getObject(globalName) == null) {
//     GlobalVars.putObject(globalName,Hud.createDraw3D())
//     GlobalVars.putBoolean(globalNameToggle,true)
// }

// const tracer = GlobalVars.getObject(globalName)
// const tracerToggle = GlobalVars.getBoolean(globalNameToggle)

// if (tracerToggle){
//     GlobalVars.putBoolean(globalNameToggle,false)
//     Chat.log("§aSuche nach Schildern im Radius von " + RADIUS + "...");

//     for (let x = px - RADIUS; x <= px + RADIUS; x++) {
//         for (let y = py - RADIUS; y <= py + RADIUS; y++) {
//             for (let z = pz - RADIUS; z <= pz + RADIUS; z++) {

//                 const block = World.getBlock(x, y, z);
//                 if (!block) continue;

//                 const id = block.getId();

//                 if (id.includes("sign")) {

//                     // Chat.log("§eSchild gefunden bei: §b" + x + " " + y + " " + z);

//                     // kleine Box um das Schild
//                     tracer.addBox(
//                         x, y, z,
//                         x + 1, y + 1, z + 1,
//                         255, 0, false, false
//                     );
//                 }
//             }
//         }
//     }

//     tracer.register();

// Chat.log("§aSuche beendet.");
// } else {
//     GlobalVars.putBoolean(globalNameToggle,true)
//     tracer.unregister();
//     Chat.log("§cAlle Sign-Marker entfernt.");
// }






// const globalName = "Block_search"
// const globalNameToggle = "Block_search_toggle"
// const RADIUS = 4000;

// const player = Player.getPlayer();
// const px = player.getX();
// const py = player.getY();
// const pz = player.getZ();

// if (GlobalVars.getObject(globalName) == null) {
//     GlobalVars.putObject(globalName, Hud.createDraw3D())
//     GlobalVars.putBoolean(globalNameToggle, true)
// }

// const tracer = GlobalVars.getObject(globalName)
// const tracerToggle = GlobalVars.getBoolean(globalNameToggle)

// if (tracerToggle) {

//     GlobalVars.putBoolean(globalNameToggle, false)
//     Chat.log("§aSuche nach ArmorStands im Radius von " + RADIUS + "...");

//     const entities = World.getEntities();

//     for (let i = 0; i < entities.length; i++) {

//         const e = entities[i];

//         if (e.getType() != "minecraft:armor_stand") continue;

//         const x = e.getX();
//         const y = e.getY();
//         const z = e.getZ();

//         const dist = Math.sqrt((x-px)**2 + (y-py)**2 + (z-pz)**2);
//         if (dist > RADIUS) continue;
//         Chat.log("§eArmorStand gefunden bei: §b" + x + " " + y + " " + z);
//         tracer.addBox(
//             x, y, z,
//             x + 1, y + 1, z + 1,
//             255, 0, false, false
//         );
//     }

//     tracer.register();
//     Chat.log("§aSuche beendet.");
// } else {

//     GlobalVars.putBoolean(globalNameToggle, true)
//     tracer.clear()
//     tracer.unregister()
//     Chat.log("§cAlle ArmorStand-Marker entfernt.")

// }
