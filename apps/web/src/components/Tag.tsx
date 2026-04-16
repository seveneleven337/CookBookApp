type TagProps = {
  text: string;
  variant?: 'primary' | 'secondary';
};

export default function Tag({ text, variant = 'primary' }: TagProps) {
  const baseStyles = 'backdrop-blur text-xs font-semibold px-3 py-1 rounded-full w-fit';

  const variants = {
    primary: 'bg-card-tag-bg text-gray-700',
    secondary: 'bg-tag-bg text-green-700',
  };

  return <span className={`${baseStyles} ${variants[variant]}`}>{text.trim()}</span>;
}
