import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import { ToastContainer } from "react-toastify";

import Login from "./components/auth/Login/Login";
import Master from "./components/layout/Master";
import PostSection from "./components/Pages/Student/Sidebar/PostSection";
import Sidebar from "./components/Pages/Student/Sidebar/Sidebar";
import ChatbotSidebar from "./components/Pages/Student/Sidebar/ChatbotSidebar";
import Output from "./components/Pages/Student/Compiler/Output";
import Codebox from "./components/Pages/Student/Compiler/CodeBox";
import MyAI from "./components/Pages/Student/MyAI/MyAI";
import Messages from "./components/Pages/Student/Messages/Messages";
import Events from "./components/Pages/Student/Events/Events";
import Notes from "./components/Pages/Student/Notes/Notes";
import Postss from "./components/Pages/Student/Postss/Postss";
import AddPosts from "./components/Pages/Student/Postss/AddPosts";
import Alumni from "./components/Pages/Student/Alumni";

const App = () => {
  return (
    <BrowserRouter>
      <Routes>
        {/* Login Page */}
        <Route path="/login" element={<Login />} />

        {/* Master Layout */}
        <Route path="/" element={<Master />}>
          <Route
            index
            element={
              <>
                <div className="flex">
                  <Sidebar />
                  <PostSection />
                  <ChatbotSidebar />
                </div>
              </>
            }
          />
          <Route path="/compiler" element={<Codebox />}></Route>

          <Route path="/myai" element={<MyAI />} />
          <Route path="/messages" element={<Messages />}></Route>
          <Route path="/events" element={<Events />}></Route>

          <Route path="/notes" element={<Notes />}></Route>
          <Route path="/posts" element={<Postss />}></Route>
          <Route path="/addPosts" element={<AddPosts/>}></Route>
          <Route path='/alumni' element={<Alumni/>}></Route>
        </Route>
      </Routes>
    </BrowserRouter>
  );
};

export default App;
