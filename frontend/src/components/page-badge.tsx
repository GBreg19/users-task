interface BadgeProps {
  title: string;
}

const PageBadge = ({ title }: BadgeProps) => {
  return <div className="p-3 font-normal font-Noto-Light my-4 rounded-md bg-slate-300">{title}</div>;
};

export default PageBadge;
