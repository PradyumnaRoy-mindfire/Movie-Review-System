import { ThreeDot } from 'react-loading-indicators';
const LoadingEffect = () => {
    const loadingEffect = (
        <ThreeDot color="#ffffff" size="large" text="Please wait..." textColor="" />
    );
  return (
     <div
          style={{
            position: "fixed",
            justifyContent: "center",
            alignItems: "center",
            top: "80%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            padding: "20px",
            zIndex: "5",
          }}
        >
          {loadingEffect}
        </div>
  )
}

export default LoadingEffect