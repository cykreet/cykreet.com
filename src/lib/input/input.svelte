<script lang="ts">
  import clsx from "clsx";
  import Pill from "../pill.svelte";
  import type { HTMLInputTypeAttribute } from "svelte/elements";

  export let placeholder = "";
  export let title = "";
  export let inputClassName = "";
  export let type: HTMLInputTypeAttribute = "text";
  export let required = false;
  export let multiline = false;
  export let maxLength: number | undefined = undefined;

  $: inputText = "";
  $: validationError = "";
  $: inputClassNames = clsx(
    "w-full bg-transparent outline-none transition-all text-white text-wrap border-grey-300 align-text-top border-2 p-2 max-w-full rounded-md text focus:border-salmon",
    inputClassName,
    validationError && "!mb-2",
  );

  const inputName = title.toLowerCase().replace(" ", "-");
  const inputElement = multiline ? "textarea" : "input";
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const validate = (inputValue: string) => {
    if (maxLength && inputValue.length > maxLength)
      validationError = `${title} must be less than ${maxLength} characters`;
    else if (type === "email" && emailRegex.test(inputValue) === false) validationError = "Invalid email address";
    else if (validationError && inputValue.length >= 0) validationError = "";
  };

  const onInput = (
    event: Event & {
      currentTarget: (EventTarget & HTMLInputElement) | HTMLTextAreaElement;
    },
  ) => {
    const inputValue = event.currentTarget.value.trim();
    validate(inputValue);
    inputText = inputValue;
  };

  const onSubmit = (event: SubmitEvent) => {
    validate(inputText);
  };

  const onBlur = () => {
    if (inputText.length === 0) validationError = `${title} is required`;
  };
</script>

<div class="flex flex-col space-y-1">
  <div class="flex justify-between items-center">
    <span class={validationError ? "text-salmon" : "text-white"}>{title}</span>
    {#if maxLength}
      <Pill className="text-xs border-none bg-salmon">{inputText.length} / {maxLength}</Pill>
    {/if}
  </div>
  <svelte:element
    this={inputElement}
    name={inputName}
    class={inputClassNames}
    {type}
    {required}
    {placeholder}
    on:input={onInput}
    on:submit={onSubmit}
    on:blur={onBlur}
    maxlength={maxLength}
    value={inputText}
  />
  {#if validationError}
    <p class="text-salmon text-sm animate-slide-left">{validationError}</p>
  {/if}
</div>
