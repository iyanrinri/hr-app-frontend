<script setup lang="ts">
import { ref } from 'vue'
import { User, Camera, Trash2, Loader2, UploadCloud } from 'lucide-vue-next'

const props = withDefaults(defineProps<{
  currentImageUrl?: string | null;
  altText: string;
  isUploading: boolean;
  isDeleting?: boolean;
  canEdit?: boolean;
  size?: 'sm' | 'md' | 'lg' | 'xl';
}>(), {
  isDeleting: false,
  canEdit: true,
  size: 'xl'
})

const emit = defineEmits<{
  (e: 'upload', file: File): void
  (e: 'delete'): void
}>()

const fileInputRef = ref<HTMLInputElement | null>(null)
const dragActive = ref(false)

const handleFileChange = async (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    handleUpload(file)
  }
}

const handleUpload = (file: File) => {
    // Validation
    if (file.size > 5 * 1024 * 1024) {
      alert('File size must be less than 5MB')
      return
    }
    
    const allowedTypes = ['image/jpeg', 'image/png', 'image/gif', 'image/jpg']
    if (!allowedTypes.includes(file.type)) {
      alert('Only JPG, PNG, and GIF files are allowed')
      return
    }

    emit('upload', file)
    
    // Reset input
    if (fileInputRef.value) {
        fileInputRef.value.value = ''
    }
}

const handleDelete = () => {
    if (!confirm('Are you sure you want to remove your profile picture?')) return
    emit('delete')
}

const handleDrag = (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    if (e.type === 'dragenter' || e.type === 'dragover') {
      dragActive.value = true
    } else if (e.type === 'dragleave') {
      dragActive.value = false
    }
}

const handleDrop = async (e: DragEvent) => {
    e.preventDefault()
    e.stopPropagation()
    dragActive.value = false

    if (e.dataTransfer?.files && e.dataTransfer.files[0]) {
      const file = e.dataTransfer.files[0]
      if (props.canEdit) {
        handleUpload(file)
      }
    }
}

const triggerFileInput = () => {
    if (props.canEdit && !props.isUploading) {
      fileInputRef.value?.click()
    }
}

const sizeClasses = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24',
    lg: 'w-32 h-32',
    xl: 'w-40 h-40',
}
</script>

<template>
  <div class="flex flex-col items-center space-y-4">
      <div 
        :class="[
          'relative group rounded-full overflow-hidden border-4 border-white shadow-lg bg-gray-100 flex items-center justify-center transition-all',
          sizeClasses[size],
          canEdit && 'cursor-pointer hover:ring-4 hover:ring-brand-navy/20',
          dragActive && 'ring-4 ring-brand-cyan scale-105'
        ]"
        @dragenter="canEdit ? handleDrag($event) : undefined"
        @dragleave="canEdit ? handleDrag($event) : undefined"
        @dragover="canEdit ? handleDrag($event) : undefined"
        @drop="canEdit ? handleDrop($event) : undefined"
        @click="triggerFileInput"
      >
        <div v-if="isUploading" class="absolute inset-0 flex items-center justify-center bg-black/50 z-20">
            <Loader2 class="w-8 h-8 text-white animate-spin" />
        </div>
        <template v-else>
            <div v-if="canEdit" class="absolute inset-0 bg-black/40 flex flex-col items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity z-10">
              <Camera class="w-8 h-8 text-white mb-1" />
              <span class="text-xs text-white font-medium">Change Photo</span>
            </div>
        </template>

        <img v-if="currentImageUrl" :src="currentImageUrl" :alt="altText" class="w-full h-full object-cover" />
        <div v-else class="w-full h-full flex items-center justify-center bg-gradient-to-br from-gray-100 to-gray-200 text-gray-400">
            <User class="w-1/2 h-1/2" />
        </div>
        
        <input 
          type="file" 
          ref="fileInputRef"
          class="hidden"
          accept="image/jpeg,image/png,image/gif"
          @change="handleFileChange"
          :disabled="isUploading || !canEdit"
        />
      </div>

      <div v-if="canEdit" class="flex gap-2">
           <UiButton 
            variant="secondary" 
            @click="triggerFileInput"
            :disabled="isUploading"
            class="text-xs h-8 px-3"
          >
            <UploadCloud class="w-3.5 h-3.5 mr-1.5" />
            Upload
          </UiButton>

          <UiButton 
            v-if="currentImageUrl"
            variant="secondary" 
            @click="handleDelete"
            :disabled="isUploading || isDeleting"
            class="text-xs text-red-600 hover:text-red-700 hover:bg-red-50 border-red-200 h-8 px-3"
          >
            <Loader2 v-if="isDeleting" class="w-3.5 h-3.5 animate-spin" />
            <template v-else>
               <Trash2 class="w-3.5 h-3.5 mr-1.5" />
               Remove
            </template>
          </UiButton>
      </div>
  </div>
</template>
