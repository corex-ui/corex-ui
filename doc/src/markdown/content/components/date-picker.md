---
title: Date Picker
description: A pure HTML and vanilla JS implementation of Zag JS Date Picker
author: Netoum
date: 2025-08-20
category: Components
tags:
  - User Interface
  - Accessibility
  - Vanilla JS
  - Corex
  - ZagJS
---

# Date Picker

> A pure HTML and vanilla JS implementation of [Zag JS Date Picker](https://zagjs.com/components/react/date-picker)

A datepicker allows users to enter a date either through text input, or by choosing a date from the calendar.

---

## Anatomy

The Date Picker component consists of the following data parts:

`control`, `input`, `trigger`, `positioner`, `content`, `view-control`, `prev-trigger`, `next-trigger`, `prev-trigger`, , `view-trigger`, `table`, `table-header`, `table-body`

```html
<!-- render:preview -->
<div class="date-picker date-picker-js">
  <div data-part="control">
    <input data-part="input" />
    <button data-part="trigger" aria-label="Date Picker">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
        ></path>
      </svg>
    </button>
  </div>
  <div data-part="positioner">
    <div data-part="content">
      <div class="date-picker__day-view">
        <div data-part="view-control" data-view="day">
          <button data-part="prev-trigger" data-view="day">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              ></path>
            </svg>
          </button>
          <button data-part="view-trigger" data-view="day"></button>
          <button data-part="next-trigger" data-view="day">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </button>
        </div>
        <table data-part="table" data-view="day">
          <thead data-part="table-header" data-view="day"></thead>
          <tbody data-part="table-body" data-view="day"></tbody>
        </table>
      </div>
      <div class="date-picker__month-view">
        <div data-part="view-control" data-view="month">
          <button data-part="prev-trigger" data-view="month">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              ></path>
            </svg>
          </button>
          <button data-part="view-trigger" data-view="month"></button>
          <button data-part="next-trigger" data-view="month">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </button>
        </div>
        <table data-part="table" data-view="month" data-columns="4">
          <tbody data-part="table-body" data-view="month"></tbody>
        </table>
      </div>
      <div class="date-picker__year-view">
        <div data-part="view-control" data-view="year">
          <button data-part="prev-trigger" data-view="year">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              ></path>
            </svg>
          </button>
          <button data-part="view-trigger" data-view="year"></button>
          <button data-part="next-trigger" data-view="year">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </button>
        </div>
        <table data-part="table" data-view="year" data-columns="4">
          <tbody data-part="table-body" data-view="year"></tbody>
        </table>
      </div>
    </div>
  </div>
</div>
```

---

## Data attributes

Each date-picker can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="date-picker date-picker-js"
  data-columns="5"
  data-no-weekend="true"
  data-close-on-select="false"
  data-default-value="2025-06-10"
  data-default-focused-value="2025-06-12"
  data-format="medium"
  data-default-view="month"
  data-fixed-weeks="true"
>
  <div data-part="control">
    <input data-part="input" />
    <button data-part="trigger" aria-label="Date Picker">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
        ></path>
      </svg>
    </button>
  </div>
  <div data-part="positioner">
    <div data-part="content">
      <div class="date-picker__day-view">
        <div data-part="view-control" data-view="day">
          <button data-part="prev-trigger" data-view="day">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              ></path>
            </svg>
          </button>
          <button data-part="view-trigger" data-view="day"></button>
          <button data-part="next-trigger" data-view="day">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </button>
        </div>
        <table data-part="table" data-view="day">
          <thead data-part="table-header" data-view="day"></thead>
          <tbody data-part="table-body" data-view="day"></tbody>
        </table>
      </div>
      <div class="date-picker__month-view">
        <div data-part="view-control" data-view="month">
          <button data-part="prev-trigger" data-view="month">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              ></path>
            </svg>
          </button>
          <button data-part="view-trigger" data-view="month"></button>
          <button data-part="next-trigger" data-view="month">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </button>
        </div>
        <table data-part="table" data-view="month" data-columns="4">
          <tbody data-part="table-body" data-view="month"></tbody>
        </table>
      </div>
      <div class="date-picker__year-view">
        <div data-part="view-control" data-view="year">
          <button data-part="prev-trigger" data-view="year">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              ></path>
            </svg>
          </button>
          <button data-part="view-trigger" data-view="year"></button>
          <button data-part="next-trigger" data-view="year">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </button>
        </div>
        <table data-part="table" data-view="year" data-columns="4">
          <tbody data-part="table-body" data-view="year"></tbody>
        </table>
      </div>
    </div>
  </div>
</div>
```

**id**  
Type: `string`  
Description: The unique id of the component. Default generated if none is provided.

**data-locale**  
Type: `string`  
Description: The locale (BCP 47 language tag) to use when formatting the date. Default `"en-US"`.

**data-dir**  
Type: `ltr | rtl`  
Description: The orientation of the checkbox. Can be `ltr` or `rtl`.

**data-default-open**  
Type: `boolean`  
Description: The initial open state of the date picker when rendered. Use when you don't need to control the open state of the date picker.

**data-close-on-select**  
Type: `boolean`  
Description: Whether the calendar should close after the date selection is complete. This is ignored when the selection mode is multiple.

**data-placeholder**  
Type: `string`  
Description: The placeholder text to display in the input.

**data-selection-mode**  
Type: `"single" || "multiple" || "range"`  
Description: The selection mode of the calendar.

- `single` - only one date can be selected
- `multiple` - multiple dates can be selected
- `range` - a range of dates can be selected

**data-default-value**  
Type: `string || string list`  
Description: The initial selected date(s) when rendered. Use when you don't need to control the selected date(s) of the date picker.

**data-default-view**  
Type: `"day" || "month" || "year"`  
Description: The default view of the calendar.

**data-min-view**  
Type: `"day" || "month" || "year"`  
Description: The minimum view of the calendar.

**data-max-view**  
Type: `"day" || "month" || "year"`  
Description: The maximum view of the calendar.

**data-disabled**  
Type: `boolean`  
Description: Whether the calendar is disabled.

**data-fixed-weeks**  
Type: `boolean`  
Description: Whether the calendar should have a fixed number of weeks. This renders the calendar with 6 weeks instead of 5 or 6.

**data-focused-value**  
Type: `string`  
Description: The controlled focused date.

**data-format**  
Type: `"short" || "medium" || "long" || "full"`  
Description: The format of the date to display in the input.

**data-min**  
Type: `string || "today"`  
Description: The minimum date that can be selected.

**data-max**  
Type: `string || "today"`  
Description: The maximum date that can be selected.

**data-name**  
Type: `string`  
Description: The name attribute of the input element.

**data-num-of-months**  
Type: `number`  
Description: The number of months to display.

**data-outside-day-selectable**  
Type: `boolean`  
Description: Whether day outside the visible range can be selected.

**data-read-only**  
Type: `boolean`  
Description: Whether the calendar is read only.

**data-start-of-week**  
Type: `number`  
Description: The first day of the week.  
`0` - Sunday  
`1` - Monday  
`2` - Tuesday  
`3` - Wednesday  
`4` - Thursday  
`5` - Friday  
`6` - Saturday

**data-time-zone**  
Type: `string`  
Description: The Time zone to use. Default to `"UTC"`.

**data-no-weekend**  
Type: `boolean`  
Description: Make weekend dates not available.

---

## Event Callbacks

Each Date Picker component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the date-picker and a event listener for your event name

```ts
document
  .getElementById("my-date-picker")
  ?.addEventListener("my-date-picker-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

```html
<!-- render:preview -->
<div
  id="my-date-picker"
  class="date-picker date-picker-js"
  data-on-value-change="my-date-picker-event"
>
  <div data-part="control">
    <input data-part="input" />
    <button data-part="trigger" aria-label="Date Picker">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
        ></path>
      </svg>
    </button>
  </div>
  <div data-part="positioner">
    <div data-part="content">
      <div class="date-picker__day-view">
        <div data-part="view-control" data-view="day">
          <button data-part="prev-trigger" data-view="day">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              ></path>
            </svg>
          </button>
          <button data-part="view-trigger" data-view="day"></button>
          <button data-part="next-trigger" data-view="day">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </button>
        </div>
        <table data-part="table" data-view="day">
          <thead data-part="table-header" data-view="day"></thead>
          <tbody data-part="table-body" data-view="day"></tbody>
        </table>
      </div>
      <div class="date-picker__month-view">
        <div data-part="view-control" data-view="month">
          <button data-part="prev-trigger" data-view="month">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              ></path>
            </svg>
          </button>
          <button data-part="view-trigger" data-view="month"></button>
          <button data-part="next-trigger" data-view="month">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </button>
        </div>
        <table data-part="table" data-view="month" data-columns="4">
          <tbody data-part="table-body" data-view="month"></tbody>
        </table>
      </div>
      <div class="date-picker__year-view">
        <div data-part="view-control" data-view="year">
          <button data-part="prev-trigger" data-view="year">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              ></path>
            </svg>
          </button>
          <button data-part="view-trigger" data-view="year"></button>
          <button data-part="next-trigger" data-view="year">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </button>
        </div>
        <table data-part="table" data-view="year" data-columns="4">
          <tbody data-part="table-body" data-view="year"></tbody>
        </table>
      </div>
    </div>
  </div>
</div>
```

> Open your browser's console to see the events received when a date is selected

**data-on-value-change**  
Type: `string`  
Description: Event name to be sent when the value changes.

**data-on-focus-change**  
Type: `string`  
Description: Event name to be sent when the focused date changes.

**data-on-open-change**  
Type: `string`  
Description: Event name to be sent when the calendar is opened or closed.

**data-on-view-change**  
Type: `string`  
Description: Event name to be sent when the view changes.

---

## Locale

You can select locale to be displayed

```html
<!-- render:preview -->
<div
  class="date-picker date-picker-js"
  data-locale="ja"
  data-open="true"
  data-fixed-weeks="true"
  data-inline="true"
  data-close-on-select="false"
>
  <div data-part="content">
    <div class="date-picker__day-view">
      <div data-part="view-control" data-view="day">
        <button data-part="prev-trigger" data-view="day">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            ></path>
          </svg>
        </button>
        <button data-part="view-trigger" data-view="day"></button>
        <button data-part="next-trigger" data-view="day">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            ></path>
          </svg>
        </button>
      </div>
      <table data-part="table" data-view="day">
        <thead data-part="table-header" data-view="day"></thead>
        <tbody data-part="table-body" data-view="day"></tbody>
      </table>
    </div>
    <div class="date-picker__month-view">
      <div data-part="view-control" data-view="month">
        <button data-part="prev-trigger" data-view="month">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            ></path>
          </svg>
        </button>
        <button data-part="view-trigger" data-view="month"></button>
        <button data-part="next-trigger" data-view="month">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            ></path>
          </svg>
        </button>
      </div>
      <table data-part="table" data-view="month" data-columns="4">
        <tbody data-part="table-body" data-view="month"></tbody>
      </table>
    </div>
    <div class="date-picker__year-view">
      <div data-part="view-control" data-view="year">
        <button data-part="prev-trigger" data-view="year">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            ></path>
          </svg>
        </button>
        <button data-part="view-trigger" data-view="year"></button>
        <button data-part="next-trigger" data-view="year">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            ></path>
          </svg>
        </button>
      </div>
      <table data-part="table" data-view="year" data-columns="4">
        <tbody data-part="table-body" data-view="year"></tbody>
      </table>
    </div>
  </div>
</div>
```

```html
<!-- render:preview -->
<div
  class="date-picker date-picker-js"
  data-locale="ar"
  data-fixed-weeks="true"
  dir="rtl"
  data-open="true"
  data-inline="true"
  data-close-on-select="false"
>
  <div data-part="content">
    <div class="date-picker__day-view">
      <div data-part="view-control" data-view="day">
        <button data-part="prev-trigger" data-view="day">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            ></path>
          </svg>
        </button>
        <button data-part="view-trigger" data-view="day"></button>
        <button data-part="next-trigger" data-view="day">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            ></path>
          </svg>
        </button>
      </div>
      <table data-part="table" data-view="day">
        <thead data-part="table-header" data-view="day"></thead>
        <tbody data-part="table-body" data-view="day"></tbody>
      </table>
    </div>
    <div class="date-picker__month-view">
      <div data-part="view-control" data-view="month">
        <button data-part="prev-trigger" data-view="month">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            ></path>
          </svg>
        </button>
        <button data-part="view-trigger" data-view="month"></button>
        <button data-part="next-trigger" data-view="month">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            ></path>
          </svg>
        </button>
      </div>
      <table data-part="table" data-view="month" data-columns="4">
        <tbody data-part="table-body" data-view="month"></tbody>
      </table>
    </div>
    <div class="date-picker__year-view">
      <div data-part="view-control" data-view="year">
        <button data-part="prev-trigger" data-view="year">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="M15.75 19.5 8.25 12l7.5-7.5"
            ></path>
          </svg>
        </button>
        <button data-part="view-trigger" data-view="year"></button>
        <button data-part="next-trigger" data-view="year">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            stroke-width="1.5"
            stroke="currentColor"
          >
            <path
              stroke-linecap="round"
              stroke-linejoin="round"
              d="m8.25 4.5 7.5 7.5-7.5 7.5"
            ></path>
          </svg>
        </button>
      </div>
      <table data-part="table" data-view="year" data-columns="4">
        <tbody data-part="table-body" data-view="year"></tbody>
      </table>
    </div>
  </div>
</div>
```

---

## Date Range

You can select a range date to be displayed. You must add a second input

```html
<!-- render:preview -->
<div class="date-picker date-picker-js" data-selection-mode="range">
  <div data-part="control">
    <input data-part="input" data-index="0" placeholder="departure date" />
    <input data-part="input" data-index="1" placeholder="return date" />
    <button data-part="trigger" aria-label="Date Picker">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        stroke-width="1.5"
        stroke="currentColor"
        class="icon"
      >
        <path
          stroke-linecap="round"
          stroke-linejoin="round"
          d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
        ></path>
      </svg>
    </button>
  </div>
  <div data-part="positioner">
    <div data-part="content">
      <div class="date-picker__day-view">
        <div data-part="view-control" data-view="day">
          <button data-part="prev-trigger" data-view="day">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              ></path>
            </svg>
          </button>
          <button data-part="view-trigger" data-view="day"></button>
          <button data-part="next-trigger" data-view="day">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </button>
        </div>
        <table data-part="table" data-view="day">
          <thead data-part="table-header" data-view="day"></thead>
          <tbody data-part="table-body" data-view="day"></tbody>
        </table>
      </div>
      <div class="date-picker__month-view">
        <div data-part="view-control" data-view="month">
          <button data-part="prev-trigger" data-view="month">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              ></path>
            </svg>
          </button>
          <button data-part="view-trigger" data-view="month"></button>
          <button data-part="next-trigger" data-view="month">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </button>
        </div>
        <table data-part="table" data-view="month" data-columns="4">
          <tbody data-part="table-body" data-view="month"></tbody>
        </table>
      </div>
      <div class="date-picker__year-view">
        <div data-part="view-control" data-view="year">
          <button data-part="prev-trigger" data-view="year">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="M15.75 19.5 8.25 12l7.5-7.5"
              ></path>
            </svg>
          </button>
          <button data-part="view-trigger" data-view="year"></button>
          <button data-part="next-trigger" data-view="year">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke-width="1.5"
              stroke="currentColor"
            >
              <path
                stroke-linecap="round"
                stroke-linejoin="round"
                d="m8.25 4.5 7.5 7.5-7.5 7.5"
              ></path>
            </svg>
          </button>
        </div>
        <table data-part="table" data-view="year" data-columns="4">
          <tbody data-part="table-body" data-view="year"></tbody>
        </table>
      </div>
    </div>
  </div>
</div>
```

---

## Form usage

Date Picker can be used inside a form

You must set the name of the field `data-name="date-picker-name"`

```html
<!-- render:preview -->
<form
  id="my-form-birth"
  class="flex flex-col items-center gap-(--spacing-ui-gap)"
>
  <div
    class="date-picker date-picker-js"
    data-form="my-form-birth"
    data-name="date-of-birth"
    data-fixed-weeks="true"
  >
    <div data-part="control">
      <input data-part="input" />
      <button data-part="trigger" aria-label="Date Picker">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          stroke-width="1.5"
          stroke="currentColor"
          class="icon"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 0 1 2.25-2.25h13.5A2.25 2.25 0 0 1 21 7.5v11.25m-18 0A2.25 2.25 0 0 0 5.25 21h13.5A2.25 2.25 0 0 0 21 18.75m-18 0v-7.5A2.25 2.25 0 0 1 5.25 9h13.5A2.25 2.25 0 0 1 21 11.25v7.5m-9-6h.008v.008H12v-.008ZM12 15h.008v.008H12V15Zm0 2.25h.008v.008H12v-.008ZM9.75 15h.008v.008H9.75V15Zm0 2.25h.008v.008H9.75v-.008ZM7.5 15h.008v.008H7.5V15Zm0 2.25h.008v.008H7.5v-.008Zm6.75-4.5h.008v.008h-.008v-.008Zm0 2.25h.008v.008h-.008V15Zm0 2.25h.008v.008h-.008v-.008Zm2.25-4.5h.008v.008H16.5v-.008Zm0 2.25h.008v.008H16.5V15Z"
          ></path>
        </svg>
      </button>
    </div>
    <div data-part="positioner">
      <div data-part="content">
        <div class="date-picker__day-view">
          <div data-part="view-control" data-view="day">
            <button data-part="prev-trigger" data-view="day">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                ></path>
              </svg>
            </button>
            <button data-part="view-trigger" data-view="day"></button>
            <button data-part="next-trigger" data-view="day">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                ></path>
              </svg>
            </button>
          </div>
          <table data-part="table" data-view="day">
            <thead data-part="table-header" data-view="day"></thead>
            <tbody data-part="table-body" data-view="day"></tbody>
          </table>
        </div>
        <div class="date-picker__month-view">
          <div data-part="view-control" data-view="month">
            <button data-part="prev-trigger" data-view="month">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                ></path>
              </svg>
            </button>
            <button data-part="view-trigger" data-view="month"></button>
            <button data-part="next-trigger" data-view="month">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                ></path>
              </svg>
            </button>
          </div>
          <table data-part="table" data-view="month" data-columns="4">
            <tbody data-part="table-body" data-view="month"></tbody>
          </table>
        </div>
        <div class="date-picker__year-view">
          <div data-part="view-control" data-view="year">
            <button data-part="prev-trigger" data-view="year">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="M15.75 19.5 8.25 12l7.5-7.5"
                ></path>
              </svg>
            </button>
            <button data-part="view-trigger" data-view="year"></button>
            <button data-part="next-trigger" data-view="year">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke-width="1.5"
                stroke="currentColor"
              >
                <path
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  d="m8.25 4.5 7.5 7.5-7.5 7.5"
                ></path>
              </svg>
            </button>
          </div>
          <table data-part="table" data-view="year" data-columns="4">
            <tbody data-part="table-body" data-view="year"></tbody>
          </table>
        </div>
      </div>
    </div>
  </div>
  <button class="button button--accent" type="submit">Submit</button>
</form>
<div id="result"></div>
```

You can use the results from the form as you wish

```ts
const formBirth = document.getElementById(
  "my-form-birth",
) as HTMLFormElement | null;
const resultBirth = document.getElementById("result") as HTMLDivElement | null;

if (formBirth && resultBirth) {
  formBirth.addEventListener("submit", (e: Event) => {
    e.preventDefault();
    const formData = new FormData(formBirth);
    const dateOfBirth = formData.get("date-of-birth") as string;
    resultBirth.textContent = `Submitted: birth day: ${dateOfBirth}`;
  });
}
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

### Static

1. Import the Date Picker component

```ts
import "@corex-ui/static/components/date-picker";
```

This will automatically initialize all elements with `class="date-picker-js"` and add the necessary interaction behavior.

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/date-picker.css";
```

Then apply the base class along with any desired modifiers:

```html
<div class="date-picker date-picker-js">
  <div data-part="control">
    <input data-part="input" />
    <button data-part="trigger" aria-label="Date Picker"></button>
  </div>
</div>
```

### Static React

> Experimental! Only works with React static export (eg. Next.js SSG.)

1. Import the Date Picker component

```ts
import { DatePicker } from '@corex-ui/static/react';
export default function Home() {
  return (
    <DatePicker>
      <div data-part="control">
        <input data-part="input" />
        <button data-part="trigger" aria-label="Date Picker" />
      </div>
    </DatePicker>
  );
}
```

2. Add styling

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/date-picker.css";
```

Then apply the base class along with any desired modifiers:

```html
<DatePicker className="date-picker"> {/* content */} </DatePicker>
```
