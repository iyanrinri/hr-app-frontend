<script setup lang="ts">
definePageMeta({
  layout: 'dashboard'
})
</script>

<template>
  <div class="space-y-6">
    <h2 class="text-2xl font-bold text-gray-900">Dashboard Overview</h2>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Total Employees</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-3xl font-bold text-brand-navy">124</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Departments</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-3xl font-bold text-brand-navy">8</p>
        </UiCardContent>
      </UiCard>
      <UiCard>
        <UiCardHeader>
          <UiCardTitle>Active Roles</UiCardTitle>
        </UiCardHeader>
        <UiCardContent>
          <p class="text-3xl font-bold text-brand-navy">5</p>
        </UiCardContent>
      </UiCard>
    </div>
  </div>
</template>
