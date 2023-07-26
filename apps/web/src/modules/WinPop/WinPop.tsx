import { useMemo, useRef, useState } from 'react';
import styles from './_WinPop.module.scss';
import * as CSS from 'csstype';
import { CloseIcon } from './icons/CloseIcon';

type WinPopPosition = 'bottomLeft' | 'bottomRight' | 'center' | 'topLeft' | 'topRight';
type WinPopDimensions = {
  width: CSS.Property.Width;
  height: CSS.Property.Height;
};
type WinPopCoordinates = {
  top?: CSS.Property.Top;
  bottom?: CSS.Property.Bottom;
  left?: CSS.Property.Left;
  right?: CSS.Property.Right;
};

interface WinPopProps {
  /** WinPop open? */
  open: boolean;

  /** Function to run when closing */
  onClose: () => void;

  /**
   * Starting position of the WinPop
   *
   * Options:
   * - `'bottomLeft'`
   * - `'bottomRight'`
   * - `'center'` **(default)**
   * - `'topLeft'`
   * - `'topRight'`
   */
  position?: WinPopPosition;

  /**
   * Starting size of the WinPop
   *
   * ```ts
   * const startingSize = {
   *    width: CSS.Property.Width;
   *    height: CSS.Property.Height;
   * }
   * ```
   */
  startingSize?: WinPopDimensions;

  /** CSS Color for the border color */
  borderColor?: CSS.Property.Color;

  /** CSS Color for the text and icon color */
  textColor?: CSS.Property.Color;
}
/**
 * A pop-up window that functions like a desktop application within the browser window.
 */
export function WinPop({
  open,
  onClose: closeWindow,
  position = 'center',
  startingSize,
  borderColor = 'black',
  textColor = 'white',
}: WinPopProps): React.ReactElement {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const [dialogSize, setDialogSize] = useState<WinPopDimensions>(
    startingSize ?? {
      width: '50%',
      height: '50%',
    },
  );
  const [minimized, setMinimized] = useState(false);
  const [currentPosition, setCurrentPosition] = useState<WinPopCoordinates>({});

  const dialogClassName = useMemo(() => {
    if (minimized) {
      return `${styles.root} ${styles.minimized}`;
    }

    return `${styles.root} ${styles[position]}`;
  }, [position, minimized]);

  const minimizeWindow = () => {
    setMinimized(true);
    setDialogSize({
      width: '200px',
      height: 'auto',
    });
    setCurrentPosition({
      bottom: '0',
      left: '0',
    });
  };

  const maximizeWindow = () => {
    setMinimized(false);
  };

  return (
    <dialog
      ref={dialogRef}
      className={dialogClassName}
      open={open}
      style={{
        width: dialogSize.width,
        height: dialogSize.height,
        top: currentPosition?.top,
        bottom: currentPosition?.bottom,
        left: currentPosition?.left,
        right: currentPosition?.right,
      }}
    >
      {/* North-West corner */}
      <div className={`${styles.northWestCorner}`}>
        <div
          className={styles.borderLeft}
          style={{
            backgroundColor: borderColor,
          }}
        />

        <div
          className={styles.borderTop}
          style={{
            backgroundColor: borderColor,
          }}
        />
      </div>

      {/* North border */}
      <div className={`${styles.northBorder}`}>
        <div
          className={styles.border}
          style={{
            backgroundColor: borderColor,
          }}
        />
      </div>

      {/* North-East corner */}
      <div className={`${styles.northEastCorner}`}>
        <div
          className={styles.borderTop}
          style={{
            backgroundColor: borderColor,
          }}
        />

        <div
          className={styles.borderRight}
          style={{
            backgroundColor: borderColor,
          }}
        />
      </div>

      {/* West border */}
      <div className={`${styles.westBorder}`}>
        <div
          className={styles.border}
          style={{
            backgroundColor: borderColor,
          }}
        />
      </div>

      {/* Center */}
      <div className={`${styles.center}`}>
        <header
          className={styles.header}
          style={{
            backgroundColor: borderColor,
          }}
        >
          <div role="button" className={styles.closeButton} onClick={minimizeWindow}>
            <CloseIcon fill={textColor} />
          </div>

          <div role="button" className={styles.closeButton} onClick={maximizeWindow}>
            <CloseIcon fill={textColor} />
          </div>

          <div role="button" className={styles.closeButton} onClick={closeWindow}>
            <CloseIcon fill={textColor} />
          </div>
        </header>

        <div className={`${styles.content} ${minimized && styles.minimized}`}>
          <p>Content</p>
        </div>
      </div>

      {/* East border */}
      <div className={`${styles.eastBorder}`}>
        <div
          className={styles.border}
          style={{
            backgroundColor: borderColor,
          }}
        />
      </div>

      {/* South-West corner */}
      <div className={`${styles.southWestCorner}`}>
        <div
          className={styles.borderLeft}
          style={{
            backgroundColor: borderColor,
          }}
        />

        <div
          className={styles.borderBottom}
          style={{
            backgroundColor: borderColor,
          }}
        />
      </div>

      {/* South border */}
      <div className={`${styles.southBorder}`}>
        <div
          className={styles.border}
          style={{
            backgroundColor: borderColor,
          }}
        />
      </div>

      {/* South-East corner */}
      <div className={`${styles.southEastCorner}`}>
        <div
          className={styles.borderBottom}
          style={{
            backgroundColor: borderColor,
          }}
        />

        <div
          className={styles.borderRight}
          style={{
            backgroundColor: borderColor,
          }}
        />
      </div>
    </dialog>
  );
}
