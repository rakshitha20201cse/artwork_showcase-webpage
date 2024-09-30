import React, { useEffect, useState } from 'react';
import Pic from "./components/Pic";
import Comments from "./components/Comments";
import { GoogleAuthProvider, signInWithPopup, onAuthStateChanged } from 'firebase/auth';
import { collection, addDoc, onSnapshot, orderBy, query, serverTimestamp, getFirestore } from 'firebase/firestore';
import { auth } from "./firebase1";
import './App.css';

const db = getFirestore(); // Ensure Firestore is initialized

function App() {
  const [user, setUser] = useState(null);
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const q = query(collection(db, "messages"), orderBy("timestamp"));
    const unsubscribe = onSnapshot(q, snapshot => {
      setMessages(snapshot.docs.map(doc => ({
        id: doc.id,
        data: doc.data()
      })));
      setLoading(false); // Stop loading when messages are loaded
    });
    return unsubscribe;
  }, [db]);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, user => {
      setUser(user);
    });
    return unsubscribe; // Clean up subscription
  }, []);

  const sendMessage = async () => {
    if (newMessage.trim()) {
      try {
        await addDoc(collection(db, "messages"), {
          uid: user.uid,
          photoURL: user.photoURL,
          displayName: user.displayName,
          text: newMessage,
          timestamp: serverTimestamp()
        });
        setNewMessage(""); // Clear input after sending
      } catch (error) {
        console.error("Error sending message:", error); // Optional: Display error to user
      }
    }
  };

  const handleGoogleLogin = async () => {
    const provider = new GoogleAuthProvider();
    try {
      await signInWithPopup(auth, provider);
    } catch (error) {
      console.error("Error during Google login:", error); // Optional: Display error to user
    }
  };

  return (
    <div className="App">
      <Pic />
      <Comments />
      <div className="flex justify-center bg-gray-800 py-10 min-h-screen">
        {user ? (
          <div>
            <div>Logged in as {user.displayName}</div>
            <input
              value={newMessage}
              onChange={(e) => setNewMessage(e.target.value)}
              placeholder="Type your message here..."
              className="p-2 rounded"
            />
            <button
              className="bg-white rounded-[10px] hover:bg-blue-400 p-3"
              onClick={sendMessage}
            >
          Comment here
            </button>
            <button
              className="mb-8 bg-white rounded-[10px] p-3"
              onClick={() => auth.signOut()}
            >
              Logout
            </button>
            <div className="flex flex-col gap-5">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`message flex ${
                    msg.data.uid === user.uid
                      ? 'justify-end'
                      : 'justify-start'
                  }`}
                >
                  <div
                    className={`message flex flex-row p-3 gap-3 rounded-[20px] items-center ${
                      msg.data.uid === user.uid
                        ? 'text-white bg-blue-500'
                        : 'bg-white'
                    }`}
                  >
                    <img
                      className="w-10 h-10 rounded-full"
                      src={msg.data.photoURL}
                      alt={msg.data.displayName}
                    />
                    {msg.data.text}
                  </div>
                </div>
              ))}
            </div>
          </div>
        ) : (
          <button onClick={handleGoogleLogin}>Login with Google</button>
        )}
      </div>
    </div>
  );
}

export default App;