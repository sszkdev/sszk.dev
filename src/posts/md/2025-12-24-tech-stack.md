# 新サービスの技術スタック選定 — 「脱・重厚フレームワーク」とシンプルなモノリスへの挑戦

[旅行者向けのサービスを作りたい](/2025-12-22/new-service)の技術スタックついて考える

現在の Web フロントエンドは群雄割拠の時代だが、あえてその主流とは距離を置き、Hono (TypeScript) による SSR + 最小限の JS という構成で開発を進めることにした。

なぜ「脱・Next.js」なのか
当初は使い慣れている Next.js 15 を検討したが、以下の懸念から採用を見送った。

独自の抽象化への疲弊: 特に Server Actions をはじめとする Next.js 特有の記法やルールに「書かされている」感覚が強く、よりシンプルな構成を求めるようになった。

インフラの制約: 運用コストを抑えるため Cloudflare エコシステムをフル活用したいが、Next.js を Cloudflare 上で動かすための OpenNext 等に限界や不安定さを感じた。

代替フレームワークの選定難: Remix3 や React Router, Astro, TanStack Start も検討したが、Next.js ほどの巨大なエコシステムと安定感があるとは言い難く、個人開発で採用するには「ライブラリ選定の迷い」がストレスになると判断した。

採用する技術スタック
基本方針は「シンプルなモノリス」と「Cloudflare ネイティブ」である。

Runtime/Framework: Hono

ゼロディペンデンシーかつ標準 Web API 準拠。Cloudflare Workers との相性が最高。

Frontend Strategy: Hono html (SSR) + Vanilla TS / React

基本は Hono のテンプレートエンジンで HTML を返し、動的なインタラクションが必要な箇所にのみ JS をピンポイントで注入する

Infrastructure: Cloudflare (Workers, D1, R2)

Auth: Firebase Authentication(認証・認可周りは Better Auth も検討したが、DB 管理やセッションのライフサイクル、セキュリティの担保など、実装の核心部分に深く関わりたくない・責任を持ちたくないという理由で、マネージドな Firebase に寄せることにした)

ORM: Drizzle ORM

Validation: Valibot (ゼロディペンデンシーで軽量)

この構成の狙い
このスタックの肝は、**「フレームワークの制約から自由になること」**だ。

サービス特性上、静的なコンテンツが多く、複雑な状態管理が必要な画面は限定的である。そのため、最初から重厚な SPA フレームワークを前提とするのではなく、まずは HTML を返す。そして、UI ライブラリの恩恵を受けたい時だけ、世界で最も堅牢な React のエコシステムを部分的に拝借する。

ルーティングや OGP 対応で頭を悩ませる CSR (Vite + React) 構成のデメリットを避けつつ、Hono という「薄い」レイヤーの上で、TypeScript の表現力を最大限に活かすシンプルな開発体験を目指したい。
