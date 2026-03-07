const ignoreBlocks: string[] = ["glass","iron_bars"]
const ignorBlocksGlob = "jsIgnoreBlocks"

type RaytracerBlockHelper =  {block: BlockDataHelper, face: Direction, x: number, y: number,z: number}



function getBlockPos(): RaytracerBlockHelper {
    const STEP_SIZE = 0.1
    const MAX_LEN = Player.getReach()

    let illegalFound = false
    let firstAfterIllegal: RaytracerBlockHelper | null = null

    for (let dist = 0; dist <= MAX_LEN; dist += STEP_SIZE) {
        const target = rayTraceFixDist(dist)
        const isIllegal = isIlligalBlock(target["block"])

        if (!illegalFound) {
            illegalFound = isIllegal
            continue
        }

        if (!isIllegal && firstAfterIllegal === null) {
            firstAfterIllegal = target
        }


        if (!isIllegal && !target["block"].getId().includes("air")) {      
            return target
        }
    }
    return firstAfterIllegal!
}


function isIlligalBlock(block: BlockDataHelper|null): boolean {

    for (let i = 0; i < ignoreBlocks.length; i++){
        if (block?.getId().includes(ignoreBlocks[i])){
            return true
        }
    }
    return false
}


//FIXME: Targets the block even if the raytracer did not hit the hitbox 
function rayTraceFixDist(dist: double): RaytracerBlockHelper {
    const player = Player.getPlayer()
    
    const pos = player.getPos().add(0,1.65,0)
    const yaw = player.getYaw()
    const pitch = player.getPitch()

    const radYaw = yaw * Math.PI / 180
    const radPitch = pitch * Math.PI / 180

    const x = pos.x - Math.sin(radYaw) * Math.cos(radPitch) * dist
    const y = pos.y - Math.sin(radPitch) * dist
    const z = pos.z + Math.cos(radYaw) * Math.cos(radPitch) * dist

    const block = World.getBlock(Math.floor(x), Math.floor(y), Math.floor(z))
    const face = blockFaceDetection(x, y, z)

    return {block: block, face: face, x: x, y: y, z: z}
}


// Vide coding shit but it works 
function blockFaceDetection(x, y, z): Direction{

    const fx = x - Math.floor(x)
    const fy = y - Math.floor(y)
    const fz = z - Math.floor(z)

    const min = Math.min(
        fx, 1 - fx,
        fy, 1 - fy,
        fz, 1 - fz
    )

    if (min === fx) return "west"
    if (min === 1 - fx) return "east"
    if (min === fy) return "down"
    if (min === 1 - fy) return "up"
    if (min === fz) return "north"
    return "south"
}

onTick()
function onTick(): void {
    if (!World.isWorldLoaded()) {return}

    const active = GlobalVars.getBoolean(ignorBlocksGlob)
    
    if (!active) {
         Player.interactions().clearTargetOverride()
        return
    }

    const block: RaytracerBlockHelper = getBlockPos()
    if (block === null) {
        Player.interactions().clearTargetOverride()
        return
    }

    Player.interactions().setTarget(block["block"].getBlockPos(), block["face"])
}

