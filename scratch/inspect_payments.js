const url = "https://nefnjnngviaywjteduhm.supabase.co/rest/v1/invoice_payments";
const apiKey = "sb_publishable_WwFaeFNaO5DRUGYa3FXWDw_SnsvbW9V";

async function run() {
  try {
    const res = await fetch(url + "?select=*", {
      headers: {
        "apikey": apiKey,
        "Authorization": `Bearer ${apiKey}`
      }
    });
    if (!res.ok) {
      console.error("HTTP Error:", res.status, await res.text());
      return;
    }
    const data = await res.json();
    console.log(JSON.stringify(data, null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
