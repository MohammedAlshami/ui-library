import { useState } from 'react'

type View = 'chats' | 'conversation' | 'groupInfo'

interface ChatItem {
  id: string
  name: string
  preview: string
  time: string
  unread?: number
  pinned?: boolean
  avatar: 'group' | 'photo' | 'person-blue' | 'person-red' | 'dark'
}

const CHATS: ChatItem[] = [
  { id: 'files', name: 'Files', preview: '✓ You: Wake Nazrin up at 3', time: 'Yesterday', pinned: true, avatar: 'group' },
  { id: 'arabic', name: 'عمو الاديمي', preview: 'شوي واتصل عليك', time: '11:39 PM', unread: 2, avatar: 'photo' },
  { id: 'zainab', name: 'Zainab', preview: 'تمام از يو وانت', time: '10:34 PM', unread: 1, avatar: 'dark' },
  { id: 'num', name: '+60 11-7352 0520', preview: 'Sticker', time: '8:19 PM', avatar: 'person-blue' },
  { id: 'fatma', name: 'Fatma Alaziz', preview: 'من ناحية اي؟', time: '8:08 PM', unread: 1, avatar: 'person-red' },
]

const Icon = {
  back: (cls = 'size-6') => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" className={cls}><path d="m15 18-6-6 6-6" /></svg>
  ),
  search: (cls = 'size-6') => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={cls}><circle cx="11" cy="11" r="7" /><path d="m20 20-4-4" /></svg>
  ),
  camera: (cls = 'size-6') => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" className={cls}><rect x="2.8" y="6" width="13.8" height="12" rx="3" /><path d="m16.6 10 4.6-2.4v9l-4.6-2.4z" /></svg>
  ),
  plus: (cls = 'size-7') => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.6" className={cls}><path d="M12 5v14M5 12h14" /></svg>
  ),
  dots: (cls = 'size-6') => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cls}><circle cx="5" cy="12" r="1.8" /><circle cx="12" cy="12" r="1.8" /><circle cx="19" cy="12" r="1.8" /></svg>
  ),
  userGroup: (cls = 'size-7') => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cls}><circle cx="9" cy="8" r="2.5" /><circle cx="16" cy="9" r="2.3" /><path d="M4 17c0-2.7 2.7-4.3 5.5-4.3S15 14.3 15 17v1H4z" /><path d="M13 18c0-2.2 2-3.5 4.1-3.5 2.2 0 3.9 1.3 3.9 3.5V19h-8z" /></svg>
  ),
  pin: (cls = 'size-5') => (
    <svg viewBox="0 0 24 24" fill="currentColor" className={cls}><path d="M14 2 9 7l2 2-5 5 1 1 5-5 2 2 5-5-5-5zM8 17l-4 5 5-4z" /></svg>
  ),
  check: (cls = 'size-5') => (
    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.4" className={cls}><path d="m4 12 5 5 11-11" /></svg>
  ),
}

function StatusBar() {
  return (
    <div className="flex items-center justify-between px-6 pt-3 text-[18px] font-semibold text-black">
      <span>11:43</span>
      <div className="flex items-center gap-2">
        <div className="flex items-end gap-1"><span className="h-2 w-1 rounded bg-black" /><span className="h-3 w-1 rounded bg-black" /><span className="h-4 w-1 rounded bg-black" /><span className="h-5 w-1 rounded bg-black" /></div>
        <div className="h-3 w-5 rounded-sm border-2 border-black" />
        <div className="h-6 w-10 rounded-full bg-gray-200 text-center text-[18px] leading-6">19</div>
      </div>
    </div>
  )
}

function Avatar({ type }: { type: ChatItem['avatar'] }) {
  if (type === 'group') return <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#e6d2c4] text-[#8a5a37]">{Icon.userGroup('size-8')}</div>
  if (type === 'person-blue') return <div className="h-14 w-14 rounded-full bg-[#bfd9f5]" />
  if (type === 'person-red') return <div className="h-14 w-14 rounded-full bg-[#efcad4]" />
  if (type === 'dark') return <div className="h-14 w-14 rounded-full bg-[#374151]" />
  return <div className="h-14 w-14 rounded-full bg-[#b8d2e5]" />
}

