<script lang="ts">
  import { enhance } from "$app/forms";
  import { IconAsteriskSimple } from "@tabler/icons-svelte";
  import { ButtonStyle } from "../../lib/button/button";
  import Button from "../../lib/button/button.svelte";
  import Input from "../../lib/input/input.svelte";
  import Link from "../../lib/link.svelte";
  import { pageContext } from "../../store";
  import type { ActionData } from "./$types";
  import { Turnstile } from "svelte-turnstile";
  import { PUBLIC_CLOUDFLARE_SITE_KEY } from "$env/static/public";

  export let form: ActionData | undefined;

  let formLoading = false;
  pageContext.set("let's get in touch");
</script>

<svelte:head>
  <title>Contact</title>
</svelte:head>

{#if form?.message}
  <div class="mt-auto select-none animate-slide-bottom bottom-0 left-0 absolute w-full p-2 text-grey-700 bg-salmon">
    <span class="font-extrabold uppercase inline-flex *:z-10 items-center gap-4 align-middle m-0">
      <IconAsteriskSimple class="stroke-[3px] w-4 h-4" />
      {form.message}
    </span>
  </div>
{/if}
<form
  method="POST"
  use:enhance={() => {
    formLoading = true;
    return async ({ update }) => {
      formLoading = false;
      update();
    };
  }}
  class="flex flex-col space-y-5"
>
  <Input required title="Name" placeholder="Enter your name" />
  <Input required title="Email" type="email" placeholder="Enter your email" />
  <Input
    required
    multiline
    maxLength={500}
    inputClassName="min-h-40 max-h-60"
    title="Message"
    placeholder="Enter your message"
  />
  <Turnstile siteKey={PUBLIC_CLOUDFLARE_SITE_KEY} theme="dark" />
  <div class="w-full space-y-2">
    <Button className="text-center w-full" loading={formLoading} buttonStyle={ButtonStyle.Primary} type="submit"
      >Send</Button
    >
    <span class="text-center text-sm w-full block"
      >or reach out on <Link href="https://twitter.com/cykreet" decorated>twitter</Link></span
    >
  </div>
</form>
