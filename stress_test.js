// Native fetch is available in Node.js 18+

const TARGET_URL = 'https://hr-app.bromn.biz.id/my_company/dashboard/attendance/today';
const CONCURRENCY = 20; // Increased concurrency slightly
const TOTAL_REQUESTS = 2000; // Increased total requests for a better test

const HEADERS = {
  'accept': 'text/html,application/xhtml+xml,application/xml;q=0.9,image/avif,image/webp,image/apng,*/*;q=0.8,application/signed-exchange;v=b3;q=0.7',
  'accept-language': 'en-US,en;q=0.9,id-ID;q=0.8,id;q=0.7',
  'cache-control': 'max-age=0',
  'cookie': '_ga=GA1.1.1291672049.1763023736; _ga_1M98KG0442=GS2.1.s1763852062$o1$g1$t1763852074$j48$l0$h0; _ga_6HKZVKRNCB=GS2.1.s1767397833$o3$g0$t1767397835$j58$l0$h0; auth-token=eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjEiLCJlbWFpbCI6InRlbmFudEBleGFtcGxlLmNvbSIsImZpcnN0TmFtZSI6IlRlbmFudCIsImxhc3ROYW1lIjoiQ29tcGFueSIsInRlbmFudFNsdWciOiJteV9jb21wYW55Iiwicm9sZSI6IkFETUlOIiwiaWF0IjoxNzY3NDEwMTExLCJleHAiOjE3Njc0OTY1MTF9.o6PbFbwrzfytHkzIgJQmJh4ZbWP6CJRpy5lQtcOL43w; _ga_52PZ46RVLL=GS2.1.s1767410335$o26$g0$t1767410335$j60$l0$h0',
  'dnt': '1',
  'priority': 'u=0, i',
  'sec-ch-ua': '"Google Chrome";v="143", "Chromium";v="143", "Not A(Brand";v="24"',
  'sec-ch-ua-mobile': '?0',
  'sec-ch-ua-platform': '"macOS"',
  'sec-fetch-dest': 'document',
  'sec-fetch-mode': 'navigate',
  'sec-fetch-site': 'same-origin',
  'sec-fetch-user': '?1',
  'upgrade-insecure-requests': '1',
  'user-agent': 'Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/143.0.0.0 Safari/537.36'
};

async function stressTest() {
  console.log(`Starting stress test against: ${TARGET_URL}`);
  console.log(`Concurrency: ${CONCURRENCY}, Total Requests: ${TOTAL_REQUESTS}`);

  let completed = 0;
  let errors = 0;
  const start = Date.now();
  const requests = [];

  for (let i = 0; i < TOTAL_REQUESTS; i++) {
    // Control concurrency
    if (requests.length >= CONCURRENCY) {
        await Promise.race(requests);
    }
    
    const p = fetch(TARGET_URL, {
      method: 'GET',
      headers: HEADERS
    }).then(async (res) => {
        if (res.ok) {
            // console.log(`Req ${i+1}: Success (${res.status})`);
        } else {
            console.log(`Req ${i+1}: Failed (${res.status})`);
            errors++;
        }
        // Consume body to free resources
        try { await res.text(); } catch {}
    }).catch(err => {
        console.log(`Req ${i+1}: Error (${err.message})`);
        errors++;
    }).finally(() => {
        completed++;
        requests.splice(requests.indexOf(p), 1);
    });

    requests.push(p);
  }

  await Promise.all(requests);
  
  const duration = (Date.now() - start) / 1000;
  console.log(`\nTest completed in ${duration.toFixed(2)}s`);
  console.log(`Total Requests: ${TOTAL_REQUESTS}`);
  console.log(`Successful: ${completed - errors}`);
  console.log(`Errors: ${errors}`);
  console.log(`RPS: ${(TOTAL_REQUESTS / duration).toFixed(2)}`);
}

stressTest();
