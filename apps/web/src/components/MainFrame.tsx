'use client';
import React, { useState } from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';
import { useUserStore } from '@/data/store/authStore';

export default function MainFrame() {
  const router = useRouter();
  const [search, setSearch] = useState('');
  const user = useUserStore((state) => state.user);
  const SearchHandler = () => {
    if (!user?.token) router.push('/redirect');
    else if (search) router.push(`/search/${search}`);
  };

  return (
    <div className="w-full h-200 flex flex-row items-center justify-center pt-10 gap-30 bg-landing-bg bg-linear-to-tl from-landing-bg to-tertiary">
      <div className="flex w-150 h-full items-center justify-center flex-col p-4">
        <h1 className="text-6xl w-full font-bold text-text-title">Discover Delicious Recipes,</h1>
        <h1 className="text-6xl w-full font-bold italic text-text-title-variant">
          Made with love.
        </h1>
        <h2 className="flex w-full font-normal text-2xl text-text-subtitle items-center justify-center pt-8">
          Explore our collection of seasonal, organic recipes designed to bring the joy of gourmet
          cooking into your home kitchen
        </h2>
        <fieldset className="flex flex-row border border-gray-200 rounded-2xl px-4 py-2 bg-input-bg focus-within:border-primary transition mt-8 w-full">
          <input
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search by recipe or ingredient"
            className="w-full outline-none text-input-text bg-transparent text-md"
          />
          <button
            className="rounded-2xl bg-form-btn-bg px-6 py-2 text-white font-bold text-base hover:bg-form-btn-bg-hover"
            onClick={SearchHandler}
          >
            Search
          </button>
        </fieldset>
      </div>

      <div className="flex w-110 h-full items-center justify-center flex-col p-4">
        <Image
          src="/mainFrameImage.webp"
          alt="Delicious food"
          width={300}
          height={300}
          className="w-full h-auto object-cover rounded-3xl shadow-2xl rotate-5 "
          loading="eager"
          priority
        />
      </div>
    </div>
  );
}
