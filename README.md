# Movie Search Page

This is a user interface for a 3rd party movie API.

A user can:

- search movies by title
- search movies by genre
- see search results count
- see search results cards (clickable)
  - paginated
- see details on a movie

## Project personal highlights

1. Working with Next.js

This is the most Next.js I've written. Before this I had spent about 3 hours checking it out and tinkering. So this was a super fun exercise in getting familiar with this new framework. 

I'm sure it's not novel but I am proud of the single page solution I devised (there is a detail view page as well, but for the core requirements just the main one). There is one page with both the search and results features. All of the state uses the search params as a source of truth, so across navigates I add a new param and the page reloads with a new fetch having been called.

2. Deploying to AWS EC2

I'm currently going through my AWS certifications, so I have done some labs for practice with a couple services; but to put these skills to use for something more than a simulation was a great to solidify the theory with something tangible. 

With this deployment I also incorporated Nginx as a reverse proxy. I really enjoyed learning the benefits of configuration for this industry standard tool.

- What I would add next to the project:

My first instinct is to product-ify the app. To me this means adding auth and a database component to the system. Then I could do many things like add likes or reviews and a recommendation feature based on that data. I'm sure it exists but something like a GoodReads but for movies could be fun. Everyone always has the "OK what are you watching now" convo and it'd be good to be able to pull ideas from others' lists when I'm settling in for a show.

## Running locally

First, `npm install`

Then, run the development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

### Stack

This is a [Next.js](https://nextjs.org/) project bootstrapped with [`create-next-app`](https://github.com/vercel/next.js/tree/canary/packages/create-next-app).

