# FunWithKids.ch

## Configuration

```bash
PUBLIC_SUPABASE_URL=
PUBLIC_SUPABASE_KEY=
```

## Database

FunWithKids.ch is using Supabase.

### Typescript

To update type definitions run

```
npx supabase gen types typescript --project-id $SUPABASE_PROJECT_ID --schema public > src/supabase.d.ts
```

## Deployment

Deployed to Netlify
