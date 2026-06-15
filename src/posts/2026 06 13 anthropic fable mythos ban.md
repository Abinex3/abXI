---
title: "Anthropic Pulls Fable 5 and Mythos 5 After US Export Order"
slug: "anthropic-fable-mythos-us-ban"
date: "2026-06-13"
excerpt: "The US government ordered Anthropic to block foreign access to its two most powerful models. The result: Fable 5 and Mythos 5 are now offline for everyone. Here's what happened and why it matters."
tags: ["AI News", "Anthropic", "Weekly Notes"]
---

This week brought one of the bigger AI policy stories I've seen in a while, and
it's worth unpacking because it touches on safety, export law, and how fragile
access to frontier models can be.

## What happened

On Friday evening, the US government issued an export control directive ordering
Anthropic to prevent **any foreign national** — whether inside or outside the
United States — from accessing its two newest and most powerful models, **Fable
5** and **Mythos 5**.

Because the order covered all foreign nationals (even Anthropic's own foreign
national employees), the company said the only way to comply was to disable the
two models entirely, for every customer. Access to all of Anthropic's other
models was left untouched.

The directive came from Commerce Secretary Howard Lutnick in a letter to
Anthropic's CEO, written with the Commerce Department's Bureau of Industry and
Security.

## Why the government acted

According to reporting, the Commerce Department moved after another company
claimed it had found a way to "jailbreak" Mythos — bypassing some of the model's
safety guardrails — which raised national security concerns within the
administration.

The worry centers on capability. Fable 5 and Mythos 5 were built on the same
foundation and are strong at finding software vulnerabilities — useful for
defensive security research, but also a potential risk if misused in
cyberattacks.

## Anthropic's response

Anthropic said it is complying with the legal directive, but pushed back on the
reasoning. A few points from their statement:

- The government provided only verbal evidence of the issue, not a detailed
  technical report.
- The same workaround was, in their assessment, likely present in models from
  other providers too.
- They disagree that a narrow potential jailbreak should justify recalling a
  commercial model used by hundreds of millions of people.

They called it a likely misunderstanding and said they're working to restore
access as soon as possible.

## Why it matters

A few things stood out to me:

1. **Frontier model access is more fragile than it looks.** A model that
   launched on Tuesday was pulled by Friday. If you build a product on a
   cutting-edge model, a policy decision outside your control can remove it
   overnight.

2. **The foreign-national clause is broad.** Because the order applied to all
   foreign nationals, Anthropic couldn't carve out a partial solution — it had
   to pull the models for everyone. For developers outside the US, that's a
   reminder that the newest models may not be reliably available to us at all.

3. **Safety and usability are genuinely in tension.** These models were
   marketed as powerful enough to *require* strict guardrails. That same power
   is exactly what drew regulatory attention.

I'll keep following this one — Anthropic says it's trying to get access
restored, so the situation may change quickly.