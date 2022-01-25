import { Routes, Route } from "react-router-dom";
import Navbars from "./pages/Navbars";
import UploadTransaction from "./pages/UploadTransaction";
import ViewRecords from "./pages/ViewRecords";
function App() {
  //const  tranInsert= useSelector((state)=>state)
  return (
    <div className="App">
      <Navbars ></Navbars>
      <Routes>
        <Route path='/' exact element={<UploadTransaction />} />
        <Route path='/upload' element={<UploadTransaction />} />
        <Route path='/view' exact element={<ViewRecords />} />
      </Routes>
    </div>
  );
}

export default App;
