type TagProps = {
  text: string;
  variant?: 'primary' | 'secondary' | 'tertiary';
};

export default function Tag({ text, variant = 'primary' }: TagProps) {
  const baseStyles = 'backdrop-blur text-xs font-semibold  rounded-full w-fit';

  const variants = {
    primary: 'bg-card-tag-bg text-gray-700 px-3 py-1',
    secondary: 'bg-tag-bg text-green-700 px-3 py-1',
    tertiary: 'text-gray-800 px-0 py-1 text-input-text-active font-normal text-md',
  };

  return <span className={`${baseStyles} ${variants[variant]}`}>{text.trim()}</span>;
}