function ChatsScreen({ setView }: { setView: (v: View) => void }) {
  return (
    <div className="relative flex h-full flex-col bg-[#f6f7f8]">
      <StatusBar />
      <div className="px-5 pt-4">
        <div className="mb-4 flex items-center justify-between">
          <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eceeef] text-[#111]">{Icon.dots('size-7')}</div>
          <div className="flex items-center gap-3">
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#eceeef]">{Icon.camera('size-5')}</div>
            <div className="flex h-11 w-11 items-center justify-center rounded-full bg-[#20b15f] text-white">{Icon.plus('size-6')}</div>
          </div>
        </div>
        <h1 className="text-[56px] font-bold leading-none tracking-tight text-black">Chats</h1>
        <div className="mt-4 flex items-center gap-2 rounded-2xl bg-[#ebebed] px-4 py-3 text-gray-500">{Icon.search('size-6')}<span className="text-[20px]">Search</span></div>
        <div className="mt-4 flex gap-2 overflow-hidden text-[19px]">
          {['All', 'Unread 14', 'Favorites', 'Groups 4'].map((item, idx) => (
            <span key={item} className={`rounded-full border px-4 py-1.5 ${idx === 0 ? 'border-[#8fcb93] bg-[#c8efc6] text-[#1d6a34]' : 'border-gray-300 text-gray-600'}`}>{item}</span>
          ))}
        </div>
      </div>

      <div className="mt-3 flex-1 overflow-auto bg-[#f8f8f8] px-5 pb-20">
        <div className="flex items-center gap-3 py-4 text-[44px] text-gray-500"><span className="text-3xl">▢</span><span className="text-[50px] leading-none">Archived</span></div>
        {CHATS.map((chat) => (
          <button key={chat.id} type="button" onClick={() => chat.id === 'files' && setView('conversation')} className="flex w-full items-center gap-4 border-b border-gray-200 py-4 text-left">
            <Avatar type={chat.avatar} />
            <div className="min-w-0 flex-1">
              <div className="flex items-center justify-between"><p className="truncate text-[24px] font-semibold text-black">{chat.name}</p><p className={`text-[24px] ${chat.unread ? 'text-[#22af61]' : 'text-gray-500'}`}>{chat.time}</p></div>
              <div className="mt-1 flex items-center justify-between"><p className="truncate text-[20px] text-gray-500">{chat.preview}</p>{chat.unread ? <span className="rounded-full bg-[#22af61] px-2 text-sm text-white">{chat.unread}</span> : chat.pinned ? <span className="text-gray-400">{Icon.pin()}</span> : null}</div>
            </div>
          </button>
        ))}
      </div>

      <div className="absolute bottom-0 left-0 right-0 flex items-center justify-around border-t border-gray-200 bg-[#f7f7f7] py-3 text-[14px] text-gray-500">
        {['Updates', 'Calls', 'Communities', 'Chats', 'Settings'].map((tab) => <span key={tab} className={tab === 'Chats' ? 'font-semibold text-black' : ''}>{tab}</span>)}
      </div>
    </div>
  )
}

