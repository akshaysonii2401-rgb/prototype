:root{
  --bg-0:#0F1115;
  --bg-1:#161922;
  --bg-2:#1D212C;
  --bg-3:#262B38;
  --border:#2C3140;
  --border-soft:#22262F;
  --text-1:#F3F4F6;
  --text-2:#A7ACB9;
  --text-3:#6C7280;
  --accent:#6C8CFF;
  --accent-dim:#3A4A8A;
  --accent-text:#DCE4FF;
  --user-bubble:#2A3550;
  --radius:10px;
}
*{box-sizing:border-box;}
html,body{height:100%;}
body{
  margin:0;
  background:var(--bg-0);
  color:var(--text-1);
  font-family:'Inter',sans-serif;
  display:flex;
  overflow:hidden;
}
h1,h2,h3,.brand,.opt-title{font-family:'Sora',sans-serif;}

/* ---------- Sidebar ---------- */
#sidebar{
  width:280px;
  min-width:280px;
  background:var(--bg-1);
  border-right:1px solid var(--border-soft);
  display:flex;
  flex-direction:column;
  height:100vh;
}
.brand{
  padding:20px 18px 14px;
  font-size:17px;
  font-weight:700;
  letter-spacing:0.2px;
  color:var(--text-1);
  display:flex;
  align-items:center;
  gap:10px;
  border-bottom:1px solid var(--border-soft);
}
.brand-dot{
  width:9px;height:9px;border-radius:50%;
  background:var(--accent);
  box-shadow:0 0 0 3px rgba(108,140,255,0.15);
}
#new-chat-btn{
  margin:14px 16px 8px;
  padding:10px 14px;
  background:var(--bg-3);
  border:1px solid var(--border);
  color:var(--text-1);
  border-radius:var(--radius);
  font-size:13.5px;
  font-weight:500;
  cursor:pointer;
  display:flex;
  align-items:center;
  gap:8px;
  transition:background .15s ease, border-color .15s ease;
}
#new-chat-btn:hover{background:#2C3140;border-color:#3A4152;}
#new-chat-btn svg{flex-shrink:0;}

#history-label{
  padding:14px 18px 6px;
  font-size:11px;
  text-transform:uppercase;
  letter-spacing:0.08em;
  color:var(--text-3);
  font-weight:600;
}
#chat-list{
  flex:1;
  overflow-y:auto;
  padding:0 10px 10px;
}
.chat-item{
  padding:10px 12px;
  border-radius:8px;
  font-size:13.5px;
  color:var(--text-2);
  cursor:pointer;
  margin-bottom:2px;
  white-space:nowrap;
  overflow:hidden;
  text-overflow:ellipsis;
  display:flex;
  align-items:center;
  justify-content:space-between;
  gap:6px;
  transition:background .12s ease;
}
.chat-item:hover{background:var(--bg-2);color:var(--text-1);}
.chat-item.active{background:var(--bg-3);color:var(--text-1);}
.chat-item .del-btn{
  opacity:0;
  background:none;border:none;color:var(--text-3);
  cursor:pointer;font-size:15px;line-height:1;padding:2px 4px;border-radius:4px;
  flex-shrink:0;
}
.chat-item:hover .del-btn{opacity:1;}
.chat-item .del-btn:hover{color:#F16C6C;background:rgba(241,108,108,0.1);}

#sidebar-footer{
  padding:14px 18px;
  border-top:1px solid var(--border-soft);
  font-size:11.5px;
  color:var(--text-3);
}

/* ---------- Main ---------- */
#main{
  flex:1;
  display:flex;
  flex-direction:column;
  height:100vh;
  min-width:0;
}
#topbar{
  padding:16px 28px;
  border-bottom:1px solid var(--border-soft);
  display:flex;
  align-items:center;
  justify-content:space-between;
}
#chat-title{
  font-size:15px;
  font-weight:600;
  color:var(--text-1);
}
#chat-subtitle{
  font-size:12px;
  color:var(--text-3);
  margin-top:2px;
}
#status-pill{
  font-size:11.5px;
  color:var(--text-2);
  background:var(--bg-2);
  border:1px solid var(--border-soft);
  padding:5px 11px;
  border-radius:20px;
  display:flex;
  align-items:center;
  gap:6px;
}
#status-pill .dot{width:6px;height:6px;border-radius:50%;background:#54D18C;}

