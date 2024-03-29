interface CloseIconProps {
  /** Default color */
  fill: string;
}
/**
 * The close icon for WinPop
 *
 * **Credit:** ts-thomas on GitHub
 *
 * **Link:** https://github.com/nextapps-de/winbox/tree/master/src/img
 */
export function CloseIcon({ fill }: CloseIconProps): React.ReactElement {
  return (
    <svg xmlns="http://www.w3.org/2000/svg" viewBox="-1 -1 18 18">
      <path
        fill={fill}
        d="M1.613.21l.094.083L8 6.585 14.293.293l.094-.083a1 1 0 011.403 1.403l-.083.094L9.415 8l6.292 6.293a1 1 0 01-1.32 1.497l-.094-.083L8 9.415l-6.293 6.292-.094.083A1 1 0 01.21 14.387l.083-.094L6.585 8 .293 1.707A1 1 0 011.613.21z"
      />
    </svg>
  );
}
