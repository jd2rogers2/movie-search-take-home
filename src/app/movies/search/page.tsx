'use server';

import MoviesSearchForm from '@/app/components/MoviesSearchForm';
import MovieResultsList from '@/app/components/MovieResultsList';
import { Suspense } from 'react';


export default async function MoviesSearch({ searchParams }: { searchParams: { [key: string]: string } }) {
  return (
    <main style={{ marginTop: '20px' }}>
      <h1>Movie Search! :)</h1>
      <Suspense fallback={<p>loading...</p>}>
        <MoviesSearchForm />
      </Suspense>
      <MovieResultsList searchParams={searchParams} />
    </main>
  );
}
