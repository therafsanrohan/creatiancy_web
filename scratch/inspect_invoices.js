const url = "https://nefnjnngviaywjteduhm.supabase.co/rest/v1/invoices";
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
    console.log("Invoices count:", data.length);
    console.log(JSON.stringify(data.map(i => ({
      id: i.id,
      invoice_number: i.invoice_number,
      status: i.status,
      archived_at: i.archived_at,
      created_at: i.created_at
    })), null, 2));
  } catch (err) {
    console.error("Error:", err);
  }
}

run();
