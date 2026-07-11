# MongoDB Atlas Reviews Setup

Reviews are stored in MongoDB Atlas and served through the app's own API route
(`app/api/reviews/route.ts`), since the MongoDB driver runs server-side only
(unlike Supabase's client-side SDK, the connection string must never be
exposed to the browser).

## 1. Create a cluster

1. Sign in at https://cloud.mongodb.com and create a free (M0) cluster.
2. Under **Database Access**, create a database user with a strong password.
3. Under **Network Access**, allow the IP address(es) your app runs from
   (or `0.0.0.0/0` for quick testing/serverless hosts with dynamic IPs).
4. Click **Connect > Drivers** and copy the connection string, e.g.:
   `mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority`

## 2. Collection

No manual schema setup is required — the `reviews` collection is created
automatically on first insert. Documents look like:

```json
{
  "_id": "ObjectId(...)",
  "name": "Ahmad Hassan",
  "phone": "+92 300 1234567",
  "rating": 5,
  "branch": "Naran",
  "comment": "Great food!",
  "isPublished": true,
  "createdAt": "2026-07-11T12:00:00.000Z"
}
```

Only documents with `isPublished: true` are returned by `GET /api/reviews`.
`branch` must be `"Naran"` or `"Besar"` and `rating` an integer from 1-5 —
both are validated server-side in the API route.

Optionally, for faster queries, add an index in Atlas (or via `mongosh`):

```js
db.reviews.createIndex({ isPublished: 1, createdAt: -1 });
```

## 3. Environment variables

Add these to `.env.local` (and to your hosting provider's env settings):

```bash
MONGODB_URI=mongodb+srv://<user>:<password>@<cluster>.mongodb.net/?retryWrites=true&w=majority
MONGODB_DB=moon_restaurant
```

`MONGODB_DB` is optional and defaults to `moon_restaurant`.

Without `MONGODB_URI` set, the reviews page falls back to local preview mode
(sample reviews plus any submitted during the session, not persisted).
