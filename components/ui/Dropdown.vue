<script setup lang="ts">
import { Menu, MenuButton, MenuItems, MenuItem } from '@headlessui/vue'
import { ChevronDown } from 'lucide-vue-next'
import { cn } from "@/utils"

interface Props {
  label?: string;
  items: { 
    label: string; 
    action?: () => void;
    to?: string; 
    icon?: any;
    class?: string;
    danger?: boolean;
  }[];
  align?: 'left' | 'right';
  class?: string;
  buttonClass?: string;
}

const props = withDefaults(defineProps<Props>(), {
  align: 'right'
})
</script>

<template>
  <Menu as="div" class="relative inline-block text-left">
    <div :class="props.class">
      <MenuButton
        :class="cn(
          'inline-flex w-full justify-center rounded-md bg-white px-4 py-2 text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-brand-cyan focus:ring-offset-2 focus:ring-offset-gray-100',
          props.buttonClass
        )"
      >
        <slot name="trigger">
            {{ label }}
            <ChevronDown class="-mr-1 ml-2 h-5 w-5" aria-hidden="true" />
        </slot>
      </MenuButton>
    </div>

    <transition
      enter-active-class="transition ease-out duration-100"
      enter-from-class="transform opacity-0 scale-95"
      enter-to-class="transform opacity-100 scale-100"
      leave-active-class="transition ease-in duration-75"
      leave-from-class="transform opacity-100 scale-100"
      leave-to-class="transform opacity-0 scale-95"
    >
      <MenuItems
        :class="cn(
          'absolute z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none',
          align === 'right' ? 'right-0' : 'left-0'
        )"
      >
        <div class="py-1">
          <MenuItem v-for="(item, index) in items" :key="index" v-slot="{ active }">
            <component
                :is="item.to ? 'NuxtLink' : 'button'"
                :to="item.to"
                @click="item.action"
                :class="cn(
                  active ? 'bg-gray-100 text-gray-900' : 'text-gray-700',
                  item.danger ? 'text-red-700 hover:bg-red-50 hover:text-red-900' : '',
                  'group flex w-full items-center px-4 py-2 text-sm',
                  item.class
                )"
            >
              <component v-if="item.icon" :is="item.icon" class="mr-3 h-5 w-5 text-gray-400 group-hover:text-gray-500" aria-hidden="true" />
              {{ item.label }}
            </component>
          </MenuItem>
        </div>
      </MenuItems>
    </transition>
  </Menu>
</template>
