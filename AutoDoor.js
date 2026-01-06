// Tick Event //

const last_door_gv = "last_door"
const interaction_key = "key.mouse.right"

// WTF did I code here... I bet there is a better way to do this, but I dont care :)


var block = Player.rayTraceBlock(Player.getReach(), false)
var last_block = GlobalVars.getObject(last_door_gv)
var target

if (block != null) {
    if (block.getId().toString().includes("_door")) {
        target = block
    }
}


if (target == null && last_block != null){
    if (last_block.getId().toString().includes("_door")) {
        target = last_block
    }
}


if (KeyBind.getPressedKeys().contains(interaction_key) && target != null){
    auto_door(target.getBlockPos())
}

if (block == null) {
    GlobalVars.remove(last_door_gv)
} else {
    GlobalVars.putObject(last_door_gv,block)
}



function auto_door(target_pos){
    var target = World.getBlock(target_pos.getX(), target_pos.getY(), target_pos.getZ())

   
    var target_north = World.getBlock(target_pos.north().getX(), target_pos.north().getY(), target_pos.north().getZ())
    if (target_north.getName().getString().includes("Door") && target.getBlockState()["open"] != target_north.getBlockState()["open"]){
        Player.getInteractionManager().interactBlock(target_north.getX(), target_north.getY(), target_north.getZ(), 0, false)
    }

    var target_east = World.getBlock(target_pos.east().getX(), target_pos.east().getY(), target_pos.east().getZ())
    if (target_east.getName().getString().includes("Door") && target.getBlockState()["open"] != target_east.getBlockState()["open"]){
        Player.getInteractionManager().interactBlock(target_east.getX(), target_east.getY(), target_east.getZ(), 0, false)
    }

    var target_south = World.getBlock(target_pos.south().getX(), target_pos.south().getY(), target_pos.south().getZ())
    if (target_south.getName().getString().includes("Door") && target.getBlockState()["open"] != target_south.getBlockState()["open"]){   
        Player.getInteractionManager().interactBlock(target_south.getX(), target_south.getY(), target_south.getZ(), 0, false)
    }

    var target_west = World.getBlock(target_pos.west().getX(), target_pos.west().getY(), target_pos.west().getZ())
    if (target_west.getName().getString().includes("Door") && target.getBlockState()["open"] != target_west.getBlockState()["open"]){
        Player.getInteractionManager().interactBlock(target_west.getX(), target_west.getY(), target_west.getZ(), 0, false).getTargetedBlock()
    }
    
}





    
