import { BeatLoader } from "react-spinners";
import css from "./Loader.module.css";

const Loader = () => {
  return (
    <div className={css.loaderWrapper}>
      <BeatLoader color={"#000000"} size={15} />
    </div>
  );
};

export default Loader;
