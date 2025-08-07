import { useState, Fragment } from "react"
import { Dialog, Transition } from "@headlessui/react"

export default function ChatBotDialog({ isOpen, setIsOpen }) {
  const [input, setInput] = useState("")
  const [messages, setMessages] = useState([])


const handleSend = async () => {
  const userMsg = { sender: "user", text: input };
  setMessages(prev => [...prev, userMsg]);
  setInput("");

  try {
    const res = await fetch("http://localhost:5000/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ message: input }),
    });

    const data = await res.json();
    const botMsg = { sender: "bot", text: data.reply };
    setMessages(prev => [...prev, botMsg]);
  } catch (err) {
    console.error("Chat error:", err);
    setMessages(prev => [
      ...prev,
      { sender: "bot", text: "Sorry, there was an error. Try again later." },
    ]);
  }
};





  return (
    <Transition show={isOpen} as={Fragment}>
      <Dialog as="div" className="relative z-50" onClose={() => setIsOpen(false)}>
        <div className="fixed inset-0 bg-black/30 backdrop-blur-sm" aria-hidden="true" />
        <div className="fixed inset-0 flex items-center justify-center p-4">
          <Dialog.Panel className="w-full max-w-lg rounded-lg bg-richblack-800 p-6 text-white">
            <Dialog.Title className="text-xl font-bold mb-4 text-yellow-100">
              SkillNova AI Assistant
            </Dialog.Title>
           <div className="space-y-2 max-h-[300px] overflow-y-auto px-2">
  {messages.map((msg, index) => (
    <div
      key={index}
      className={`p-2 rounded-xl w-fit max-w-[75%] ${
        msg.sender === "user" ? "bg-gray-700 text-white self-end ml-auto" : "bg-gray-500 text-white"
      }`}
    >
      {msg.text}
    </div>
  ))}
</div>


            <div className="flex gap-2">
              <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Ask something..."
                className="flex-1 rounded-md bg-richblack-600 px-3 py-2 text-white"
              />
              <button
                onClick={handleSend}
                className="bg-yellow-100 text-black px-4 py-2 rounded-md font-semibold"
              >
                Send
              </button>
            </div>

            <div className="mt-4 text-right">
              <button onClick={() => setIsOpen(false)} className="text-sm text-pink-200 underline">
                Close
              </button>
            </div>
          </Dialog.Panel>
        </div>
      </Dialog>
    </Transition>
  )
}
