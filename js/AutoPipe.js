if (World.isWorldLoaded()) {
    autoPipe();
}
function autoPipe() {
    // Client.getMinecraft().hitResult.getBlockPos()
    var blockPos = Client.getMinecraft().field_1765.method_17777();
    var blockPosX = blockPos.method_10263(); // getX() von Vec3i
    var blockPosY = blockPos.method_10264(); // getY() von Vec3i
    var blockPosZ = blockPos.method_10260(); // getZ() von Vec3i
    var sign = World.getBlock(blockPosX, blockPosY, blockPosZ);
    if (!sign.getId().toString().includes("_sign")) {
        return;
    }
    var pistonPos;
    if (sign.getId().toString().includes("wall")) {
        var universalBlockState = sign.getBlockStateHelper().getUniversal();
        var signOffset = universalBlockState.getHorizontalFacing().getVector();
        pistonPos = sign.getBlockPos().offset(-signOffset.x | 0, -signOffset.y | 0, -signOffset.z | 0);
    }
    else {
        pistonPos = sign.getBlockPos().offset(0, -1, 0);
    }
    var piston = World.getBlock(pistonPos);
    if (!piston.getId().toString().includes("piston")) {
        return;
    }
    var universalPissState = piston.getBlockStateHelper().getUniversal();
    var pissOffset = universalPissState.getFacing().getVector();
    var chestPos = piston.getBlockPos().offset(pissOffset.x, pissOffset.y, pissOffset.z);
    var chest = World.getBlock(chestPos);
    if (!chest.getId().toString().includes("chest")) {
        return;
    }
    var items = getChestItemIDs(chest);
    if (items == null) {
        return;
    }
    Player.interactions().interactBlock(sign.getX(), sign.getY(), sign.getZ(), "up", false);
    if (!waitForSign()) {
        return;
    }
    var itemsListString = betterJoin(items, ",");
    if (itemsListString == "") {
        itemsListString = "bedrock";
    }
    Player.writeSign("", "[Pipe]", itemsListString, "");
    Hud.getOpenScreen().close();
}
function getChestItemIDs(chest) {
    var itemIDs = [];
    Player.interactions().interactBlock(chest.getX(), chest.getY(), chest.getZ(), "up", false);
    // Time.sleep(5000)
    if (!waitForContainer()) {
        return;
    }
    var chestInv = Player.openInventory();
    for (var i = 0; i < chestInv.getTotalSlots() - 36; i++) {
        var item = chestInv.getSlot(i);
        if (item.getItemId() == "minecraft:air") {
            continue;
        }
        var itemID = item.getItemId().slice(10);
        if (itemIDs.includes(itemID)) {
            continue;
        }
        itemIDs.push(itemID);
    }
    chestInv.close();
    return itemIDs;
}
function waitForSign() {
    var timeout = 1000;
    var sleepTimer = 10;
    var timer = 0;
    while (Hud.getOpenScreenName() != "Edit Sign Message") {
        Time.sleep(sleepTimer);
        timer += sleepTimer;
        if (timeout < timer) {
            Chat.log("Time Out Sign");
            return false;
        }
    }
    return true;
}
function waitForContainer() {
    var timeout = 1000;
    var sleepTimer = 10;
    var timer = 0;
    while (!Player.openInventory().isContainer() || Player.openInventory().getItems().size() == 0) {
        Time.sleep(sleepTimer);
        timer += sleepTimer;
        if (timeout < timer) {
            Chat.log("Time Out Container");
            return false;
        }
    }
    return true;
}
function betterJoin(array, separator) {
    if (array.length == 0) {
        return "";
    }
    var output = array[0];
    for (var i = 1; i < array.length; i++) {
        if (output.concat(separator, array[i]).length <= 80) {
            output = output.concat(separator, array[i]);
        }
        else {
            return output;
        }
    }
    return output;
}
