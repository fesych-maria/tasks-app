import css from "./Container.module.css";

const Container = ({ children }) => {
  return (
    <div className={css.container}>
      <div>{children}</div>
    </div>
  );
};

export default Container;
