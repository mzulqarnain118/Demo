import LoadingOverlay from "react-loading-overlay";
import { Circles } from "react-loader-spinner";
import {ScaleLoader} from "react-spinners";

export const LoaderSpinner = ({ isLoading, color }) => {
  return (
    <LoadingOverlay
      active={isLoading}
      spinner={<Circles color={color ?? "#43ACCB"} />}
    />
  );
};

export const Spinner = ({ isLoading,color }) => {
  return (
  <ScaleLoader
// css={override}
    size={250}
    color={color ?? "#43ACCB"}
    loading={isLoading}
  />);
};

//TODO: Add this over spinner if needed
// .body-overlay {
//   position: fixed;
//   background-color: #fbfbfb;
//   top: 0;
//   left: 0;
//   z-index: 1000;
//   width: 100vw;
//   height: 100vh;
//   display: flex;
//   flex-direction: column;
//   gap: 20px;
//   align-items: center;
//   justify-content: center;
// }
