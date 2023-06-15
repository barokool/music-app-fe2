import { BrowserRouter, Route, Routes } from "react-router-dom";
import AppIndex from "./pages";
import Authen from "./pages/Authen";
import AuthenRegister from "./pages/Register";
import GeneralIndex from "./pages/General";
import AddSong from "./pages/AddSong";
import AddPlaylist from "./pages/AddPlaylist";
import Playlists from "./pages/Playlists";
import DetailSong from "./pages/DetailSong";
import Search from "./pages/Search";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<GeneralIndex />}>
          <Route index element={<AppIndex />} />
          <Route path="/add-track" element={<AddSong />} />
          <Route path="/add-playlist" element={<AddPlaylist />} />
          <Route path="/playlists" element={<Playlists />} />
          <Route path="/song/:id" element={<DetailSong />} />
          <Route path="/search" element={<Search />} />

          {/* <Route path="contact" element={<Contact />} /> */}
          {/* <Route path="*" element={<NoPage />} /> */}
        </Route>
        <Route path="login" element={<Authen />} />
        <Route path="register" element={<AuthenRegister />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
