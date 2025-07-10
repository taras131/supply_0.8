import { createProxyMiddleware } from "http-proxy-middleware";

export default function (app: any) {
  app.use(
    "/api",
    createProxyMiddleware({
      target: "http://212.74.224.210",
      changeOrigin: true,
    }),
  );
}
