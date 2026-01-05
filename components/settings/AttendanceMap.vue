<script setup lang="ts">
import { ref, computed, watch, onMounted } from 'vue'
import { LMap, LTileLayer, LMarker, LCircle } from "@vue-leaflet/vue-leaflet";
import "leaflet/dist/leaflet.css";

// Dynamic import for Leaflet to avoid SSR issues
const L = ref<any>(null)

onMounted(async () => {
    // Fix Leaflet's default icon path issues with webpack/vite
    const leaflet = await import('leaflet');
    L.value = leaflet.default || leaflet;
    
    // Fix icons
    delete (L.value.Icon.Default.prototype as any)._getIconUrl;
    L.value.Icon.Default.mergeOptions({
        iconRetinaUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon-2x.png',
        iconUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-icon.png',
        shadowUrl: 'https://unpkg.com/leaflet@1.7.1/dist/images/marker-shadow.png',
    });
});

const props = defineProps<{
  latitude: number;
  longitude: number;
  radius: number;
}>()

const emit = defineEmits<{
  (e: 'locationSelect', lat: number, lng: number): void
}>()

const zoom = ref(15)
const hasLocation = computed(() => !!(props.latitude && props.longitude))

// Internal position state that syncs with props but can be optimistic
const currentPosition = ref<[number, number]>(
    hasLocation.value ? [props.latitude, props.longitude] : [-6.2088, 106.8456]
)

// Sync with props when they change
watch(() => [props.latitude, props.longitude], ([newLat, newLng]) => {
     if (newLat && newLng) {
         currentPosition.value = [newLat, newLng]
         // Also verify center isn't too far? Optional.
     }
})

const pendingLocation = ref<[number, number] | null>(null)
const center = ref<[number, number]>(currentPosition.value)

// Keep center in sync with currentPosition primarily
watch(currentPosition, (newPos) => {
    if (!pendingLocation.value) {
        center.value = newPos
    }
})

const onMapClick = (e: any) => {
    // e.latlng contains lat and lng
    if (e.latlng) {
        pendingLocation.value = [e.latlng.lat, e.latlng.lng]
        // Center view on click? maybe not forced, but let's do it for visibility
        // center.value = [e.latlng.lat, e.latlng.lng] 
    }
}

const confirmLocation = () => {
    if (pendingLocation.value) {
        // Optimistic update
        const newPos = pendingLocation.value
        currentPosition.value = newPos
        
        emit('locationSelect', newPos[0], newPos[1])
        pendingLocation.value = null
    }
}

const cancelLocation = () => {
    pendingLocation.value = null
    // Revert center to saved position
    center.value = currentPosition.value
}
</script>

<template>
  <div class="space-y-4 relative">
    <div class="h-[400px] w-full rounded-lg overflow-hidden border border-gray-300 relative z-0">
      <ClientOnly>
          <l-map
            ref="map"
            v-model:zoom="zoom"
            :center="center"
            :use-global-leaflet="false"
            @click="onMapClick"
            style="cursor: crosshair;"
          >
            <l-tile-layer
              url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
              layer-type="base"
              name="OpenStreetMap"
            ></l-tile-layer>

            <!-- Show current confirmed position -->
             <l-marker v-if="!pendingLocation" :lat-lng="currentPosition"></l-marker>
             <l-circle 
                v-if="!pendingLocation"
                :lat-lng="currentPosition" 
                :radius="radius"
                color="blue"
            ></l-circle>

            <!-- Show pending position -->
            <l-marker v-if="pendingLocation" :lat-lng="pendingLocation"></l-marker>
            <l-circle 
                v-if="pendingLocation"
                :lat-lng="pendingLocation" 
                :radius="radius"
                color="orange"
                dash-array="5, 10"
            ></l-circle>
          </l-map>
      </ClientOnly>

       <!-- Confirmation Modal Overlay -->
        <div v-if="pendingLocation" class="absolute inset-0 z-[1000] flex items-end justify-center pb-6 bg-black/10 pointer-events-none">
             <div class="bg-white p-4 rounded-lg shadow-lg pointer-events-auto flex flex-col items-center gap-3 animate-in fade-in slide-in-from-bottom-4">
                <p class="text-sm font-medium text-gray-900">Update Check Point Location?</p>
                <div class="flex gap-2">
                  <button 
                    @click="cancelLocation"
                    class="px-3 py-1.5 text-xs font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-md transition-colors pointer-events-auto"
                  >
                    Cancel
                  </button>
                  <button 
                    @click="confirmLocation"
                    class="px-3 py-1.5 text-xs font-medium text-white bg-brand-navy hover:opacity-90 rounded-md transition-colors pointer-events-auto"
                  >
                    Save Location
                  </button>
                </div>
             </div>
        </div>
    </div>
    <p class="text-xs text-gray-500">
        Click on the map to set the attendance check-point center. You will be asked to confirm.
      </p>
  </div>
</template>
