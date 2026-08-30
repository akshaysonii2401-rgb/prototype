/* =========================================================================
   OPTION TREE — edit this to define your own categories / sub-options.
   Each node is either:
     { label: "...", children: [ ...nodes ] }   -> shows more buttons
     { label: "...", prompt: "..." }             -> sends `prompt` to the bot
   `prompt` is the instruction actually sent to the AI when this leaf is
   clicked, so it can be more detailed than the button label if you want.
   ========================================================================= */
const OPTION_TREE = {
  label: "root",
  children: [
    {
      label: "Python help",
      children: [
        { label: "Debug my code", prompt: "I need help debugging a Python script. Ask me to paste the code and the error." },
        { label: "Explain a concept", prompt: "I'd like a clear explanation of a Python concept. Ask me which one." },
        { label: "Write a script", prompt: "I need a Python script written for a specific task. Ask me what it should do." }
      ]
    },
    {
      label: "Web development",
      children: [
        { label: "Frontend (HTML/CSS/JS)", prompt: "I need help with frontend web development. Ask what I'm building." },
        { label: "Backend / APIs", prompt: "I need help with backend development or building an API. Ask what stack I'm using." },
        { label: "Bug in my site", prompt: "My website has a bug. Ask me to describe the issue and share relevant code." }
      ]
    },
    {
      label: "Data & AI/ML",
      children: [
        { label: "Data analysis", prompt: "I want help analyzing a dataset. Ask what the data looks like and what I want to learn from it." },
        { label: "ML model help", prompt: "I need help with a machine learning model. Ask what problem I'm solving and what I've tried." }
      ]
    },
    {
      label: "Business / general",
      children: [
        { label: "Write or edit text", prompt: "I need help writing or editing a piece of text. Ask what it's for." },
        { label: "Something else", prompt: "Ask me what I need help with today, in an open and friendly way." }
      ]
    }
  ]
};

/* ========================= State & persistence ========================= */
let sessions = {};      // id -> {id, title, createdAt, messages:[{role, content}]}
let sessionOrder = [];  // ids, most recent first
let currentId = null;
let currentNode = OPTION_TREE;   // where we are in the option tree for the active chat
let navPath = [];        // labels for breadcrumb context sent to the model

const INDEX_KEY = "session-index";

async function loadIndex(){
  try{
    const res = await window.storage.get(INDEX_KEY, false);
    return res && res.value ? JSON.parse(res.value) : [];
  }catch(e){ return []; }
}
async function saveIndex(){
  await window.storage.set(INDEX_KEY, JSON.stringify(sessionOrder), false);
}
async function loadSession(id){
  try{
    const res = await window.storage.get("session:"+id, false);
    return res && res.value ? JSON.parse(res.value) : null;
  }catch(e){ return null; }
}
async function saveSession(session){
  await window.storage.set("session:"+session.id, JSON.stringify(session), false);
}
async function deleteSessionStorage(id){
  try{ await window.storage.delete("session:"+id, false); }catch(e){}
}

/* ============================== DOM refs ================================ */
const chatListEl = document.getElementById("chat-list");
const threadEl = document.getElementById("thread");
const scrollArea = document.getElementById("scroll-area");
const emptyState = document.getElementById("empty-state");
const chatTitleEl = document.getElementById("chat-title");
const chatSubtitleEl = document.getElementById("chat-subtitle");
const inputEl = document.getElementById("msg-input");
const sendBtn = document.getElementById("send-btn");

/* ============================== Rendering ================================ */
function renderSidebar(){
  chatListEl.innerHTML = "";
  sessionOrder.forEach(id=>{
    const s = sessions[id];
    if(!s) return;
    const item = document.createElement("div");
    item.className = "chat-item" + (id===currentId ? " active":"");
    item.innerHTML = `<span>${escapeHtml(s.title)}</span><button class="del-btn" title="Delete">&times;</button>`;
    item.addEventListener("click",(e)=>{
      if(e.target.closest(".del-btn")) return;
      openSession(id);
    });
    item.querySelector(".del-btn").addEventListener("click", async (e)=>{
      e.stopPropagation();
      delete sessions[id];
      sessionOrder = sessionOrder.filter(x=>x!==id);
      await deleteSessionStorage(id);
      await saveIndex();
      if(currentId===id){ startNewChat(false); }
      renderSidebar();
    });
    chatListEl.appendChild(item);
  });
}

function escapeHtml(str){
  const d = document.createElement("div");
  d.textContent = str;
  return d.innerHTML;
}

function renderThread(){
  const s = sessions[currentId];
  threadEl.innerHTML = "";
  if(!s || s.messages.length===0){
    emptyState.style.display = "block";
  } else {
    emptyState.style.display = "none";
    s.messages.forEach(m=>{
      threadEl.appendChild(buildMsgRow(m.role, m.content));
    });
  }
  renderOptionsIfAny();
  scrollToBottom();
}

function buildMsgRow(role, content){
  const row = document.createElement("div");
  row.className = "msg-row " + (role==="user" ? "user":"bot");
  const av = document.createElement("div");
  av.className = "avatar " + (role==="user" ? "user":"bot");
  av.textContent = role==="user" ? "You" : "A";
  const bubble = document.createElement("div");
  bubble.className = "bubble";
  bubble.textContent = content;
  row.appendChild(av);
  row.appendChild(bubble);
  return row;
}

