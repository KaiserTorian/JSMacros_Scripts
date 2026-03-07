var ignoreBlocks = ["glass", "iron_bars"];
var ignorBlocksGlob = "jsIgnoreBlocks";
function getBlockPos() {
    var STEP_SIZE = 0.1;
    var MAX_LEN = Player.getReach();
    var illegalFound = false;
    var firstAfterIllegal = null;
    for (var dist = 0; dist <= MAX_LEN; dist += STEP_SIZE) {
        var target = rayTraceFixDist(dist);
        var isIllegal = isIlligalBlock(target["block"]);
        if (!illegalFound) {
            illegalFound = isIllegal;
            continue;
        }
        if (!isIllegal && firstAfterIllegal === null) {
            firstAfterIllegal = target;
        }
        if (!isIllegal && !target["block"].getId().includes("air")) {
            return target;
        }
    }
    return firstAfterIllegal;
}
function isIlligalBlock(block) {
    for (var i = 0; i < ignoreBlocks.length; i++) {
        if (block === null || block === void 0 ? void 0 : block.getId().includes(ignoreBlocks[i])) {
            return true;
        }
    }
    return false;
}
//FIXME: Targets the block even if the raytracer did not hit the hitbox 
function rayTraceFixDist(dist) {
    var player = Player.getPlayer();
    var pos = player.getPos().add(0, 1.65, 0);
    var yaw = player.getYaw();
    var pitch = player.getPitch();
    var radYaw = yaw * Math.PI / 180;
    var radPitch = pitch * Math.PI / 180;
    var x = pos.x - Math.sin(radYaw) * Math.cos(radPitch) * dist;
    var y = pos.y - Math.sin(radPitch) * dist;
    var z = pos.z + Math.cos(radYaw) * Math.cos(radPitch) * dist;
    var block = World.getBlock(Math.floor(x), Math.floor(y), Math.floor(z));
    var face = blockFaceDetection(x, y, z);
    return { block: block, face: face, x: x, y: y, z: z };
}
// Vide coding shit but it works 
function blockFaceDetection(x, y, z) {
    var fx = x - Math.floor(x);
    var fy = y - Math.floor(y);
    var fz = z - Math.floor(z);
    var min = Math.min(fx, 1 - fx, fy, 1 - fy, fz, 1 - fz);
    if (min === fx)
        return "west";
    if (min === 1 - fx)
        return "east";
    if (min === fy)
        return "down";
    if (min === 1 - fy)
        return "up";
    if (min === fz)
        return "north";
    return "south";
}
onTick();
function onTick() {
    if (!World.isWorldLoaded()) {
        return;
    }
    var active = GlobalVars.getBoolean(ignorBlocksGlob);
    if (!active) {
        Player.interactions().clearTargetOverride();
        return;
    }
    var block = getBlockPos();
    if (block === null) {
        Player.interactions().clearTargetOverride();
        return;
    }
    Player.interactions().setTarget(block["block"].getBlockPos(), block["face"]);
}
