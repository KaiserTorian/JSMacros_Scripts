

betterChat()    
function betterChat(){
    const chatHistory: ChatHistoryManager = Chat.getHistory()
    const chatHistoryList: ChatHudLineHelper[] = chatHistory.getRecvLines().toArray()
    
    Chat.log(chatHistoryList.length)
    for (let i = 0; i < chatHistoryList.length; i++){
        const msg: ChatHudLineHelper = chatHistoryList[i]
        Chat.log(String(msg) + " int: " + String(i) + " Size: " + String(chatHistoryList.length))
    }
}





// const globSendMsg = "BetterChat_SendMsg"

// JsMacros.disableAllListeners("RecvMessage") 
// JsMacros.on("RecvMessage", JavaWrapper.methodToJava(checkMessage));
// Chat.log("Du HUND");


// function checkMessage(event: Events.RecvMessage, container: EventContainer): void {
//     event.cancel() // Friendship with original message ended

//     if (event.text.toString().includes(GlobalVars.getString(globSendMsg))) {return}


//     const rawMessage = event.text.getJson()
//     chatOutput(rawMessage)
//     Time.sleep(100)
//     chatOutput(String(GlobalVars.getString(globSendMsg)))
//     // JsMacros.disableAllListeners("RecvMessage")  
// }


// function chatOutput(fMessage: string):void {

//     // Pls don't loop
//     // if (fMessage.includes(GlobalVars.getString(globSendMsg))) {return}
//     GlobalVars.putString(globSendMsg,fMessage)

//     Chat.log(fMessage)
    

// }



// let root = event.text;

// // 1️⃣ Rekursiv alle TextComponents sammeln
// function flatten(component, list = []) {
//         if (!component) return list;

//         if (component.text && component.text.trim() !== "") {
//             list.push(component);
//         }

//         if (component.extra) {
//             component.extra.forEach(e => flatten(e, list));
//         }

//         return list;
//     }

//     let parts = flatten(root);

//     // 2️⃣ Spielernamen finden (erstes farbiges Wort ohne Sonderzeichen)
//     let nameIndex = parts.findIndex(p =>
//         p.color &&
//         /^[A-Za-z0-9_]{3,16}$/.test(p.text)
//     );

//     if (nameIndex === -1) {
//         // Fallback: alles anzeigen
//         Chat.log(root);
//         return;
//     }

//     let namePart = parts[nameIndex];

//     // 3️⃣ Nachricht zusammensetzen (alles nach dem :)
//     let messageText = "";
//     let afterColon = false;

//     for (let p of parts.slice(nameIndex + 1)) {
//         if (p.text.includes(":")) {
//             afterColon = true;
//             messageText += p.text.replace(":", "").trimStart();
//             continue;
//         }
//         if (afterColon) {
//             messageText += p.text;
//         }
//     }

//     // 4️⃣ Neuen Chat bauen
//     let newMsg = {
//         text: "",
//         extra: [
//             {
//                 text: namePart.text,
//                 color: namePart.color
//             },
//             {
//                 text: ":",
//                 color: "gray",
//                 bold: true
//             },
//             {
//                 text: " " + messageText,
//                 color: "white"
//             }
//         ]
//     };

//     // 5️⃣ Anzeigen
// Chat.log(newMsg);