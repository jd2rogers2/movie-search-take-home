'use client';

import { redirect, useSearchParams } from 'next/navigation';
import { FormEvent, useState } from 'react';


const genreOptions: { value: string, text: string }[] = [
  { value: "", text: "Select a genre" },
  { value: "action", text: "Action" },
  { value: "comedy", text: "Comedy" },
  { value: "drama", text: "Drama" },
  { value: "fantasy", text: "Fantasy" },
  { value: "horror", text: "Horror" },
  { value: "mystery", text: "Mystery" },
  { value: "romance", text: "Romance" },
  { value: "sci-fi", text: "Sci-Fi" },
  { value: "thriller", text: "Thriller" },
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
