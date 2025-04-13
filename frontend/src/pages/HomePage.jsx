import { useChatStore } from "../store/useChatStore";

import Sidebar from "../components/Sidebar";
import NoChatSelected from "../components/NoChatSelected";
import ChatContainer from "../components/ChatContainer";

const HomePage = () => {
  const { selectedUser } = useChatStore();

  return (
    <div className="h-screen bg-base-200">
      <div className="h-full">
        <div className="h-full bg-base-100">
          <div className="h-full relative">
            {selectedUser ? <ChatContainer /> : <Sidebar />}
          </div>
        </div>
      </div>
    </div>
  );
};
export default HomePage;