function renderOptionsIfAny(){
  const existing = threadEl.querySelector(".option-panel");
  if(existing) existing.remove();
  if(!currentNode || !currentNode.children) return;
  const panel = document.createElement("div");
  panel.className = "option-panel";
  panel.style.marginLeft = "42px";
  currentNode.children.forEach(node=>{
    const btn = document.createElement("button");
    btn.className = "option-btn";
    btn.textContent = node.label;
    btn.addEventListener("click", ()=>selectOption(node));
    panel.appendChild(btn);
  });
  if(navPath.length>0){
    const back = document.createElement("button");
    back.className = "option-btn back";
    back.textContent = "← Back";
    back.addEventListener("click", goBack);
    panel.appendChild(back);
  }
  threadEl.appendChild(panel);
  scrollToBottom();
}

function scrollToBottom(){
  requestAnimationFrame(()=>{ scrollArea.scrollTop = scrollArea.scrollHeight; });
}

/* ============================== Session mgmt ============================= */
function newId(){ return "c_" + Date.now() + "_" + Math.random().toString(36).slice(2,8); }

async function startNewChat(persist=true){
  const s = { id: newId(), title: "New chat", createdAt: Date.now(), messages: [] };
  sessions[s.id] = s;
  sessionOrder.unshift(s.id);
  currentId = s.id;
  currentNode = OPTION_TREE;
  navPath = [];
  chatTitleEl.textContent = "New chat";
  chatSubtitleEl.textContent = "Pick a topic to get started, or just type below.";
  renderSidebar();
  renderThread();
  if(persist){ await saveSession(s); await saveIndex(); }
}

function openSession(id){
  const s = sessions[id];
  if(!s) return;
  currentId = id;
  currentNode = OPTION_TREE;
  navPath = [];
  chatTitleEl.textContent = s.title;
  chatSubtitleEl.textContent = s.messages.length ? "Continuing this conversation." : "Pick a topic to get started, or just type below.";
  renderSidebar();
  renderThread();
}

async function selectOption(node){
  navPath.push(node.label);
  if(node.children){
    currentNode = node;
    renderOptionsIfAny();
    return;
  }
  // leaf node -> treat the label as a user-visible action, prompt as the hidden instruction
  currentNode = null;
  await addUserMessage(node.label, node.prompt);
}

function goBack(){
  navPath.pop();
  // walk from root again for the remaining path
  let node = OPTION_TREE;
  for(const label of navPath){
    node = node.children.find(c=>c.label===label);
  }
  currentNode = node;
  renderOptionsIfAny();
}

/* ============================== Messaging ================================ */
async function addUserMessage(displayText, hiddenPrompt){
  const s = sessions[currentId];
  s.messages.push({ role:"user", content: displayText });
  if(s.messages.length===1){
    s.title = displayText.length>40 ? displayText.slice(0,40)+"…" : displayText;
    chatTitleEl.textContent = s.title;
  }
  await saveSession(s);
  renderSidebar();
  renderThread();
  await requestBotReply(hiddenPrompt || displayText);
}

function setTyping(on){
  const existing = document.getElementById("typing-row");
  if(existing) existing.remove();
  if(on){
    const row = buildMsgRow("bot","Thinking...");
    row.id = "typing-row";
    row.classList.add("typing");
    threadEl.appendChild(row);
    scrollToBottom();
  }
}

async function requestBotReply(userText){
  setTyping(true);
  const s = sessions[currentId];
  const history = s.messages.slice(-12).map(m=>({ role: m.role, content: m.content }));

  try{
    const response = await fetch("https://api.anthropic.com/v1/messages", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        model: "claude-sonnet-4-6",
        max_tokens: 1000,
        system: "You are Assist, a helpful, professional assistant embedded in a company chat widget. Be concise, warm, and practical. If the incoming message describes a menu selection the user made (rather than their own words), respond as if you were kicking off that conversation naturally — greet briefly and ask the one clarifying question needed to help.",
        messages: history
      })
    });
    const data = await response.json();
    const textBlock = (data.content || []).find(b=>b.type==="text");
    const reply = textBlock ? textBlock.text : "Sorry, I couldn't generate a response just now.";
    setTyping(false);
    s.messages.push({ role:"assistant", content: reply });
    await saveSession(s);
    renderThread();
  }catch(err){
    setTyping(false);
    s.messages.push({ role:"assistant", content: "Something went wrong reaching the assistant. Please try again." });
    await saveSession(s);
    renderThread();
  }
}

/* ============================== Input handlers ============================ */
function autoGrow(){
  inputEl.style.height = "auto";
  inputEl.style.height = Math.min(inputEl.scrollHeight, 140) + "px";
}
inputEl.addEventListener("input", autoGrow);
inputEl.addEventListener("keydown",(e)=>{
  if(e.key==="Enter" && !e.shiftKey){
    e.preventDefault();
    handleSend();
  }
});
sendBtn.addEventListener("click", handleSend);

async function handleSend(){
  const text = inputEl.value.trim();
  if(!text) return;
  inputEl.value = "";
  autoGrow();
  currentNode = null; // free typing exits the menu flow
  await addUserMessage(text, text);
}

document.getElementById("new-chat-btn").addEventListener("click", ()=>startNewChat(true));

/* ============================== Boot ===================================== */
async function boot(){
  sessionOrder = await loadIndex();
  for(const id of sessionOrder){
    const s = await loadSession(id);
    if(s) sessions[id] = s;
  }
  sessionOrder = sessionOrder.filter(id=>sessions[id]);

  if(sessionOrder.length>0){
    openSession(sessionOrder[0]);
  } else {
    await startNewChat(true);
  }
}
boot();
