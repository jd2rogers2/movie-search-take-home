'use server';

import Image from 'next/image';
import type { Movie } from '@/app/types';


export default async function MovieCard(
  { movie, searchParams }: { movie: Movie, searchParams: string },
) {
  return (
    <div>
      <a href={`/movies/${movie.id}${searchParams}`}>
        {movie.posterUrl && (
          <Image
            src={movie.posterUrl}
            width={150}
            height={150}
            alt={movie.title + ' poster'}
          />
        )}
        <p>{movie.title}</p>
        <p>rated: {movie.rating}</p>
      </a>
    </div>
  );
};
