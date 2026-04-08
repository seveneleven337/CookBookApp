import Image from 'next/image';

type CategoryCardProps = {
  title: string;
  img: string;
  height?: number;
  width?: number;
};

export default function CategoryCard({
  title = 'Breakfast',
  img = '/landingpage1.png',
  height = 300,
  width = 200,
}: CategoryCardProps) {
  return (
    <div className="relative rounded-2xl overflow-hidden" style={{ width, height }}>
      <Image src={img} alt={title} fill className="object-cover" />

      <div className="absolute inset-0 bg-black/40"></div>

      <div className="absolute inset-0 flex items-center justify-center text-white font-semibold text-xl">
        {title}
      </div>
    </div>
  );
}
