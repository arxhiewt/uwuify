// COPY COMMAND BUTTONS
function copyCommand(cmd){
    navigator.clipboard.writeText(cmd);
    alert("Copied: " + cmd);
}

// CHAT DEMO LOGIC
const chatOutput = document.getElementById('chat-output');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const uwuBtnContainer = document.getElementById('uwuify-btn-container');
const runBtn = document.getElementById('run-command');

let demoStage = 0;

function getTimeStamp(){
    const d = new Date();
    return d.getHours().toString().padStart(2,'0') + ":" +
           d.getMinutes().toString().padStart(2,'0');
}

function addMessage(author, text, type){
    let p = document.createElement('p');

    if(type === 'system') p.className = 'system-msg';
    else if(type === 'uwu') p.className = 'uwu-msg';
    else if(type === 'user') p.className = 'user-msg';
    else if(type === 'npc') p.className = 'npc-msg';

    p.innerHTML = `<b>${author}:</b> ${text} <span class="timestamp">${getTimeStamp()}</span>`;

    chatOutput.appendChild(p);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

// TYPING INDICATOR
function addTyping(author){
    let p = document.createElement('p');
    p.className = 'npc-msg';
    p.id = 'typing';

    p.innerHTML = `
        <b>${author}:</b>
        <span class="typing-dots">
            <span></span><span></span><span></span>
        </span>
    `;

    chatOutput.appendChild(p);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}

function removeTyping(){
    let t = document.getElementById('typing');
    if(t) t.remove();
}

// SEND MESSAGE
sendBtn.addEventListener('click', () => {
    let msg = chatInput.value.trim();
    if(!msg) return;

    // STAGE 0
    if(demoStage === 0){
        addMessage("You", msg, "user");
        chatInput.value = "";
        demoStage = 1;

        setTimeout(() => {
            addTyping("CoolEthan133");

            setTimeout(() => {
                removeTyping();
                addMessage("CoolEthan133", "Hey, how are you?", "npc");
                uwuBtnContainer.style.display = "block";
                demoStage = 2;
            }, 1200);

        }, 600);
        return;
    }

    // STAGE 2 (uwuify demo)
    if(demoStage === 2){
        if(msg.includes("/uwuify CoolEthan133")){
            addMessage("You", "/uwuify CoolEthan133", "user");
            chatInput.value = "";
            uwuBtnContainer.style.display = "none";
            demoStage = 3;

            setTimeout(() => {
                addTyping("CoolEthan133");

                setTimeout(() => {
                    removeTyping();
                    addMessage("CoolEthan133", "w-watt is that (づ￣ ³￣)づ", "uwu");
                }, 2000);

            }, 500);

            setTimeout(() => {
                addTyping("CoolEthan133");

                setTimeout(() => {
                    removeTyping();
                    addMessage("CoolEthan133", "thats s-o kool! owo'", "uwu");
                }, 2000);

            }, 3000);

            setTimeout(() => {
                addTyping("alexson67");

                setTimeout(() => {
                    removeTyping();
                    addMessage("alexson67", "LMAOO", "npc");
                    demoStage = 4;
                }, 2000);

            }, 5500);

        } else {
            addMessage("You", msg, "user");
            chatInput.value = "";
        }
        return;
    }

    // DEFAULT
    addMessage("You", msg, "user");
    chatInput.value = "";
});

// BUTTON AUTO FILL
runBtn.addEventListener('click', () => {
    chatInput.value = "/uwuify CoolEthan133";
    chatInput.focus();
});
