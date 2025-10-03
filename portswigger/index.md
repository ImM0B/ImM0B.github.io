---
layout: default
title: Portswigger
---

# {{ page.title }}

<div class="cards">
  <div class="card"><h3><a href="{{ '/portswigger/sqli/' | relative_url }}">SQL injection</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/authentication/' | relative_url }}">Authentication</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/path-traversal/' | relative_url }}">Path traversal</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/command-injection/' | relative_url }}">Command injection</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/business-logic-vulnerabilities/' | relative_url }}">Business logic vulnerabilities</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/information-disclosure/' | relative_url }}">Information disclosure</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/access-control/' | relative_url }}">Access control</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/file-upload-vulnerabilities/' | relative_url }}">File upload vulnerabilities</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/race-conditions/' | relative_url }}">Race conditions</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/ssrf/' | relative_url }}">Server-Side Request Forgery (SSRF)</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/xxe/' | relative_url }}">External Entity Attack (XXE)</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/nosqli/' | relative_url }}">NoSQL injection</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/api-testing/' | relative_url }}">API testing</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/web-cache-deception/' | relative_url }}">Web cache deception</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/xss/' | relative_url }}">Cross-site scripting (XSS)</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/csrf/' | relative_url }}">Cross-site request forgery (CSRF)</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/cors/' | relative_url }}">Cross-Origin Resource Sharing (CORS)</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/clickjacking/' | relative_url }}">Clickjacking</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/dom-based/' | relative_url }}">DOM-based vulnerabilities</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/websockets/' | relative_url }}">WebSockets</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/insecure-deserialization/' | relative_url }}">Insecure deserialization</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/llm/' | relative_url }}">Web LLM attacks</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/graphql/' | relative_url }}">GraphQL API Attacks</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/ssti/' | relative_url }}">Server Side Template Injection (SSTI)</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/web-cache-poisoning/' | relative_url }}">Web cache poisoning</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/http-host-header-attacks/' | relative_url }}">HTTP Host header attacks</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/http-request-smuggling/' | relative_url }}">HTTP request smuggling</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/oauth/' | relative_url }}">OAuth Authentication</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/jwt/' | relative_url }}">JWT attacks</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/prototype-pollution/' | relative_url }}">Prototype pollution</a></h3></div>
  <div class="card"><h3><a href="{{ '/portswigger/essential-skills/' | relative_url }}">Essential skills</a></h3></div>
</div>

{% if site.web.size > 0 %}
<h2>Notas Generales</h2>
<ul class="post-list">
  {% for item in site.web %}
    <li><a href="{{ item.url | relative_url }}">{{ item.title }}</a></li>
  {% endfor %}
</ul>
{% endif %}
