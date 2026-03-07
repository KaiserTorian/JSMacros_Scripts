var ignoreBlocksName = "jsIgnoreBlocks";
onRegisterCommands();
function onRegisterCommands() {
    // IgnoreBlocks script
    var ignoreBlocks = Chat.getCommandManager().createCommandBuilder(ignoreBlocksName);
    ignoreBlocks.booleanArg("Activate").executes(JavaWrapper.methodToJava(jsIgnoreBlocks));
    ignoreBlocks.register();
}
function jsIgnoreBlocks(args) {
    args = String(args.getInput()).split(" ");
    var activate = parseBool(args[1]);
    GlobalVars.putBoolean(ignoreBlocksName, activate);
    GlobalVars.getBoolean(ignoreBlocksName);
    //Toasts look like Dedrock edition lol
    if (activate) {
        Chat.toast(" jsIgnoreBlocks", " Is now active");
    }
    else {
        Chat.toast(" jsIgnoreBlocks", " Is now inactive");
    }
}
// we need that shit coause args is a list of strings 
function parseBool(str) {
    if (str === "true") {
        return true;
    }
    if (str === "false") {
        return false;
    }
    throw "Invalid boolean: " + str;
}
