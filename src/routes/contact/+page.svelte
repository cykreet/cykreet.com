<script lang="ts">
  import { enhance } from "$app/forms";
  import IconAsteriskSimple from "virtual:icons/tabler/asterisk-simple";
  import IconExclamationCircle from "virtual:icons/tabler/exclamation-circle";
  import { ButtonStyle } from "$lib/button/button";
  import Button from "$lib/button/button.svelte";
  import Input from "$lib/input/input.svelte";
  import Link from "$lib/link.svelte";
  import { pageContext } from "../../store";
  import type { ActionData } from "./$types";
  import prettyMs from "pretty-ms";
  import { _CLIENT_TTL_MS } from "./+page";

  export let form: ActionData | undefined;

  let formLoading = false;
  pageContext.set("let's get in touch");
</script>

<svelte:head>
  <title>Contact</title>
  <meta name="description" content="let's get in touch" />
</svelte:head>

{#if form?.message}
  <button
    on:click={() => (form = undefined)}
    class="mt-auto select-none animate-slide-bottom bottom-0 left-0 absolute w-full p-2 text-left text-grey-700 bg-lavender"
  >
    <span class="font-extrabold uppercase inline-flex *:z-10 gap-4 items-center align-middle m-0">
      <IconAsteriskSimple class="stroke-[3px] w-4 h-4" />
      {form.message}
    </span>
  </button>
{/if}

<div class="flex flex-col space-y-5">
  <p>
    Use this form to send me a message to my inbox, this is the preferred method of professional communication, I'll try
    my best to get back to you as soon as possible, or reach out on <Link href="https://twitter.com/cykreet" decorated
      >twitter</Link
    >.
  </p>
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
    <div class="w-full space-y-2">
      <Button className="text-center w-full" loading={formLoading} buttonStyle={ButtonStyle.Glass} type="submit">
        Send
      </Button>
      <span class="text-sm w-full inline-flex mx-auto items-center gap-2">
        <IconExclamationCircle class="w-4 h-4" />
        <span>Messages can only be sent every {prettyMs(_CLIENT_TTL_MS, { verbose: true })}.</span>
      </span>
    </div>
  </form>
</div>
