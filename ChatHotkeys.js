

const chat_list = { "/backpack" : "key.keyboard.v", }

for (const [command, key] of Object.entries(chat_list)) {
    if (KeyBind.getPressedKeys().contains(key)) {
        Chat.say(command)
    }
}


