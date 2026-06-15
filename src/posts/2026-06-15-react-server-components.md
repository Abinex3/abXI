---
title: "What I Learned This Week: React Server Components"
slug: "react-server-components"
date: "2026-06-15"
excerpt: "A quick rundown of how React Server Components change the way we think about data fetching and bundle size."
tags: ["React", "Weekly Notes"]
---

This week I dug into **React Server Components** and wanted to write down what
finally made them click for me.

## The core idea

Server Components run on the server and never ship their JavaScript to the
browser. That means you can do data fetching right inside the component without
adding to the client bundle.

## Why it matters

- Smaller bundles, because non-interactive components stay on the server.
- Data fetching lives next to the component that needs it.
- You still use regular Client Components (`"use client"`) wherever you need interactivity.

```jsx
// A server component — no "use client" needed
async function PostList() {
  const posts = await db.posts.findAll();
  return posts.map((p) => <Post key={p.id} {...p} />);
}
```

## What tripped me up

The hardest part was the mental model: knowing *which* components must be client
components. The rule I settled on — if it uses state, effects, or browser APIs,
it's a client component. Everything else can stay on the server.

That's it for this week.