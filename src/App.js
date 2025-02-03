import Header from "./components/Header";
import ChatBox from "./components/ChatBox";
function App() {
  return (
    <div className="min-h-screen bg-blue-100 flex flex-col items-center p-10">
      <Header/>
      <ChatBox />
    </div>
  );
}

export default App;
