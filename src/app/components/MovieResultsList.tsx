'use server';

import MovieCard from '@/app/components/MovieCard';
import { API_KEY, API_URL_BASE } from '@/app/static';
import type { Movie } from '@/app/types';


type MovieSearchResponse = {
  data: Movie[],
  totalPages: number,
}

const limit = 20;


export default async function MovieResultsList({ searchParams }: { searchParams: { [key: string]: string } }) {
  const currentPage: number = searchParams?.page ? Number(searchParams.page) : 1;

  function getSearchParams(pageNum: number): string {
    const params = [
      ['page', String(pageNum)],
      ['limit', String(limit)],
    ]
    if (searchParams.genre) { params.push(['genre', searchParams.genre]); }
    if (searchParams.search) { params.push(['search', searchParams.search]); }
    return '?' + new URLSearchParams(params).toString();
  }

  async function getMovies(): Promise<MovieSearchResponse> {
    const url = `${API_URL_BASE}/movies${getSearchParams(currentPage)}`;
    const res = await fetch(
      url,
      { headers: { Accept: 'application/json', Authorization: `Bearer ${API_KEY}` } }
    );

    if (!res.ok) {
      return { data: [], totalPages: 0 };
    }
    const temp = await res.json();
    return temp;
  }
  
  const { data, totalPages } = await getMovies();
  console.log('totalPages', totalPages)

  const nextPage = currentPage === totalPages ? currentPage : currentPage + 1;
  const prevPage = currentPage === 1 ? 1 : currentPage - 1;
  const prevURL = `/movies/search${getSearchParams(prevPage)}`;
  const firstURL = `/movies/search${getSearchParams(1)}`;
  const lastURL = `/movies/search${getSearchParams(totalPages)}`;
  const nextURL = `/movies/search${getSearchParams(nextPage)}`;

  const pagination = (
    <div style={{ display: 'inline' }}>
      <a href={prevURL}>{'<<Previous'}</a>
      {'  '}
      <a href={firstURL}>1</a>
      {' ... '}
      {` ${currentPage} `}
      {' ... '}
      <a href={lastURL}>{totalPages}</a>
      {'  '}
      <a href={nextURL}>{'Next>>'}</a>
    </div>
  );

  return (
    <div>
      <div style={{ marginBottom: '10px' }}>
        results: {totalPages * limit}
      </div>
      {pagination}
      <div
        style={{
          margin: '20px',
          display: 'flex',
          gap: '20px',
          flexWrap: 'wrap',
          justifyContent: 'space-evenly',
        }}
      >
        {data.map(movie => (
          <MovieCard key={movie.id} movie={movie} searchParams={getSearchParams(currentPage)} />
        ))}
      </div>
      {pagination}
    </div>
  );
}
