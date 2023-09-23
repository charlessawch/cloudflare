/**
 * Welcome to Cloudflare Workers! This is your first worker.
 *
 * - Run "npm run dev" in your terminal to start a development server
 * - Open a browser tab at http://localhost:8787/ to see your worker in action
 * - Run "npm run deploy" to publish your worker
 *
 * Learn more at https://developers.cloudflare.com/workers/
 */

addEventListener('fetch', (event) => {
  const request = event.request;

  // Get the client's IP address from the 'cf-connecting-ip' header
  const clientIP = request.headers.get('cf-connecting-ip');

  if (clientIP) {
    // Create a response that includes the client's IP address
    const country = request.cf.country;
    const asn = request.cf.asn;

    if (country !== "SG") {
      event.respondWith(Response.redirect("https://1.1.1.1/"));
    }else{
    event.respondWith(new Response(`This is your ${clientIP} and you are accessing this site from ${country} | ${asn}.`, { status: 200 }));
  }
  } else {
    // Handle the case where the IP address is not available
    event.respondWith(Response.redirect("https://1.1.1.1/"));
  }
});
