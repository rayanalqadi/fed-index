// lib/redis.js
// عميل Redis بسيط باستخدام REDIS_URL (متغير البيئة اللي يضيفه تكامل Vercel
// Redis الجديد تلقائيًا) - بديل @vercel/kv المتوقف

const { createClient } = require("redis");

let client = null;

async function getClient() {
  if (client && client.isOpen) return client;
  client = createClient({ url: process.env.REDIS_URL });
  client.on("error", (err) => console.error("Redis Client Error", err));
  await client.connect();
  return client;
}

async function kvGet(key) {
  const c = await getClient();
  const raw = await c.get(key);
  return raw ? JSON.parse(raw) : null;
}

async function kvSet(key, value) {
  const c = await getClient();
  await c.set(key, JSON.stringify(value));
}

module.exports = { kvGet, kvSet };
