const gv_presed_keys = "BME_presed_keys"
var inv = Player.openInventory()


init_gv()
// I dont know if this is necessary
function init_gv() {
    if (GlobalVars.getType(gv_presed_keys) == null){
        GlobalVars.putString(gv_presed_keys, "")
    }
}



betterMESearch()
function betterMESearch() {
    if (inv.getContainerTitle().toString() != "ES Terminal") {return}
    if (inv.getSlot(49).getName().getString() != "Suche (Englische Begriffe)") {return}

    var keys = Array.from(KeyBind.getPressedKeys())
    var presed_keys = ""

    for (var i = 0; i < keys.length; i++) {
        if (is_input_correct(keys[i])){
            presed_keys = keys[i]
        }
    }

    if (presed_keys == "") {return}

    GlobalVars.putString(gv_presed_keys, presed_keys)    
    inv.click(49, 1)

}


MESearchAnvil()
function MESearchAnvil() {
    if (inv.getContainerTitle().toString() != "Repair & Name") {return}
    var presed_keys = GlobalVars.getString(gv_presed_keys)
    
    if (presed_keys != ""){
        var text_fields = Hud.getOpenScreen().getTextFields()
        text_fields[0].setText(presed_keys.toString().replace("key.keyboard.",""))
        GlobalVars.putString(gv_presed_keys, "")
    }

    var keys = KeyBind.getPressedKeys()
    if (keys.contains("key.keyboard.enter"))
    {
        inv.click(2, 1)
    }
}



function is_input_correct(input) {
    if (input.startsWith("key.keyboard.") && (
        input.endsWith(".a") ||
        input.endsWith(".b") ||
        input.endsWith(".c") ||
        input.endsWith(".d") ||
        input.endsWith(".e") ||
        input.endsWith(".f") ||
        input.endsWith(".g") ||
        input.endsWith(".h") ||
        input.endsWith(".i") ||
        input.endsWith(".j") ||
        input.endsWith(".k") ||
        input.endsWith(".l") ||
        input.endsWith(".m") ||
        input.endsWith(".n") ||
        input.endsWith(".o") ||
        input.endsWith(".p") ||
        input.endsWith(".q") ||
        input.endsWith(".r") ||
        input.endsWith(".s") ||
        input.endsWith(".t") ||
        input.endsWith(".u") ||
        input.endsWith(".v") ||
        input.endsWith(".w") ||
        input.endsWith(".x") ||
        input.endsWith(".y") ||
        input.endsWith(".z"))
        

    ) {return true}
    return false
}