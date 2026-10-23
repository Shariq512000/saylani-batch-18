import { useEffect, useRef, useState } from 'react';
import { apiRequest } from '../api';

function initials(person) {
    return `${person?.firstName?.[0] || ''}${person?.lastName?.[0] || ''}`.toUpperCase() || '?';
}

function displayName(person) {
    return [person?.firstName, person?.lastName].filter(Boolean).join(' ') || 'Unknown user';
}

function formatTime(value) {
    if (!value) return '';
    return new Intl.DateTimeFormat(undefined, { hour: 'numeric', minute: '2-digit' }).format(new Date(value));
}

function Avatar({ person, small = false }) {
    const palette = ['mint', 'coral', 'blue', 'gold', 'lilac'];
    const tone = palette[(person?.firstName?.charCodeAt(0) || 0) % palette.length];
    return <span className={`avatar avatar-${tone}${small ? ' avatar-small' : ''}`} aria-hidden="true">{initials(person)}</span>;
}

function ChatPage({ currentUser }) {
    const [users, setUsers] = useState([]);
    const [selectedUser, setSelectedUser] = useState(null);
    const [messages, setMessages] = useState([]);
    const [search, setSearch] = useState('');
    const [draft, setDraft] = useState('');
    const [loadingUsers, setLoadingUsers] = useState(false);
    const [loadingMessages, setLoadingMessages] = useState(false);
    const [sending, setSending] = useState(false);
    const [error, setError] = useState('');
    const [mobileChatOpen, setMobileChatOpen] = useState(false);
    const endOfMessages = useRef(null);

    useEffect(() => {
        let active = true;
        setLoadingUsers(true);
        apiRequest('/api/v1/users')
            .then((result) => {
                if (active) setUsers((result.users || []).filter((person) => person._id !== currentUser._id));
            })
            .catch((requestError) => { if (active) setError(requestError.message); })
            .finally(() => { if (active) setLoadingUsers(false); });
        return () => { active = false; };
    }, [currentUser]);

    useEffect(() => {
        if (!selectedUser) return;
        let active = true;
        setLoadingMessages(true);
        setError('');
        apiRequest(`/api/v1/conversation/${selectedUser._id}`)
            .then((result) => {
                if (active) setMessages((result.conversation || []).slice().sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn)));
            })
            .catch((requestError) => { if (active) setError(requestError.message); })
            .finally(() => { if (active) setLoadingMessages(false); });
        return () => { active = false; };
    }, [selectedUser]);

    useEffect(() => {
        endOfMessages.current?.scrollIntoView({ behavior: 'smooth', block: 'end' });
    }, [messages]);

    async function sendMessage(event) {
        event.preventDefault();
        const text = draft.trim();
        if (!text || !selectedUser || sending) return;
        setSending(true);
        setError('');
        try {
            await apiRequest(`/api/v1/chat/${selectedUser._id}`, {
                method: 'POST',
                body: JSON.stringify({ message: text }),
            });
            setDraft('');
            const result = await apiRequest(`/api/v1/conversation/${selectedUser._id}`);
            setMessages((result.conversation || []).slice().sort((a, b) => new Date(a.createdOn) - new Date(b.createdOn)));
        } catch (requestError) {
            setError(requestError.message);
        } finally {
            setSending(false);
        }
    }

    const filteredUsers = users.filter((person) => displayName(person).toLowerCase().includes(search.toLowerCase()) || person.email?.toLowerCase().includes(search.toLowerCase()));

    return (
        <main className={`chat-app${mobileChatOpen ? ' mobile-chat-open' : ''}`}>
            <aside className="people-panel">
                <div className="sidebar-top">
                    <div className="brand-lockup"><span className="brand-mark">c</span><span>closer</span></div>
                    <span className="sidebar-label">MESSAGES</span>
                    <div className="people-heading"><h1>People</h1><span className="people-count">{users.length}</span></div>
                    <label className="search-box"><span aria-hidden="true">⌕</span><input aria-label="Search people" placeholder="Find someone" value={search} onChange={(event) => setSearch(event.target.value)} /><kbd>⌘ K</kbd></label>
                </div>
                <div className="people-list" aria-label="People">
                    {loadingUsers && <p className="list-state">Finding your people…</p>}
                    {!loadingUsers && filteredUsers.length === 0 && <p className="list-state">{users.length ? 'No one matches that search.' : 'No other people yet.'}</p>}
                    {filteredUsers.map((person) => (
                        <button className={`person-row${selectedUser?._id === person._id ? ' selected' : ''}`} key={person._id} type="button" onClick={() => { setSelectedUser(person); setMobileChatOpen(true); }}>
                            <Avatar person={person} />
                            <span className="person-copy"><strong>{displayName(person)}</strong><span>{person.email}</span></span>
                            <span className="person-arrow" aria-hidden="true">›</span>
                        </button>
                    ))}
                </div>
                <div className="profile-row"><Avatar person={currentUser} small /><span className="profile-copy"><strong>{displayName(currentUser)}</strong><span>My account</span></span><span className="profile-presence" title="Available" /></div>
            </aside>

            <section className="conversation-panel" aria-label="Conversation">
                {selectedUser ? <>
                    <header className="conversation-header">
                        <button className="back-button" type="button" aria-label="Back to people" onClick={() => setMobileChatOpen(false)}>←</button>
                        <Avatar person={selectedUser} />
                        <div className="conversation-person"><h2>{displayName(selectedUser)}</h2><span><i /> Here to chat</span></div>
                        <button className="header-action" type="button" title="Conversation details" aria-label="Conversation details">•••</button>
                    </header>
                    <div className="message-area">
                        <div className="conversation-start"><span className="start-rule" /><span>THIS IS THE START OF YOUR CONVERSATION</span><span className="start-rule" /></div>
                        {loadingMessages && <p className="list-state">Loading messages…</p>}
                        {!loadingMessages && messages.map((message) => {
                            const mine = (message.from?._id || message.from) === currentUser._id;
                            return <div className={`message-row${mine ? ' mine' : ''}`} key={message._id}>
                                {!mine && <Avatar person={message.from} small />}
                                <div className="message-content"><div className="message-meta"><strong>{mine ? 'You' : displayName(message.from)}</strong><time>{formatTime(message.createdOn)}</time></div><p className="message-bubble">{message.message}</p></div>
                            </div>;
                        })}
                        {!loadingMessages && messages.length === 0 && <p className="empty-conversation">Say hello to {selectedUser.firstName}.</p>}
                        <div ref={endOfMessages} />
                    </div>
                    {error && <p className="chat-error" role="alert">{error}</p>}
                    <form className="composer" onSubmit={sendMessage}>
                        <input aria-label="Write a message" placeholder={`Message ${selectedUser.firstName}…`} value={draft} onChange={(event) => setDraft(event.target.value)} />
                        <span className="composer-hint">Enter to send</span>
                        <button className="send-button" type="submit" disabled={!draft.trim() || sending} aria-label="Send message" title="Send message">{sending ? '…' : '↑'}</button>
                    </form>
                </> : <div className="welcome-panel">
                    <div className="welcome-art" aria-hidden="true"><span className="art-ring ring-a" /><span className="art-ring ring-b" /><span className="art-spark">✳</span><span className="art-dot" /></div>
                    <span className="eyebrow">A GOOD PLACE TO BEGIN</span>
                    <h2>Your next conversation<br />is one click away.</h2>
                    <p>Choose someone from your people list to say hello.</p>
                </div>}
            </section>
        </main>
    );
}

export default ChatPage;