const url = "https://nefnjnngviaywjteduhm.supabase.co/rest/v1/rpc/reverse_payment_and_adjust_reserve";
const apiKey = "sb_publishable_WwFaeFNaO5DRUGYa3FXWDw_SnsvbW9V";

// Only the ones that failed or need deletion
const duplicatePaymentIds = [
  "36e5ccf2-186b-4bf8-b1ae-ce21e4683bb0", // CLTD-REC-2026-0002
  "280ec576-5646-42ec-8aee-fa0e4dd1a6de", // CLTD-REC-2026-0004
  "535c4f1a-c30f-4947-80e8-2a990bbb5e43", // CLTD-REC-2026-0005
  "c504c9f2-3f50-434c-9eb2-6a0393001a84"  // CLTD-REC-2026-0006
];

const reversedBy = "1aac93d1-2aab-43f4-9b83-82c519268f21"; // The user who recorded them

const delay = ms => new Promise(resolve => setTimeout(resolve, ms));

async function deletePayment(id) {
  const payload = {
    p_payment_id: id,
    p_reason: "Reversing duplicate payment input",
    p_reversed_by: reversedBy
  };
  const res = await fetch(url, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      "apikey": apiKey,
      "Authorization": `Bearer ${apiKey}`
    },
    body: JSON.stringify(payload)
  });
  if (!res.ok) {
    throw new Error(`Failed to delete payment ${id}: ${res.status} ${await res.text()}`);
  }
  console.log(`Successfully reversed duplicate payment ${id}`);
}

async function run() {
  for (const id of duplicatePaymentIds) {
    try {
      await deletePayment(id);
      console.log("Waiting 1.5s to prevent timestamp key collision...");
      await delay(1500);
    } catch (err) {
      console.error(err.message);
    }
  }
}

run();
