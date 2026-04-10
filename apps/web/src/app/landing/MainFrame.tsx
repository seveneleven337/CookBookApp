'use client';
import React from 'react';
import Image from 'next/image';
import { useRouter } from 'next/navigation';

export default function MainFrame() {
  const router = useRouter();
  const SearchHandler = () => {
    router.push('/redirect');
  };

  return (
    <div className="w-full h-200 flex flex-row items-center justify-center pt-30 gap-10  bg-landing-bg bg-linear-to-tl from-landing-bg to-tertiary">
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
            value={''}
            onChange={() => {}}
            type="email"
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

      <div className="flex w-130 h-full items-center justify-center flex-col p-4">
        <Image
          src="/landingpage1.webp"
          alt="Delicious food"
          width={400}
          height={400}
          className="w-full h-auto object-cover rounded-3xl shadow-2xl"
          loading="eager"
          priority
        />
      </div>
    </div>
  );
}
