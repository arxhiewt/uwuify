// COPY COMMAND BUTTONS
function copyCommand(cmd){
    navigator.clipboard.writeText(cmd);
    alert("Copied: " + cmd);
}

// CHAT DEMO LOGIC
const chatOutput = document.getElementById('chat-output');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const runBtn = document.getElementById('run-command');

let demoActive = false;

function uwuify(msg){
    return msg.replace(/r|l/g,"w").replace(/R|L/g,"W").replace(/no/g,"nu").replace(/has/g,"haz")+" uwu";
}

// Run /uwuify command
runBtn.addEventListener('click',()=>{
    if(!demoActive){
        demoActive = true;
        chatInput.disabled = false;
        sendBtn.disabled = false;
        addMessage("System","CoolEthan133 was uwuified for 10 minutes!","system");
    }
});

sendBtn.addEventListener('click',()=>{
    let msg = chatInput.value.trim();
    if(!msg) return;
    addMessage("CoolEthan133", uwuify(msg),"uwu");
    chatInput.value = "";
});

// Helper to add message
function addMessage(author,text,type){
    let p = document.createElement('p');
    if(type==='system') p.className='system-msg';
    else if(type==='uwu') p.className='uwu-msg';
    else p.className='user-msg';
    p.innerHTML = `<b>${author}:</b> ${text}`;
    chatOutput.appendChild(p);
    chatOutput.scrollTop = chatOutput.scrollHeight;
}
