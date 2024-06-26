# tinyboard

A small dashboard for Tinybird EP

## Setup

Make sure to first setup your `.env.local` as shown in the [.env.example](.env.example).
Make sure to replace `TOKEN_123` with a valid token for `NEXT_PUBLIC_TOKEN` variable.

Afterwards, run:

```$
npm i
npm run dev
```

## Decisions

Looking at the data set behind the API we can notice 2 important things:

- there are only 2 distinct vendors
- the data for the rides is covering only a single month
