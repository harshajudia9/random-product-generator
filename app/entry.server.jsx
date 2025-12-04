import { renderToString } from "react-dom/server";
import { ServerRouter } from "react-router";
import { addDocumentResponseHeaders } from "./shopify.server";

export default async function handleRequest(
  request,
  responseStatusCode,
  responseHeaders,
  reactRouterContext,
) {
  addDocumentResponseHeaders(request, responseHeaders);

  let html;
  try {
    html = renderToString(
      <ServerRouter context={reactRouterContext} url={request.url} />
    );
  } catch (error) {
    console.error("Error rendering:", error);
    responseStatusCode = 500;
    html = "Internal Server Error";
  }

  responseHeaders.set("Content-Type", "text/html");

  return new Response(html, {
    headers: responseHeaders,
    status: responseStatusCode,
  });
}
