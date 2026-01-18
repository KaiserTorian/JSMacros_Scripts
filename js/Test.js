// let entityHelper = Reflection.getClass("xyz.wagyourtail.jsmacros.client.api.helper.world.entity.EntityHelper")
// let funcNames = Object.getOwnPropertyNames(entityHelper)
// Reflection.getMethod(entityHelper,"create",Entity)
// for (let i = 0; i < funcNames.length; i++){
//     Chat.log(funcNames[i])
// }
// Chat.log(entityHelper)
// let cam: EntityHelper = entityHelper.create(Client.getMinecraft().method_1560())
var blockPos = Client.getMinecraft().field_1765.method_17777();
var blockPosX = blockPos.method_10263();
var blockPosY = blockPos.method_10264();
var blockPosZ = blockPos.method_10260();
Chat.log(World.getBlock(blockPosX, blockPosY, blockPosZ));