function ConversationScreen({ setView }: { setView: (v: View) => void }) {
  return (
    <div className="flex h-full flex-col bg-[#efece2]">
      <StatusBar />
      <div className="flex items-center gap-3 border-b border-gray-200 bg-[#f7f7f7] px-4 py-2">
        <button type="button" onClick={() => setView('chats')} className="text-black">{Icon.back('size-7')}</button>
        <span className="text-[20px] text-black">14</span>
        <Avatar type="group" />
        <button type="button" onClick={() => setView('groupInfo')} className="flex-1 text-left">
          <p className="text-[42px] font-semibold leading-none text-black">Files</p>
          <p className="text-[18px] text-gray-500">You</p>
        </button>
        <span className="text-gray-400">{Icon.camera('size-8')}</span>
      </div>

      <div className="flex-1 space-y-3 overflow-auto bg-[radial-gradient(#dcd5c7_0.8px,transparent_0.8px)] [background-size:14px_14px] px-4 py-4">
        <div className="ml-auto w-[90%] rounded-2xl bg-[#c8f4c5] p-3 text-[20px] leading-tight text-[#11745a] shadow-sm">
          https://themes.shopify.com/themes/empire/presets/forma?surface_detail=bag&surface_inter_position=3
          <div className="mt-2 flex items-center justify-end gap-1 text-sm text-gray-500">10:49 PM {Icon.check('size-4')}</div>
        </div>
        <div className="mx-auto w-fit rounded-full bg-white px-4 py-1 text-sm font-semibold">Yesterday</div>
        <div className="ml-auto w-[72%] rounded-2xl bg-[#c8f4c5] px-4 py-2 text-[46px] leading-none text-[#0b1210]">Wake Nazrin up at 3
          <div className="mt-1 flex items-center justify-end gap-1 text-sm text-gray-500">12:07 AM {Icon.check('size-4')}</div>
        </div>
      </div>

      <div className="border-t border-gray-200 bg-[#f4f4f4] px-3 pb-3 pt-2">
        <div className="mb-3 flex items-center gap-2 rounded-full bg-white px-4 py-2"><span className="text-3xl">+</span><span className="flex-1 text-gray-400">Message</span>{Icon.camera('size-7')}<span className="h-8 w-1 rounded bg-black" /></div>
        <div className="grid grid-cols-4 gap-3 text-center text-[14px] text-gray-700">
          {['Photos', 'Camera', 'Location', 'Contact', 'Document', 'Poll', 'Event'].map((item) => <div key={item} className="rounded-2xl bg-[#ececec] px-2 py-4">{item}</div>)}
          <div />
        </div>
      </div>
    </div>
  )
}

function GroupInfoScreen({ setView }: { setView: (v: View) => void }) {
  const rows = [
    ['Media, links and docs', '72'],
    ['Starred', 'None'],
    ['Notifications', 'All'],
    ['Chat theme', ''],
    ['Save to Photos', 'Default'],
    ['Disappearing messages', 'Off'],
    ['Group permissions', ''],
    ['Advanced chat privacy', 'Off'],
  ]

  return (
    <div className="h-full overflow-auto bg-[#f2f2f2] text-black">
      <StatusBar />
      <div className="px-4 pt-1">
        <div className="flex items-center justify-between py-3">
          <button type="button" onClick={() => setView('conversation')}>{Icon.back('size-8')}</button>
          <h2 className="text-[18px] font-semibold">Group info</h2>
          <span className="text-2xl">✎</span>
        </div>

        <div className="mx-auto mt-4 flex h-44 w-44 items-center justify-center rounded-full border border-[#d4c4b8] bg-[#e6d2c4] text-[#8a5a37]">{Icon.userGroup('size-16')}</div>
        <h3 className="mt-4 text-center text-[56px] font-bold leading-none">Files</h3>
        <p className="mt-2 text-center text-[20px] text-gray-500">Group · <span className="text-[#139656]">1 member</span></p>

        <div className="mt-4 grid grid-cols-4 gap-2 text-center text-[18px]">
          {['Audio', 'Video', 'Add', 'Search'].map((item) => <div key={item} className="rounded-2xl bg-[#ececec] px-1 py-4">{item}</div>)}
        </div>
        <div className="mt-3 rounded-2xl bg-[#ececec] px-5 py-4 text-[24px] text-[#139656]">Add group description</div>

        <div className="mt-4 space-y-3 pb-6">
          {rows.map(([label, value]) => (
            <div key={label} className="rounded-2xl bg-white px-4 py-4">
              <div className="flex items-center justify-between text-[22px]"><span>{label}</span><span className="text-gray-500">{value}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export function WhatsAppReplica() {
  const [view, setView] = useState<View>('chats')

  return (
    <div className="flex min-h-screen items-center justify-center bg-[#121212] p-8">
      <div className="relative h-[860px] w-[420px] overflow-hidden rounded-[52px] border-[10px] border-black bg-white shadow-[0_30px_80px_rgba(0,0,0,0.5)]">
        <div className="absolute left-1/2 top-0 z-30 h-7 w-40 -translate-x-1/2 rounded-b-3xl bg-black" />
        {view === 'chats' && <ChatsScreen setView={setView} />}
        {view === 'conversation' && <ConversationScreen setView={setView} />}
        {view === 'groupInfo' && <GroupInfoScreen setView={setView} />}
      </div>
    </div>
  )
}
