<script lang="ts">
  import Pincode from "svelte-pincode/unstyled/Pincode.svelte";
  import PincodeInput from "svelte-pincode/unstyled/PincodeInput.svelte";
  import Link from "$lib/link.svelte";
  import { pageContext } from "../../store";
  import { onMount } from "svelte";
  import type { ActionData, PageData } from "./$types";
  import { enhance } from "$app/forms";

  export let form: ActionData | undefined;
  export let data: PageData;

  let value = "";
  // only set to the query code if the form hasn't failed otherwise we run
  // into a loop of: try query code from params > fail > try query code from params > etc
  let code = !form?.failed ? data.queryCode?.split("") : [];
  let firstInput: any;
  let codeForm: HTMLFormElement;

  onMount(() => firstInput.focus());
  pageContext.set("take a look at my resume");
</script>

<svelte:head>
  <title>Resume</title>
</svelte:head>

<div class="flex flex-col space-y-8">
  <form
    method="POST"
    bind:this={codeForm}
    use:enhance={() => {
      return async ({ update }) => {
        update();
      };
    }}
  >
    <input type="text" class="hidden" name="code" {value} />
    <Pincode
      class="flex flex-row space-x-10 h-30 text-2xl {form?.failed && '*:border-red-500!'}"
      type="numeric"
      bind:value
      bind:code
      on:complete={() => {
        codeForm.submit();
      }}
    >
      <PincodeInput bind:ref={firstInput} placeholder="1" class="pincode-input" />
      <PincodeInput placeholder="2" class="pincode-input" />
      <PincodeInput placeholder="3" class="pincode-input" />
      <PincodeInput placeholder="4" class="pincode-input" />
      <PincodeInput placeholder="5" class="pincode-input" />
    </Pincode>
  </form>
  <p>
    Access to my resume is secured behind temporary access codes, if you haven't received a link to view it directly,
    please contact me <Link href="/contact" decorated>here</Link>.
  </p>
</div>
