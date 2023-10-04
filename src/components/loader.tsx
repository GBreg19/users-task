import { ThreeDots } from "react-loader-spinner";

const Loader = () => {
  return (
    <>
      <ThreeDots
        height="80"
        width="80"
        radius="9"
        color="rgb(241 245 249)"
        ariaLabel="three-dots-loading"
        wrapperStyle={{ justifyContent: "center"}}
        visible={true}
      />
    </>
  );
};

export default Loader;
