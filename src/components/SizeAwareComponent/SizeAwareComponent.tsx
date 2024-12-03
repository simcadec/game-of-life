import * as React from "react";

export function SizeAwareComponent({ children }: Props) {
  const ref = React.useRef<HTMLDivElement>(null);
  const [size, setSize] = React.useState<{
    width: number;
    height: number;
  }>();

  // Update the size when the size container is known
  React.useLayoutEffect(() => {
    if (ref.current) {
      setSize({
        width: ref.current.offsetWidth,
        height: ref.current.offsetHeight,
      });
    }
  }, []);

  // Only render the children when the size is known
  return <div ref={ref}>{size ? children(size) : null}</div>;
}

type Props = {
  children: (size: { width: number; height: number }) => React.ReactNode;
};
