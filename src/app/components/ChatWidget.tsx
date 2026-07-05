import { MessageCircle } from "lucide-react";
import { useNavigate } from "react-router";

export function ChatWidget() {
  const navigate = useNavigate();

  return (
    <button
      type="button"
      onClick={() => navigate("/chat")}
      aria-label="智能咨询"
      className="fixed bottom-6 right-6 z-50 flex h-14 w-14 items-center justify-center rounded-full bg-blue-600 text-white shadow-lg transition hover:bg-blue-700"
    >
      <MessageCircle className="h-6 w-6" />
    </button>
  );
}

export default ChatWidget;
