* {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
}

:root {
    --bg: #ffffff;
    --sidebar: #f7f7f8;
    --border: #e5e5e5;
    --text: #202123;
    --muted: #777;
    --hover: #eeeeee;
    --accent: #111111;
}

body {
    font-family:
        Inter,
        -apple-system,
        BlinkMacSystemFont,
        "Segoe UI",
        Arial,
        sans-serif;

    background: var(--bg);
    color: var(--text);

    height: 100vh;
    overflow: hidden;
}


/* =========================
   APP
========================= */

.app {
    display: flex;
    height: 100vh;
}


/* =========================
   SIDEBAR
========================= */

.sidebar {
    width: 270px;
    background: var(--sidebar);

    border-right: 1px solid var(--border);

    display: flex;
    flex-direction: column;

    padding: 18px;
}


/* BRAND */

.brand {
    display: flex;
    align-items: center;
    gap: 12px;

    padding: 8px 5px 25px;
}

.brand-icon {
    width: 42px;
    height: 42px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #ffffff;

    border: 1px solid var(--border);
    border-radius: 12px;

    font-size: 22px;
}

.brand h2 {
    font-size: 17px;
}

.brand span {
    color: var(--muted);
    font-size: 12px;
}


/* NEW CHAT */

.new-chat {
    width: 100%;

    padding: 12px;

    border: 1px solid var(--border);
    border-radius: 10px;

    background: white;

    font-size: 14px;

    cursor: pointer;

    display: flex;
    align-items: center;
    gap: 8px;

    transition: 0.2s;
}

.new-chat:hover {
    background: var(--hover);
}


/* HISTORY */

.history-title {
    font-size: 12px;
    color: var(--muted);

    margin: 25px 5px 10px;
}

.chat-history {
    flex: 1;

    overflow-y: auto;
}

.history-item {
    width: 100%;

    padding: 11px 10px;

    border-radius: 8px;

    border: none;

    background: transparent;

    text-align: left;

    cursor: pointer;

    font-size: 13px;

    margin-bottom: 3px;

    white-space: nowrap;

    overflow: hidden;

    text-overflow: ellipsis;
}

.history-item:hover {
    background: var(--hover);
}

.history-item.active {
    background: #e8e8e8;
}


/* SIDEBAR BOTTOM */

.sidebar-bottom {
    border-top: 1px solid var(--border);

    padding-top: 12px;
}

.side-button {
    width: 100%;

    border: none;
    background: transparent;

    padding: 10px;

    text-align: left;

    cursor: pointer;

    border-radius: 8px;
}

.side-button:hover {
    background: var(--hover);
}

.storage-status {
    font-size: 10px;
    color: #777;

    padding: 10px 5px;
}


/* =========================
   MAIN
========================= */

.main {
    flex: 1;

    display: flex;
    flex-direction: column;

    min-width: 0;
}


/* TOP BAR */

.topbar {
    height: 65px;

    border-bottom: 1px solid var(--border);

    display: flex;
    align-items: center;

    padding: 0 25px;
}

.topbar h3 {
    font-size: 16px;
    font-weight: 600;
}

.online {
    font-size: 11px;
    color: #777;
}

.mobile-menu {
    display: none;
}


/* =========================
   CHAT AREA
========================= */

.chat-area {
    flex: 1;

    overflow-y: auto;

    padding: 35px 20px 20px;
}


/* WELCOME */

.welcome {
    max-width: 650px;

    margin: 100px auto;

    text-align: center;
}

.welcome-icon {
    width: 65px;
    height: 65px;

    margin: auto auto 20px;

    display: flex;
    align-items: center;
    justify-content: center;

    border: 1px solid var(--border);

    border-radius: 20px;

    font-size: 32px;
}

.welcome h1 {
    font-size: 28px;

    margin-bottom: 10px;
}

.welcome p {
    color: var(--muted);
}


/* =========================
   MESSAGES
========================= */

.message {
    max-width: 760px;

    margin: 0 auto 25px;

    display: flex;

    gap: 12px;
}

.avatar {
    width: 34px;
    height: 34px;

    min-width: 34px;

    border-radius: 9px;

    display: flex;
    align-items: center;
    justify-content: center;

    background: #f1f1f1;
}

.message-content {
    flex: 1;

    line-height: 1.6;

    font-size: 15px;
}

.message-name {
    font-weight: 600;

    font-size: 13px;

    margin-bottom: 4px;
}


/* USER MESSAGE */

.user-message .avatar {
    background: #111;
    color: white;
}


/* ASSISTANT MESSAGE */

.assistant-message .avatar {
    background: #f0f0f0;
}


/* =========================
   OPTIONS
========================= */

.option-area {
    width: 100%;

    padding: 10px 20px;
}

.option-label {
    max-width: 760px;

    margin: auto auto 8px;

    color: #888;

    font-size: 11px;
}

.options {
    max-width: 760px;

    margin: auto;

    display: flex;

    gap: 8px;

    flex-wrap: wrap;
}

.option-btn {
    border: 1px solid var(--border);

    background: white;

    padding: 9px 15px;

    border-radius: 20px;

    cursor: pointer;

    font-size: 13px;

    transition: 0.2s;

    display: flex;
    align-items: center;

    gap: 6px;
}

.option-btn:hover {
    background: #f2f2f2;

    transform: translateY(-1px);
}


/* =========================
   COMPOSER
========================= */

.composer-container {
    padding: 10px 20px 18px;
}

.composer {
    max-width: 760px;

    margin: auto;

    border: 1px solid #d8d8d8;

    border-radius: 16px;

    padding: 8px 8px 8px 16px;

    display: flex;

    align-items: flex-end;

    background: white;

    box-shadow: 0 2px 10px rgba(0,0,0,0.04);
}

textarea {
    flex: 1;

    border: none;
    outline: none;

    resize: none;

    font-family: inherit;

    font-size: 14px;

    padding: 9px 0;

    max-height: 130px;
}

.send-btn {
    width: 38px;
    height: 38px;

    border-radius: 10px;

    border: none;

    background: #111;
    color: white;

    cursor: pointer;

    font-size: 17px;
}

.send-btn:hover {
    opacity: 0.8;
}

.composer-note {
    text-align: center;

    font-size: 10px;

    color: #999;

    margin-top: 7px;
}


/* =========================
   MOBILE
========================= */

@media (max-width: 700px) {

    .sidebar {
        position: fixed;

        left: -280px;

        top: 0;

        bottom: 0;

        z-index: 100;

        transition: 0.25s;
    }

    .sidebar.open {
        left: 0;
    }

    .mobile-menu {
        display: block;

        border: none;

        background: transparent;

        font-size: 20px;

        margin-right: 12px;

        cursor: pointer;
    }

    .welcome {
        margin: 80px auto;
    }

    .welcome h1 {
        font-size: 24px;
    }

    .message {
        padding: 0 5px;
    }

    .option-area {
        padding-left: 12px;
        padding-right: 12px;
    }

    .composer-container {
        padding-left: 12px;
        padding-right: 12px;
    }
}
