import React, { useCallback, useEffect, useMemo, useRef, useState } from 'react';
import styles from './_WinPop.module.scss';
import * as CSS from 'csstype';
import { CloseIcon } from './icons/CloseIcon';
import { getPositionsFromEvent } from './util/helperFunctions';

const PAGE_WIDTH = document.documentElement.clientWidth;
const PAGE_HEIGHT = document.documentElement.clientHeight;

type WinPopPosition = 'bottomLeft' | 'bottomRight' | 'center' | 'topLeft' | 'topRight';
type WinPopDimensions = {
  width: number;
  height: number;
};
type WinPopCoordinates = {
  x: number;
  y: number;
};
enum WinPopState {
  MINIMIZED = 'minimized',
  MAXIMIZED = 'maximized',
  NORMAL = 'normal',
}

const DEFAULT_SIZE: WinPopDimensions = {
  width: PAGE_WIDTH / 2,
  height: PAGE_HEIGHT / 2,
};
const MAXIMIZED_SIZE: WinPopDimensions = {
  width: PAGE_WIDTH,
  height: PAGE_HEIGHT,
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
   *    width: 1280;
   *    height: 720;
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
  onClose,
  position = 'center',
  startingSize,
  borderColor = 'black',
  textColor = 'white',
}: WinPopProps): React.ReactElement | null {
  const dialogRef = useRef<HTMLDialogElement | null>(null);

  const DEFAULT_POSITIONS: Record<WinPopPosition, WinPopCoordinates> = useMemo(() => {
    const width = startingSize ? startingSize.width : DEFAULT_SIZE.width;
    const height = startingSize ? startingSize.height : DEFAULT_SIZE.height;

    const centerY = PAGE_HEIGHT / 2 - height / 2;
    const centerX = PAGE_WIDTH / 2 - width / 2;

    return {
      bottomLeft: {
        x: 0,
        y: PAGE_HEIGHT - height,
      },
      bottomRight: {
        x: PAGE_WIDTH - width,
        y: PAGE_HEIGHT - height,
      },
      center: {
        x: centerX,
        y: centerY,
      },
      topLeft: {
        x: 0,
        y: 0,
      },
      topRight: {
        x: PAGE_WIDTH - width,
        y: 0,
      },
    };
  }, [startingSize]);
  const ID = useMemo(() => {
    // Find all WinPop dialogs
    const dialogs = document.querySelectorAll('dialog[id^="winpop-"]');

    // Return the next available ID
    return `winpop-${dialogs.length}`;
  }, []);

  const [winPopState, setWinPopState] = useState<WinPopState>(WinPopState.NORMAL);
  const [currentSize, setCurrentSize] = useState<WinPopDimensions>(startingSize ?? DEFAULT_SIZE);
  const [previousSize, setPreviousSize] = useState<WinPopDimensions>(startingSize ?? DEFAULT_SIZE);
  const [currentPosition, setCurrentPosition] = useState<WinPopCoordinates>(DEFAULT_POSITIONS[position]);
  const [previousPosition, setPreviousPosition] = useState<WinPopCoordinates>(DEFAULT_POSITIONS[position]);
  const [previousMousePosition, setPreviousMousePosition] = useState<WinPopCoordinates>({
    x: 0,
    y: 0,
  });
  const [draggable, setDraggable] = useState<boolean>(false);

  const isNormal = winPopState === WinPopState.NORMAL;
  const isMinimized = winPopState === WinPopState.MINIMIZED;
  const isMaximized = winPopState === WinPopState.MAXIMIZED;

  const minimizeWindow = () => {
    setWinPopState(WinPopState.MINIMIZED);
    setCurrentSize({
      width: 200,
      height: 45,
    });
    setCurrentPosition({
      x: 0,
      y: PAGE_HEIGHT - 45,
    });
  };

  const unMinimizeWindow = () => {
    setWinPopState(WinPopState.NORMAL);
    setCurrentSize(previousSize);
    setCurrentPosition(previousPosition);
  };

  const maximizeWindow = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    setWinPopState(WinPopState.MAXIMIZED);
    setCurrentPosition(DEFAULT_POSITIONS['topLeft']);
    setCurrentSize(MAXIMIZED_SIZE);
  };

  const unMaximizeWindow = () => {
    setWinPopState(WinPopState.NORMAL);
    setCurrentSize(previousSize);
    setCurrentPosition(previousPosition);
  };

  const resetWinPopState = () => {
    setWinPopState(WinPopState.NORMAL);
    setCurrentSize(startingSize ?? DEFAULT_SIZE);
    setCurrentPosition(DEFAULT_POSITIONS[position]);
  };

  const closeWindow = (event: React.MouseEvent<HTMLDivElement>) => {
    event.stopPropagation();
    event.nativeEvent.stopImmediatePropagation();

    resetWinPopState();

    onClose();
  };

  const dragStart = (event: React.PointerEvent) => {
    setDraggable(true);
    console.log('DRAG START');

    setPreviousMousePosition({
      x: event.clientX,
      y: event.clientY,
    });
  };

  const dragMove = (event: React.PointerEvent) => {
    if (!dialogRef.current) return;

    const { x: currentMousePositionX, y: currentMousePositionY } = getPositionsFromEvent(event);

    const deltaX = currentMousePositionX - previousMousePosition.x;
    const deltaY = currentMousePositionY - previousMousePosition.y;

    const newX = currentPosition.x + deltaX;
    const newY = currentPosition.y + deltaY;

    setCurrentPosition({
      x: newX,
      y: newY,
    });
    setPreviousMousePosition({
      x: currentMousePositionX,
      y: currentMousePositionY,
    });
  };

  const dragEnd = (event: React.PointerEvent) => {
    setDraggable(false);
    console.log('DRAG END');
  };

  return !open ? null : (
    <dialog
      id={ID}
      ref={dialogRef}
      className={`${styles.root} ${isMinimized ? styles.minimized : ''}`}
      open={open}
      style={{
        width: currentSize.width,
        height: currentSize.height,
        transform: `translate(${currentPosition.x}px, ${currentPosition.y}px)`,
      }}
    >
      {/* North-West corner */}
      <div
        className={`${styles.northWestCorner} ${isMinimized ? styles.minimized : ''} ${
          isMaximized ? styles.maximized : ''
        }`}
      />

      {/* North border */}
      <div
        className={`${styles.northBorder} ${isMinimized ? styles.minimized : ''} ${
          isMaximized ? styles.maximized : ''
        }`}
      />

      {/* North-East corner */}
      <div
        className={`${styles.northEastCorner} ${isMinimized ? styles.minimized : ''} ${
          isMaximized ? styles.maximized : ''
        }`}
      />

      {/* West border */}
      <div
        className={`${styles.westBorder} ${isMinimized ? styles.minimized : ''} ${isMaximized ? styles.maximized : ''}`}
      />

      {/* Center */}
      <div
        className={`${styles.center} ${isMinimized ? styles.minimized : ''} ${isMaximized ? styles.maximized : ''}`}
        onClick={isMinimized ? unMinimizeWindow : undefined}
        role={isMinimized ? 'button' : undefined}
      >
        <header
          className={`${styles.header} ${isMinimized ? styles.minimized : ''} ${isMaximized ? styles.maximized : ''}`}
          style={{
            backgroundColor: borderColor,
          }}
          onPointerDown={isNormal ? dragStart : undefined}
          onPointerMove={isNormal && draggable ? dragMove : undefined}
          onPointerUp={isNormal ? dragEnd : undefined}
        >
          {!isMinimized && (
            <div role="button" className={styles.closeButton} onClick={minimizeWindow}>
              <CloseIcon fill={textColor} />
            </div>
          )}

          <div role="button" className={styles.closeButton} onClick={isMaximized ? unMaximizeWindow : maximizeWindow}>
            <CloseIcon fill={textColor} />
          </div>

          <div role="button" className={styles.closeButton} onClick={closeWindow}>
            <CloseIcon fill={textColor} />
          </div>
        </header>

        <div className={`${styles.content} ${isMinimized ? styles.minimized : ''}`}>
          <p>Content</p>
        </div>
      </div>

      {/* East border */}
      <div
        className={`${styles.eastBorder} ${isMinimized ? styles.minimized : ''} ${isMaximized ? styles.maximized : ''}`}
      />

      {/* South-West corner */}
      <div
        className={`${styles.southWestCorner} ${isMinimized ? styles.minimized : ''} ${
          isMaximized ? styles.maximized : ''
        }`}
      />

      {/* South border */}
      <div
        className={`${styles.southBorder} ${isMinimized ? styles.minimized : ''} ${
          isMaximized ? styles.maximized : ''
        }`}
      />

      {/* South-East corner */}
      <div
        className={`${styles.southEastCorner} ${isMinimized ? styles.minimized : ''} ${
          isMaximized ? styles.maximized : ''
        }`}
      />
    </dialog>
  );
}
