/* eslint-disable react/prop-types */
// import Footer from "../Footer/Footer";
import Navbar from "../Navbar/Navbar";
import "./wrapper.css";

const Wrapper = ({ component }) => {
  return (
    <div className="wrapper">
      <div className="flex flex-col sm:flex-row">
        <Navbar />
        <div className="w-full flex-grow h-full sm:h-screen overflow-y-scroll ">
          {component}
        </div>
      </div>
      {/* <Footer /> */}
    </div>
  );
};

export default Wrapper;
