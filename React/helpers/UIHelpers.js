
import LoadingOverlay from "react-loading-overlay";

export const LoaderButtonSpinner = () => {
  return(<div className="spinner-border text-light" role="status">
  <span className="sr-only"></span>
</div>)
}
//**TODO CALLING WAY*/
//<LoaderButtonSpinner/>

export const PageLoader = ({isLoading}) => {
  return(<LoadingOverlay
    active={isLoading}
    spinner={<Circles color="#00BFFF" />}//**!we can change color */
/>)
}
//**TODO CALLING WAY*/
//<PageLoader isLoading={isLoading} />