// Settings
const BLOCKID: string = "chest"
const RADIUS: int = 50 // chunks
const CULLING: boolean = false
const COLOR: int = 0x8805fc | 0
// Settings end

const globalName = "Block_search"
const globalNameToggle = "Block_search_toggle"

const player: ClientPlayerEntityHelper = Player.getPlayer()
const px: int = Math.floor(player.getX())
const py: int = Math.floor(player.getY())
const pz: int = Math.floor(player.getZ())

if (GlobalVars.getObject(globalName) == null) {
    GlobalVars.putObject(globalName,Hud.createDraw3D())
    GlobalVars.putBoolean(globalNameToggle,true)
}

const tracer: Draw3D = GlobalVars.getObject(globalName)
const tracerToggle:boolean = GlobalVars.getBoolean(globalNameToggle)

if (tracerToggle){
    GlobalVars.putBoolean(globalNameToggle,false)
    tracer.clear()

    Chat.log("§aSearh Blocks (§b" + BLOCKID + "§a) in a §b" + RADIUS + " §aradius...");
    let count: int = 0
    for (let x =-RADIUS; x < RADIUS ; x++){
        for (let z =-RADIUS; z < RADIUS ; z++){

            const chunk: ChunkHelper = World.getChunk((px >> 4) + x, (pz >> 4) + z) 
            const te:JavaList<BlockPosHelper> = chunk.getTileEntities() 

            for (let i = 0; i < te.size(); i++){

                if (World.getBlock(te[i]).getId().includes(BLOCKID)){
                    count = count + 1
                            tracer.addBox(
                                te[i].getX(), te[i].getY(), te[i].getZ(),
                                te[i].getX() + 1, te[i].getY() + 1, te[i].getZ() + 1,
                                COLOR, 255, COLOR, 20, false, CULLING
                            )
                            // tracer.addTraceLine(te[i].getX(), te[i].getY(), te[i].getZ(), COLOR) // Does not work in the current JSMacros version
                            tracer.register()

                            
                }
                // Time.sleep(1) // Looks cool
            }
        }
    }

    // ---- USE THIS WHEN SEARCHING BLOCKS... BASICALLY USELESS ----
    // for (let x = px - RADIUS; x <= px + RADIUS; x++) {
    //     for (let y = py - RADIUS; y <= py + RADIUS; y++) {
    //         for (let z = pz - RADIUS; z <= pz + RADIUS; z++) {

    //             const block = World.getBlock(x, y, z)
    //             if (!block) continue

    //             const id = block.getId()

    //             if (id.includes(blockID)) {

    //                 count = count + 1
    //                 tracer.addBox(
    //                     x, y, z,
    //                     x + 1, y + 1, z + 1,
    //                      COLOR, 255, 0, 0, false, CULLING
    //                 )
    //                 tracer.register()
    //             }
    //         }
    //     }
    // }

    Chat.log("§aSearch endet. §b" + count + " §afound")

} else {

    GlobalVars.putBoolean(globalNameToggle,true)
    tracer.clear()
    tracer.unregister()
    Chat.log("§cClear/Hide")
}
