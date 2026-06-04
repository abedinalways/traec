import Header from "@/components/message/Header";
import MessageInput from "@/components/message/MessageInput";
import MessageListSection from "@/components/message/MessageListSection";
import MessageSection from "@/components/message/MessageSection";

export default function MessagesTab() {

  return (
    <section className="grid md:h-[calc(100dvh-190px)] grid-cols-12 md:gap-4">
      {/* Sidebar */}
      <aside className="md:col-span-4 col-span-12 mt-4 md:mt-0 shadow-lg p-2 rounded-2xl">
        <div className="rounded-2xl bg-white md:p-6 p-4 md:max-h-[calc(100dvh-140px)] overflow-hidden">
          <MessageListSection/>
        </div>
      </aside>

      {/* Chat Area */}
      <div className="md:h-[calc(100dvh-100px)] md:col-span-8 col-span-12 bg-white md:p-6 p-2 md:grid md:grid-rows-[130px_1fr_86px] rounded-2xl shadow-lg overflow-y-auto">
        <Header />
        <div className="flex-1 overflow-hidden">
          <MessageSection />
        </div>
        <MessageInput />
      </div>
    </section>
  );
}