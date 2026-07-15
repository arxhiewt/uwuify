/* ===========================
   ELEMENT REFS
=========================== */

const topBanner = document.getElementById('top-banner');
const bannerClose = document.getElementById('banner-close');

const hamburger = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

const chatOutput = document.getElementById('chat-output');
const chatInput = document.getElementById('chat-input');
const sendBtn = document.getElementById('send-btn');
const uwuBtnContainer = document.getElementById('uwuify-btn-container');
const runBtn = document.getElementById('run-command');

const toast = document.getElementById('toast');

/* ===========================
   TOP BANNER
=========================== */

bannerClose.addEventListener('click', () => {
  topBanner.style.display = 'none';
});

/* ===========================
   MOBILE MENU
=========================== */

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.classList.toggle('open', isOpen);
  hamburger.setAttribute('aria-expanded', isOpen ? 'true' : 'false');
});

mobileMenu.querySelectorAll('a').forEach((link) => {
  link.addEventListener('click', () => {
    mobileMenu.classList.remove('open');
    hamburger.classList.remove('open');
    hamburger.setAttribute('aria-expanded', 'false');
  });
});

/* ===========================
   TOAST
=========================== */

let toastTimer = null;

function showToast(message) {
  toast.textContent = message;
  toast.classList.add('show');
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => toast.classList.remove('show'), 1800);
}

/* ===========================
   COPY COMMAND BUTTONS
=========================== */

document.querySelectorAll('.copy-btn').forEach((btn) => {
  btn.addEventListener('click', async () => {
    const cmd = btn.getAttribute('data-cmd');
    try {
      await navigator.clipboard.writeText(cmd);
      showToast('Copied: ' + cmd);
    } catch (err) {
      showToast('Could not copy — select the text manually');
    }
  });
});

/* ===========================
   DISCORD CHAT DEMO
=========================== */

function getTimeStamp() {
  const d = new Date();
  return d.getHours().toString().padStart(2, '0') + ':' + d.getMinutes().toString().padStart(2, '0');
}

function escapeHtml(str) {
  return str.replace(/[&<>"']/g, (ch) => ({
    '&': '&amp;', '<': '&lt;', '>': '&gt;', '"': '&quot;', "'": '&#39;'
  }[ch]));
}

function personKey(author) {
  if (author === 'You') return 'you';
  if (author === 'CoolEthan133') return 'ethan';
  if (author === 'alexson67') return 'alex';
  return 'ethan';
}

function addMessage(author, text, opts = {}) {
  const { uwu = false, cmd = false } = opts;
  const key = personKey(author);

  const row = document.createElement('div');
  row.className = 'dw-msg';
  row.innerHTML = `
    <div class="dw-msg-avatar avatar-${key}">${escapeHtml(author.charAt(0).toUpperCase())}</div>
    <div class="dw-msg-body">
      <div class="dw-msg-header">
        <span class="dw-msg-name name-${key}">${escapeHtml(author)}</span>
        <span class="dw-msg-time">${getTimeStamp()}</span>
      </div>
      <div class="dw-msg-text${uwu ? ' text-uwu' : ''}${cmd ? ' text-cmd' : ''}">${escapeHtml(text)}</div>
    </div>
  `;

  chatOutput.appendChild(row);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

function addTyping(author) {
  const key = personKey(author);
  const row = document.createElement('div');
  row.className = 'dw-typing';
  row.id = 'typing';
  row.innerHTML = `
    <span class="dw-msg-name name-${key}">${escapeHtml(author)}</span>
    <span class="dw-typing-dots"><span></span><span></span><span></span></span>
  `;
  chatOutput.appendChild(row);
  chatOutput.scrollTop = chatOutput.scrollHeight;
}

function removeTyping() {
  const typing = document.getElementById('typing');
  if (typing) typing.remove();
}

let demoStage = 0;

function handleSend() {
  const msg = chatInput.value.trim();
  if (!msg) return;

  /* STAGE 0 — first message from the visitor kicks off the demo */
  if (demoStage === 0) {
    addMessage('You', msg);
    chatInput.value = '';
    demoStage = 1;

    setTimeout(() => {
      addTyping('CoolEthan133');
      setTimeout(() => {
        removeTyping();
        addMessage('CoolEthan133', 'Hey, how are you?');
        uwuBtnContainer.style.display = 'flex';
        demoStage = 2;
      }, 1100);
    }, 500);

    return;
  }

  /* STAGE 2 — waiting for the /uwuify command */
  if (demoStage === 2) {
    if (msg.toLowerCase().includes('/uwuify')) {
      addMessage('You', '/uwuify CoolEthan133', { cmd: true });
      chatInput.value = '';
      uwuBtnContainer.style.display = 'none';
      demoStage = 3;

      setTimeout(() => {
        addTyping('CoolEthan133');
        setTimeout(() => {
          removeTyping();
          addMessage('CoolEthan133', 'w-watt is that (づ￣ ³￣)づ', { uwu: true });
        }, 1600);
      }, 500);

      setTimeout(() => {
        addTyping('CoolEthan133');
        setTimeout(() => {
          removeTyping();
          addMessage('CoolEthan133', 'thats s-so kool!! owo', { uwu: true });
        }, 1600);
      }, 2900);

      setTimeout(() => {
        addTyping('alexson67');
        setTimeout(() => {
          removeTyping();
          addMessage('alexson67', 'LMAOO 😭');
          demoStage = 4;
        }, 1500);
      }, 5000);

      return;
    }

    addMessage('You', msg);
    chatInput.value = '';
    return;
  }

  /* DEFAULT — demo finished, just echo further messages */
  addMessage('You', msg);
  chatInput.value = '';
}

sendBtn.addEventListener('click', handleSend);
chatInput.addEventListener('keypress', (e) => {
  if (e.key === 'Enter') handleSend();
});

runBtn.addEventListener('click', () => {
  chatInput.value = '/uwuify CoolEthan133';
  chatInput.focus();
});

/* ===========================
   SCROLL REVEAL
=========================== */

const revealSections = document.querySelectorAll('.reveal');

const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

revealSections.forEach((section) => revealObserver.observe(section));
