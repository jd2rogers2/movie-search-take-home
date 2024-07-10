'use server';

import MoviesSearchForm from '@/app/components/MoviesSearchForm';
import MovieResultsList from '@/app/components/MovieResultsList';


export default async function MoviesSearch({ searchParams }: { searchParams: { [key: string]: string } }) {
  return (
    <main>
      <MoviesSearchForm />
      <MovieResultsList searchParams={searchParams} />
    </main>
  );
}
