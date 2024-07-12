'use server';

import Image from 'next/image';
import { API_KEY, API_URL_BASE } from '@/app/static';

import type { Movie } from '@/app/types';


type Genre = { id: string, title: string };

type MovieDetail = Movie & {
  summary: string,
  duration: string,
  directors: string[],
  mainActors: string[],
  datePublished: string,
  ratingValue: number,
  bestRating: number,
  worstRating: number,
  writers: string[],
  genres: Genre[]
};

export default async function MovieDisplay(
  { searchParams, params: { id } }: {
    searchParams: { [key: string]: string },
    params: { id: string },
  }
) {
  console.log('searchParams', searchParams)
  async function getMovie(): Promise<MovieDetail | null> {
    const url = `${API_URL_BASE}/movies/${id}`;
    const res = await fetch(
      url,
      { headers: { Accept: 'application/json', Authorization: `Bearer ${API_KEY}` } }
    );

    if (!res.ok) {
      return null;
    }
    return await res.json();
  }
  const movie = await getMovie();

  const backURL = '/movies/search?' + new URLSearchParams(Object.entries(searchParams)).toString();

  return movie ? (
    <main style={{ marginTop: '20px' }}>
      <div style={{ marginBottom: '20px' }}>
        <a href={backURL}>{'<< back'}</a>
      </div>
      {movie.posterUrl && (
          <Image
            src={movie.posterUrl}
            width={400}
            height={400}
            alt={movie.title + ' poster'}
          />
        )}
        <p>{movie.title} ({movie.ratingValue}/10)</p>
        <p>released: {movie.datePublished}</p>
        <p>{movie.summary}</p>
        <p>directed by: {movie.directors.join(', ')}</p>
        <p>key actors: {movie.mainActors.join(', ')}</p>
        <p>written by: {movie.writers.join(', ')}</p>
        <p>genres: {movie.genres.map(g => g.title).join(', ')}</p>
        <p>rated: {movie.rating}</p>
    </main>
  ) : (
    'movie not found'
  );
}
