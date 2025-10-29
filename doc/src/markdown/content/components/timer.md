---
title: Timer
description: A pure HTML and vanilla JS implementation of Zag JS Timer
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

# Timer

> A pure HTML and vanilla JS implementation of [Zag JS Timer](https://zagjs.com/components/react/timer)

The timer machine is used to record the time elapsed from zero or since a specified target time.

---

## Anatomy

The Timer component consists of the following data parts:

`root`, `area`, `item`, `separator`, `control`, `action-trigger`

```html
<!-- render:preview -->
<div
  class="timer timer-js"
  data-countdown="true"
  data-auto-start="true"
  data-interval="1000"
  data-days="1"
  data-hours="0"
  data-minutes="0"
  data-seconds="0"
>
  <div data-part="root">
    <div data-part="area">
      <div data-part="item" data-type="days"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="hours"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="minutes"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="seconds"></div>
    </div>
    <div data-part="control">
      <button data-part="action-trigger" data-action="start" aria-label="Start">
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
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          ></path>
        </svg>
      </button>
      <button data-part="action-trigger" data-action="pause" aria-label="Pause">
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
            d="M15.75 5.25v13.5m-7.5-13.5v13.5"
          ></path>
        </svg>
      </button>
      <button
        data-part="action-trigger"
        data-action="resume"
        aria-label="Resume"
      >
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
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          ></path>
        </svg>
      </button>
      <button data-part="action-trigger" data-action="reset" aria-label="Reset">
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
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</div>
```

---

## Data attributes

Each timer can be set with different settings with the following data-attribute.

```html
<!-- render:preview -->
<div
  class="timer timer-js"
  class="timer timer-js"
  data-countdown="false"
  data-auto-start="true"
  data-interval="1000"
  data-days="0"
  data-hours="0"
  data-minutes="1"
  data-seconds="0"
  data-days-target="0"
  data-hours-target="1"
  data-minutes-target="0"
  data-seconds-target="0"
>
  <div data-part="root">
    <div data-part="area">
      <div data-part="item" data-type="days"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="hours"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="minutes"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="seconds"></div>
    </div>
    <div data-part="control">
      <button
        class="button button--circle"
        data-part="action-trigger"
        data-action="start"
        aria-label="Start"
      >
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
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          ></path>
        </svg>
      </button>
      <button
        class="button button--circle"
        data-part="action-trigger"
        data-action="pause"
        aria-label="Pause"
      >
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
            d="M15.75 5.25v13.5m-7.5-13.5v13.5"
          ></path>
        </svg>
      </button>
      <button
        class="button button--circle"
        data-part="action-trigger"
        data-action="resume"
        aria-label="Resume"
      >
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
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          ></path>
        </svg>
      </button>
      <button
        class="button button--circle"
        data-part="action-trigger"
        data-action="reset"
        aria-label="Reset"
      >
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
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</div>
```

**id**  
Type: `string`  
Description: The unique id of the component. Default generated if none is provided.

**data-countdown**  
Type: `boolean`  
Description: Whether the timer should countdown, decrementing the timer on each tick.

**data-auto-start**  
Type: `string`  
Description: Whether the timer should start automatically.

**data-interval**  
Type: `number`  
Description: The interval in milliseconds to update the timer count.

**data-days**  
Type: `number`  
Description: The total duration of the timer in days.

**data-hours**  
Type: `number`  
Description: The total duration of the timer in hours.

**data-minutes**  
Type: `number`  
Description: The total duration of the timer in minutes.

**data-seconds**  
Type: `number`  
Description: The total duration of the timer in seconds.

**data-days-target**  
Type: `number`  
Description: The minimum count of the timer in days.

**data-hours-target**  
Type: `number`  
Description: The minimum count of the timer in hours.

**data-minutes-target**  
Type: `number`  
Description: The minimum count of the timer in minutes.

**data-seconds-target**  
Type: `number`  
Description: The minimum count of the timer in seconds.

---

## Event Callbacks

Each timer component can receive callbacks that can be used to respond to user interaction with custom behavior.

You must add a custom id for the timer and a event listener for your event name

```ts
document
  .getElementById("my-timer")
  ?.addEventListener("my-timer-event", (event) => {
    console.log("Received event:", (event as CustomEvent).detail);
  });
```

```html
<!-- render:preview -->
<div
  id="my-timer"
  class="timer timer-js"
  data-countdown="true"
  data-auto-start="true"
  data-on-complete="my-timer-event"
  data-days="0"
  data-hours="0"
  data-minutes="0"
  data-seconds="10"
>
  <div data-part="root">
    <div data-part="area">
      <div data-part="item" data-type="days"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="hours"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="minutes"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="seconds"></div>
    </div>
    <div data-part="control">
      <button
        class="button button--circle"
        data-part="action-trigger"
        data-action="start"
        aria-label="Start"
      >
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
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          ></path>
        </svg>
      </button>
      <button
        class="button button--circle"
        data-part="action-trigger"
        data-action="pause"
        aria-label="Pause"
      >
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
            d="M15.75 5.25v13.5m-7.5-13.5v13.5"
          ></path>
        </svg>
      </button>
      <button
        class="button button--circle"
        data-part="action-trigger"
        data-action="resume"
        aria-label="Resume"
      >
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
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          ></path>
        </svg>
      </button>
      <button
        class="button button--circle"
        data-part="action-trigger"
        data-action="reset"
        aria-label="Reset"
      >
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
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</div>
```

> Open your browser's console to see the events received when the timer is completed

**data-on-complete**  
Type: `string`  
Description: Event name to be sent when the timer is completed.

**data-on-tick**  
Type: `string`  
Description: Event name to be sent when the timer ticks.

---

## Modifiers

Timer support modifier classes that control their appearance.  
You can combine multiple modifiers on the same timer.

The default modifier is applied automatically, so you don’t need to include it explicitly.

| Modifier      | Description                            |
| ------------- | -------------------------------------- |
| [Size](#size) | Adjusts the overall size of the timer. |

> You may have noticed the double dash before the modifier name — this follows the BEM (Block Element Modifier) naming convention

### Size

Use `class="timer--{size}"` to set the size of an timer.

Available options:  
**sm**, **md** (default), **lg**, **xl**

```html
<!-- render:preview -->
<div
  class="timer timer-js timer--sm"
  data-countdown="true"
  data-auto-start="false"
  data-interval="1000"
  data-days="1"
  data-hours="0"
  data-minutes="0"
  data-seconds="0"
>
  <div data-part="root">
    <div data-part="area">
      <div data-part="item" data-type="days"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="hours"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="minutes"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="seconds"></div>
    </div>
    <div data-part="control">
      <button data-part="action-trigger" data-action="start" aria-label="Start">
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
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          ></path>
        </svg>
      </button>
      <button data-part="action-trigger" data-action="pause" aria-label="Pause">
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
            d="M15.75 5.25v13.5m-7.5-13.5v13.5"
          ></path>
        </svg>
      </button>
      <button
        data-part="action-trigger"
        data-action="resume"
        aria-label="Resume"
      >
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
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          ></path>
        </svg>
      </button>
      <button data-part="action-trigger" data-action="reset" aria-label="Reset">
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
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</div>
<div
  class="timer timer-js timer--md"
  data-countdown="true"
  data-auto-start="false"
  data-interval="1000"
  data-days="1"
  data-hours="0"
  data-minutes="0"
  data-seconds="0"
>
  <div data-part="root">
    <div data-part="area">
      <div data-part="item" data-type="days"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="hours"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="minutes"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="seconds"></div>
    </div>
    <div data-part="control">
      <button data-part="action-trigger" data-action="start" aria-label="Start">
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
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          ></path>
        </svg>
      </button>
      <button data-part="action-trigger" data-action="pause" aria-label="Pause">
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
            d="M15.75 5.25v13.5m-7.5-13.5v13.5"
          ></path>
        </svg>
      </button>
      <button
        data-part="action-trigger"
        data-action="resume"
        aria-label="Resume"
      >
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
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          ></path>
        </svg>
      </button>
      <button data-part="action-trigger" data-action="reset" aria-label="Reset">
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
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</div>
<div
  class="timer timer-js timer--lg"
  data-countdown="true"
  data-auto-start="false"
  data-interval="1000"
  data-days="1"
  data-hours="0"
  data-minutes="0"
  data-seconds="0"
>
  <div data-part="root">
    <div data-part="area">
      <div data-part="item" data-type="days"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="hours"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="minutes"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="seconds"></div>
    </div>
    <div data-part="control">
      <button data-part="action-trigger" data-action="start" aria-label="Start">
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
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          ></path>
        </svg>
      </button>
      <button data-part="action-trigger" data-action="pause" aria-label="Pause">
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
            d="M15.75 5.25v13.5m-7.5-13.5v13.5"
          ></path>
        </svg>
      </button>
      <button
        data-part="action-trigger"
        data-action="resume"
        aria-label="Resume"
      >
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
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          ></path>
        </svg>
      </button>
      <button data-part="action-trigger" data-action="reset" aria-label="Reset">
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
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</div>
<div
  class="timer timer-js timer--xl"
  data-countdown="true"
  data-auto-start="false"
  data-interval="1000"
  data-days="1"
  data-hours="0"
  data-minutes="0"
  data-seconds="0"
>
  <div data-part="root">
    <div data-part="area">
      <div data-part="item" data-type="days"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="hours"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="minutes"></div>
      <div data-part="separator">:</div>
      <div data-part="item" data-type="seconds"></div>
    </div>
    <div data-part="control">
      <button data-part="action-trigger" data-action="start" aria-label="Start">
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
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          ></path>
        </svg>
      </button>
      <button data-part="action-trigger" data-action="pause" aria-label="Pause">
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
            d="M15.75 5.25v13.5m-7.5-13.5v13.5"
          ></path>
        </svg>
      </button>
      <button
        data-part="action-trigger"
        data-action="resume"
        aria-label="Resume"
      >
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
            d="M5.25 5.653c0-.856.917-1.398 1.667-.986l11.54 6.347a1.125 1.125 0 0 1 0 1.972l-11.54 6.347a1.125 1.125 0 0 1-1.667-.986V5.653Z"
          ></path>
        </svg>
      </button>
      <button data-part="action-trigger" data-action="reset" aria-label="Reset">
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
            d="M19.5 12c0-1.232-.046-2.453-.138-3.662a4.006 4.006 0 0 0-3.7-3.7 48.678 48.678 0 0 0-7.324 0 4.006 4.006 0 0 0-3.7 3.7c-.017.22-.032.441-.046.662M19.5 12l3-3m-3 3-3-3m-12 3c0 1.232.046 2.453.138 3.662a4.006 4.006 0 0 0 3.7 3.7 48.656 48.656 0 0 0 7.324 0 4.006 4.006 0 0 0 3.7-3.7c.017-.22.032-.441.046-.662M4.5 12l3 3m-3-3-3 3"
          ></path>
        </svg>
      </button>
    </div>
  </div>
</div>
```

---

## Installation

First, complete the Corex UI [initial installation](/installation/introduction) guide for your platform, bundler, or framework.

1. Import the component

```ts
import "@corex-ui/static/components/timer";
```

This will automatically initialize all elements with `class="timer-js"` and add the necessary interaction behavior.

2. Add styling

The component is **unstyled by default** for maximum customization flexibility.

To apply the default Corex UI design system styles, import the stylesheet:

```css
@import "@corex-ui/design/components/timer.css";
```

These styles will be applied to all elements with the `timer` class.
