var chat_list = {
    "/backpack": "key.keyboard.v",
    "/edenstorage restock": "key.keyboard.x",
};
for (var _i = 0, _a = Object.entries(chat_list); _i < _a.length; _i++) {
    var _b = _a[_i], command = _b[0], key = _b[1];
    if (KeyBind.getPressedKeys().contains(key)) {
        Chat.say(command);
    }
}
