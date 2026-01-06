// Hotkey //

for (var i = 0; i < 46; i++) {
    var inv = Player.openInventory()
    var item = Player.openInventory().getSlot(i)

    if (item.getName().getString() == "Wireless Terminal") {

        if (i != 44) { inv.swapHotbar(i, 8) }

        var last_slot = inv.getSelectedHotbarSlotIndex()
        inv.setSelectedHotbarSlotIndex(8)
        Time.sleep(50)
        Player.getInteractionManager().interact()
        Time.sleep(100)
        inv.setSelectedHotbarSlotIndex(last_slot) 
    }
    
}