#scroll-area{
  flex:1;
  overflow-y:auto;
  padding:28px 0 10px;
}
#thread{
  max-width:760px;
  margin:0 auto;
  padding:0 28px 20px;
}

.msg-row{
  display:flex;
  margin-bottom:22px;
  gap:12px;
}
.msg-row.user{flex-direction:row-reverse;}
.avatar{
  width:30px;height:30px;border-radius:8px;
  flex-shrink:0;
  display:flex;align-items:center;justify-content:center;
  font-size:12px;font-weight:700;
  font-family:'Sora',sans-serif;
}
.avatar.bot{background:var(--accent-dim);color:var(--accent-text);}
.avatar.user{background:var(--bg-3);color:var(--text-2);border:1px solid var(--border);}

.bubble{
  max-width:78%;
  padding:12px 15px;
  border-radius:var(--radius);
  font-size:14.5px;
  line-height:1.6;
  white-space:pre-wrap;
}
.bot .bubble{background:var(--bg-2);border:1px solid var(--border-soft);color:var(--text-1);border-top-left-radius:3px;}
.user .bubble{background:var(--user-bubble);color:#EAEDFB;border-top-right-radius:3px;}

.typing .bubble{color:var(--text-3);font-style:italic;}

/* option chips */
.option-panel{
  max-width:78%;
  margin-top:10px;
  display:flex;
  flex-wrap:wrap;
  gap:8px;
}
.option-btn{
  background:var(--bg-2);
  border:1px solid var(--border);
  color:var(--text-1);
  padding:9px 14px;
  border-radius:8px;
  font-size:13.5px;
  font-family:'Inter',sans-serif;
  cursor:pointer;
  transition:border-color .15s ease, background .15s ease, transform .1s ease;
}
.option-btn:hover{border-color:var(--accent);background:var(--bg-3);}
.option-btn:active{transform:scale(0.98);}
.option-btn.back{color:var(--text-3);border-style:dashed;}

/* ---------- Composer ---------- */
#composer-wrap{
  padding:16px 28px 22px;
  border-top:1px solid var(--border-soft);
}
#composer{
  max-width:760px;
  margin:0 auto;
  display:flex;
  align-items:flex-end;
  gap:10px;
  background:var(--bg-2);
  border:1px solid var(--border);
  border-radius:12px;
  padding:8px 8px 8px 16px;
}
#composer:focus-within{border-color:var(--accent);}
#msg-input{
  flex:1;
  background:none;
  border:none;
  outline:none;
  resize:none;
  color:var(--text-1);
  font-family:'Inter',sans-serif;
  font-size:14.5px;
  line-height:1.5;
  max-height:140px;
  padding:8px 0;
}
#msg-input::placeholder{color:var(--text-3);}
#send-btn{
  background:var(--accent);
  border:none;
  color:#10131C;
  width:36px;height:36px;
  border-radius:8px;
  display:flex;align-items:center;justify-content:center;
  cursor:pointer;
  flex-shrink:0;
  transition:opacity .15s ease;
}
#send-btn:disabled{opacity:0.4;cursor:default;}
#composer-hint{
  max-width:760px;
  margin:8px auto 0;
  font-size:11.5px;
  color:var(--text-3);
  text-align:center;
}

/* scrollbars */
#chat-list::-webkit-scrollbar,#scroll-area::-webkit-scrollbar{width:7px;}
#chat-list::-webkit-scrollbar-thumb,#scroll-area::-webkit-scrollbar-thumb{background:var(--bg-3);border-radius:10px;}

/* empty state */
#empty-state{
  max-width:520px;
  margin:8vh auto 0;
  text-align:center;
  padding:0 20px;
}
#empty-state .icon-wrap{
  width:52px;height:52px;border-radius:14px;
  background:var(--accent-dim);
  display:flex;align-items:center;justify-content:center;
  margin:0 auto 18px;
}
#empty-state h2{font-size:20px;margin:0 0 8px;color:var(--text-1);}
#empty-state p{font-size:13.5px;color:var(--text-2);line-height:1.6;margin:0 0 26px;}
