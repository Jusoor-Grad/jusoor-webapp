/* eslint-disable react/prop-types */
// import Footer from "../Footer/Footer";
// import Navbar from "../Navbar/Navbar";

const LoginWrapper = ({ component }) => {
  return (
    <>
      {/* <Navbar /> */}
      <div className="w-full flex-grow">{component}</div>
      {/* <Footer /> */}
    </>
  );
};

export default LoginWrapper;
