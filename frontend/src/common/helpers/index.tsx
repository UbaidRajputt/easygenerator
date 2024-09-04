import React from "react";

type RenderIfProps = {
  children: React.ReactNode;
  isTrue: boolean;
};

export const RenderIf = ({ children, isTrue }: RenderIfProps) => {
  return isTrue ? <>{children}</> : null;
};
