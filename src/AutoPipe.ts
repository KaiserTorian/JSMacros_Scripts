

if (World.isWorldLoaded()) {
    autoPipe()
}

function autoPipe() {
    // Client.getMinecraft().hitResult.getBlockPos()
    let blockPos = Client.getMinecraft().field_1765.method_17777()
    let blockPosX = blockPos.method_10263() // getX() von Vec3i
    let blockPosY = blockPos.method_10264() // getY() von Vec3i
    let blockPosZ = blockPos.method_10260() // getZ() von Vec3i
    
    let sign = World.getBlock(blockPosX, blockPosY, blockPosZ)
  

    if (!sign.getId().toString().includes("_sign")) {return}
    let pistonPos
    
    if (sign.getId().toString().includes("wall")) {
        let universalBlockState = sign.getBlockStateHelper().getUniversal()
        let signOffset = universalBlockState.getHorizontalFacing().getVector()
        pistonPos = sign.getBlockPos().offset(-signOffset.x | 0, -signOffset.y | 0, -signOffset.z | 0)
    } else {
        pistonPos  = sign.getBlockPos().offset(0, -1, 0)
    }

    let piston = World.getBlock(pistonPos)
    if (!piston.getId().toString().includes("piston")) {return}
    
    let universalPissState = piston.getBlockStateHelper().getUniversal()
    let pissOffset = universalPissState.getFacing().getVector()
    let chestPos = piston.getBlockPos().offset(pissOffset.x,pissOffset.y,pissOffset.z)

    let chest = World.getBlock(chestPos)
    if (!chest.getId().toString().includes("chest")) {return}
    
    let items = getChestItemIDs(chest)
    if (items == null) {return}

    Player.interactions().interactBlock(sign.getX(), sign.getY(), sign.getZ(), "up", false)
    if (!waitForSign()) {return}

    let itemsListString: string = betterJoin(items,",")
    if (itemsListString == ""){
        itemsListString = "bedrock"
    } 

    Player.writeSign("", "[Pipe]",itemsListString , "")
    Hud.getOpenScreen().close()
}


function getChestItemIDs(chest) {
    let itemIDs = []
    Player.interactions().interactBlock(chest.getX(), chest.getY(), chest.getZ(), "up", false)
    // Time.sleep(5000)

    if (!waitForContainer()) {return}
    let chestInv = Player.openInventory()
    
    for (var i = 0; i < chestInv.getTotalSlots() - 36; i++) {
        let item = chestInv.getSlot(i)

        if (item.getItemId() == "minecraft:air") {continue}
        let itemID = item.getItemId().slice(10)
        if (itemIDs.includes(itemID)) {continue}
        itemIDs.push(itemID)
    } 

    chestInv.close()
    return itemIDs

}


function waitForSign() {
    const timeout = 1000
    const sleepTimer = 10
    let timer = 0

    while (Hud.getOpenScreenName() != "Edit Sign Message"){
        Time.sleep(sleepTimer)
        timer += sleepTimer
        if (timeout < timer){
            Chat.log("Time Out Sign")
            return false
        }
    }
    return true
}




function waitForContainer(){
    const timeout = 1000
    const sleepTimer = 10
    let timer = 0

    while (!Player.openInventory().isContainer() || Player.openInventory().getItems().size() == 0){
        Time.sleep(sleepTimer)
        timer += sleepTimer
        if (timeout < timer){
            Chat.log("Time Out Container")
            return false
        }
    }
    return true
}
 

function betterJoin(array:string[],separator:string) {
    if (array.length == 0) {return ""}

    let output:string = array[0]
    for (let i = 1; i < array.length; i++){

        if (output.concat(separator, array[i]).length <= 80) {
            output = output.concat(separator, array[i])
        } else {
            return output
        }
    }
    return output
}   