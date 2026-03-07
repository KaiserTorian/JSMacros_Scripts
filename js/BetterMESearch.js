const gv_presed_keys = "BME_presed_keys"
let inv


if (World.isWorldLoaded()) {
    inv = Player.openInventory()
    init_gv()
    betterMESearch()
    MESearchAnvil()
}


// I dont know if this is necessary
function init_gv() {
    if (GlobalVars.getType(gv_presed_keys) == null){
        GlobalVars.putString(gv_presed_keys, "")
    }
}




function betterMESearch() {
    if (inv.getContainerTitle().toString() != "ES Terminal") {return}
    if (inv.getSlot(49).getName().getString() != "Suche (Englische Begriffe)") {return}

    let keys = Array.from(KeyBind.getPressedKeys())
    let presed_keys = ""

    for (let i = 0; i < keys.length; i++) {
        if (keys[i].match("^key\\.keyboard\\.\\w$") != null){
            presed_keys = keys[i]
        }
    }

    if (presed_keys == "") {return}

    GlobalVars.putString(gv_presed_keys, presed_keys)    
    inv.click(49, 1)

}



function MESearchAnvil() {
    if (inv.getContainerTitle().toString() != "Repair & Name") {return}
    let presed_keys = GlobalVars.getString(gv_presed_keys)
    
    if (presed_keys != ""){
        let text_fields = Hud.getOpenScreen().getTextFields()
        text_fields[0].setText(presed_keys.toString().replace("key.keyboard.",""))
        GlobalVars.putString(gv_presed_keys, "")
    }

    let keys = KeyBind.getPressedKeys()
    if (keys.contains("key.keyboard.enter"))
    {
        inv.click(2, 1)
    }
}