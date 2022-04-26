<script setup lang="ts">
import LvIcon from '../components/LvIcon.vue'

export interface StepItem {
  text?: string
  icon?: string
}

const props = defineProps<{
  items: StepItem[]
  cur: number
}>()

function getContentClass (index: number) {
  const currentIndex = props.cur || 0

  if (index < currentIndex) return 'status--done'
  if (index === currentIndex) return 'status--focus'
  if (index > currentIndex) return 'status--undone'
}
</script>

<template>
  <div class="lv-step">
    <div class="lv-step__item" v-for="(step, i) of items" :key="`step-${i}`">
      <div class="lv-step__item-content" :class="getContentClass(i)">
        <LvIcon :icon="step.icon" :size="16" v-if="step.icon" />
        <span class="default-icon" v-else>
          <LvIcon icon="check" v-if="i < cur" />
          <template v-else>{{ i + 1 }}</template>
        </span>
        <span class="lv-step__item-text" v-if="step.text">{{ step.text }}</span>
      </div>
      <div class="lv-step__line" :class="{ 'status--done': i < cur }" v-if="i < items.length - 1" />
    </div>
  </div>
</template>

<style lang="less">
@import (reference) "../Mixins";

.lv-step {
  .flex-start;
}

.lv-step__item {
  .flex-start;

  flex: 1;

  &:last-child {
    flex: none;
  }
}

.lv-step__item-content {
  .flex-start;

  font-size: var(--small-font);
  transition: color 0.3s;
  color: var(--disabled-color);

  .lv-icon {
    color: var(--disabled-color);
  }

  > .default-icon {
    border: 1px solid var(--disabled-color);
    width: 32px;
    height: 32px;
    line-height: 30px;
    text-align: center;
    border-radius: 32px;
    font-size: var(--normal-font);
    transition: background-color 0.3s, border-color 0.3s;

    > .lv-icon {
      vertical-align: text-bottom;
    }
  }

  &.status--done {
    color: var(--blue-color);

    .lv-icon {
      color: var(--blue-color);
    }

    > .default-icon {
      border-color: var(--blue-color);
    }
  }

  &.status--focus {
    color: var(--main-color);
    font-weight: bold;

    .lv-icon {
      color: var(--blue-color);
    }

    > .default-icon {
      background-color: var(--blue-color);
      color: var(--white);
      border-color: var(--blue-color);
    }
  }

  &.status--undone {
    color: var(--disabled-color);

    .lv-icon {
      color: var(--disabled-color);
    }
  }
}

.lv-step__item-text {
  margin-left: 8px;
}

.lv-step__line {
  flex: 1;
  border-top: 1px solid var(--disabled-color);
  margin: 0 16px;

  &.status--done {
    border-color: var(--blue-color);
  }
}
</style>
