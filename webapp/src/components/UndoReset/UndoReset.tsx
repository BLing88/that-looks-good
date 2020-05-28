import React from "react";
import styles from "./UndoReset.module.css";

export const UndoReset = ({
  undoResetHandler,
  closeHandler,
  className,
}: {
  undoResetHandler: () => void;
  closeHandler: () => void;
  className: string;
}) => {
  return (
    <div className={`${styles.undoModal} ${className}`}>
      <p className={styles.message}>Didn&rsquo;t mean to reset?</p>
      <button
        onClick={(e) => {
          e.preventDefault();
          undoResetHandler();
        }}
        className={styles.undoBtn}
      >
        Undo
      </button>
      <button
        onClick={(e) => {
          e.preventDefault();
          closeHandler();
        }}
        className={styles.closeBtn}
        aria-label="allow reset"
      >
        &times;
      </button>
    </div>
  );
};
