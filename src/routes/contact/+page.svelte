<script lang="ts">
  import { enhance } from "$app/forms";
  import { IconAsteriskSimple } from "@tabler/icons-svelte";
  import { ButtonStyle } from "../../lib/button/button";
  import Button from "../../lib/button/button.svelte";
  import Input from "../../lib/input/input.svelte";
  import Link from "../../lib/link.svelte";
  import { pageContext } from "../../store";
  import type { ActionData } from "./$types";

  export let form: ActionData | undefined;

  let formLoading = false;
  pageContext.set("let's get in touch");

  const onMessageClick = (event: Event) => {
    form = undefined;
  };
</script>

<svelte:head>
  <title>Contact</title>
</svelte:head>

{#if form?.message}
  <button
    on:click={onMessageClick}
    class="mt-auto select-none animate-slide-bottom bottom-0 left-0 absolute w-full p-2 text-left text-grey-700 bg-salmon"
  >
    <span class="font-extrabold uppercase inline-flex *:z-10 gap-4 items-center align-middle m-0">
      <IconAsteriskSimple class="stroke-[3px] w-4 h-4" />
      {form.message}
    </span>
  </button>
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
  <div class="w-full space-y-2">
    <Button className="text-center w-full" loading={formLoading} buttonStyle={ButtonStyle.Primary} type="submit">
      Send
    </Button>
    <span class="text-center text-sm w-full block">
      or reach out on <Link href="https://twitter.com/cykreet" decorated>twitter</Link>
    </span>
  </div>
</form>
