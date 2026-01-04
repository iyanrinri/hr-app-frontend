<script setup lang="ts">
// Icons are globally registered via plugin
</script>

<template>
  <div class="min-h-screen bg-white">
    <!-- Header -->
    <header
      class="fixed w-full bg-white/80 backdrop-blur-md border-b border-gray-100 z-50"
    >
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-16 flex items-center justify-between"
      >
        <div class="flex items-center space-x-2">
          <div
            class="w-8 h-8 bg-brand-navy rounded-lg flex items-center justify-center"
          >
            <Users class="w-5 h-5 text-white" />
          </div>
          <span class="text-xl font-bold text-gray-900">HR Portal</span>
        </div>
        <div class="flex items-center space-x-4">
          <UiButton to="/register" variant="outline">Create Workspace</UiButton>
          <UiButton to="/find-workspace">Sign In</UiButton>
        </div>
      </div>
    </header>

    <!-- Hero Section -->
    <section class="pt-32 pb-20 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
      <div class="text-center max-w-3xl mx-auto">
        <h1
          class="text-4xl sm:text-5xl md:text-6xl font-extrabold text-gray-900 tracking-tight mb-8"
        >
          Manage your workforce with
          <span class="text-brand-cyan">confidence</span>
        </h1>
        <p class="text-xl text-gray-600 mb-10 leading-relaxed">
          A comprehensive solution for modern HR management. Streamline employee
          data, manage roles, and secure your organization's internal structure.
        </p>
        <div
          class="flex flex-col sm:flex-row items-center justify-center gap-4"
        >
          <UiButton to="/register" class="h-12 px-8 text-lg w-full sm:w-auto">
            Create Workspace <ArrowRight class="ml-2 w-5 h-5" />
          </UiButton>
          <UiButton
            to="/find-workspace"
            variant="outline"
            class="h-12 px-8 text-lg w-full sm:w-auto"
          >
            Sign In to Existing
          </UiButton>
        </div>
      </div>
    </section>

    <!-- Features Section -->
    <section class="py-20 bg-gray-50">
      <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div
            class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div
              class="w-12 h-12 bg-brand-light rounded-xl flex items-center justify-center mb-6"
            >
              <Users class="w-6 h-6 text-brand-navy" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              Employee Management
            </h3>
            <p class="text-gray-600">
              Easily add, edit, and manage employee records. Keep track of
              departments, roles, and status in one place.
            </p>
          </div>
          <div
            class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div
              class="w-12 h-12 bg-indigo-100 rounded-xl flex items-center justify-center mb-6"
            >
              <Shield class="w-6 h-6 text-indigo-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">
              Role & Permissions
            </h3>
            <p class="text-gray-600">
              Define granular roles and permissions. Ensure the right people
              have access to the right resources.
            </p>
          </div>
          <div
            class="bg-white p-8 rounded-2xl shadow-sm border border-gray-100 hover:shadow-md transition-shadow"
          >
            <div
              class="w-12 h-12 bg-green-100 rounded-xl flex items-center justify-center mb-6"
            >
              <Lock class="w-6 h-6 text-green-600" />
            </div>
            <h3 class="text-xl font-bold text-gray-900 mb-3">Secure Access</h3>
            <p class="text-gray-600">
              Enterprise-grade security with JWT authentication and protected
              routes. Your data is safe with us.
            </p>
          </div>
        </div>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-white border-t border-gray-100 py-12">
      <div
        class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-center"
      >
        <div class="flex items-center space-x-2 mb-4 md:mb-0">
          <div
            class="w-6 h-6 bg-brand-navy rounded-md flex items-center justify-center"
          >
            <Users class="w-3 h-3 text-white" />
          </div>
          <span class="text-lg font-bold text-gray-900">HR Portal</span>
        </div>
        <p class="text-gray-500 text-sm">
          © {{ new Date().getFullYear() }} HR Portal Internal System. All rights
          reserved.
        </p>
      </div>
    </footer>
  </div>
</template>
