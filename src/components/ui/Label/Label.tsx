"use client";

export type LabelProps = Omit<
  React.LabelHTMLAttributes<HTMLLabelElement>,
  "className"
>;

const Label: React.FC<LabelProps> = (props) => {
  return <label className="block font-semibold" {...props} />;
};

export default Label;
