const apiKey = "sb_publishable_WwFaeFNaO5DRUGYa3FXWDw_SnsvbW9V";

async function test(queryStr) {
  const url = `https://nefnjnngviaywjteduhm.supabase.co/rest/v1/invoices?${queryStr}`;
  const res = await fetch(url, {
    headers: {
      "apikey": apiKey,
      "Authorization": `Bearer ${apiKey}`
    }
  });
  console.log("Query:", queryStr);
  console.log("Status:", res.status);
  const text = await res.text();
  console.log("Body:", text);
}

async function run() {
  await test("status=neq.void&archived_at=is.null");
}

run();
