'use client';

import { redirect, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';


const genreOptions: { value: string, text: string }[] = [
  { value: "", text: "Select a genre" },
  { value : "Action", text: "Action" },
  { value : "Adventure", text: "Adventure" },
  { value : "Animation", text: "Animation" },
  { value : "Biography", text: "Biography" },
  { value : "Comedy", text: "Comedy" },
  { value : "Crime", text: "Crime" },
  { value : "Documentary", text: "Documentary" },
  { value : "Drama", text: "Drama" },
  { value : "Family", text: "Family" },
  { value : "Fantasy", text: "Fantasy" },
  { value : "Film-Noir", text: "Film-Noir" },
  { value : "History", text: "History" },
  { value : "Horror", text: "Horror" },
  { value : "Music", text: "Music" },
  { value : "Musical", text: "Musical" },
  { value : "Mystery", text: "Mystery" },
  { value : "Romance", text: "Romance" },
  { value : "Sci-Fi", text: "Sci-Fi" },
  { value : "Short", text: "Short" },
  { value : "Sport", text: "Sport" },
  { value : "Thriller", text: "Thriller" },
  { value : "War", text: "War" },
  { value : "Western", text: "Western" },
];

export default function MoviesSearchForm() {
  const searchParams = useSearchParams();
  const [genre, setGenre] = useState(searchParams.get('genre') ?? '');
  const [search, setSearch] = useState(searchParams.get('search') ?? '');

  async function onSubmit(formData: FormData) {
    const params = [];
    if (genre) { params.push(['genre', genre]); }
    if (search) { params.push(['search', search]); }

    const queryString = new URLSearchParams(params).toString();
    redirect(`/movies/search?${queryString}`);
  }

  function handleSearchChange(event: FormEvent<HTMLInputElement>) {
    setSearch(event.currentTarget.value);
  }

  function handleGenreChange(event: FormEvent<HTMLSelectElement>) {
    setGenre(event.currentTarget.value);
  }

  return (
    <div style={{ margin: '20px' }}>
      <form action={onSubmit} style={{ display: 'inline' }}>
        <select name="genre" value={genre} onChange={handleGenreChange}>
          {genreOptions.map(g => (
            <option key={g.value} value={g.value}>{g.text}</option>
          ))}
        </select>
        <input
          type="text"
          name="search"
          placeholder='Search by movie title'
          value={search}
          onChange={handleSearchChange}
        />
        <button type="submit">Search</button>
      </form>
    </div>
  );
}
