/* eslint-disable react/prop-types */
// import Footer from "../Footer/Footer";
// import Navbar from "../Navbar/Navbar";

const LoginWrapper = ({ component }) => {
    return (
        <>
            <div className="w-full flex-grow h-screen">{component}</div>
        </>
    );
};

export default LoginWrapper;
