'use server';


const API_URL_BASE = "https://0kadddxyh3.execute-api.us-east-1.amazonaws.com";
const { API_KEY } = process.env;

type MovieSearchResult = {
  id: string,
  title: string,
  posterUrl?: string,
  rating?: string,
};

type MovieSearchResponse = {
  results: MovieSearchResult[],
  count: number,
}

const limit = 10;


export default async function MovieResultsList({ searchParams }: { searchParams: { [key: string]: string } }) {
  const currentPage: number = searchParams?.page ? Number(searchParams.page) : 0;

  function getSearchParams(pageNum: number): string {
    const params = [
      ['page', String(pageNum)],
      ['limit', String(limit)],
    ]
    if (searchParams.genre) { params.push(['genre', searchParams.genre]); }
    if (searchParams.search) { params.push(['search', searchParams.search]); }
    return '?' + new URLSearchParams(params).toString();
  }

  async function getResults(): Promise<MovieSearchResponse> {
    const url = `${API_URL_BASE}/movies${getSearchParams(currentPage)}`;
    const res = await fetch(
      url,
      { headers: { Accept: 'application/json', Authorization: `Bearer ${API_KEY}` } }
    );
    // console.log('res', res)

    if (!res.ok) {
      return { results: [], count: 0 };
    }
    return res.json();
  }

  const { results } = await getResults();

  console.log('results', results)

  const nextPage = currentPage + 1;
  const prevPage = currentPage === 0 ? 0 : currentPage - 1;
  const prevURL = `/movies/search${getSearchParams(prevPage)}`;
  const nextURL = `/movies/search${getSearchParams(nextPage)}`;
  return (
    <div>
      results count
      {results.map(movie => (
        <p key={movie.id}>{movie.title}</p>
      ))}
      <a href={prevURL}>{'<<Previous'}</a>
      <a href={nextURL}>{'Next>>'}</a>
    </div>
  );
}
