<script setup lang="ts">
import { MoneyOffRound, FastForwardRound, SecurityRound } from '@vicons/material'
import { UserCheck } from '@vicons/fa'
import { BrandOpenSource } from '@vicons/tabler'
import { EyeTrackingOff16Filled } from '@vicons/fluent'
import { MyFeaturePanel } from '@libreservice/my-widget'
import MyUpload from '../components/MyUpload.vue'

const features = [
  { icon: MoneyOffRound, title: 'Free of Charge', description: 'Forget about "try a little for free and pay if you need more".' },
  { icon: FastForwardRound, title: 'Fast', description: 'Thanks to Web Assembly, the speed is comparable to native program.' },
  { icon: UserCheck, title: 'User Friendly', description: 'If you know about file command, you should use that. But if not, this tool is easy to use.' },
  { icon: BrandOpenSource, title: 'Open Source', description: 'Every SaaS project under LibreService is Free and Open Source. PRs are welcomed!' },
  { icon: SecurityRound, title: 'Secure', description: 'Your privacy matters! Files won\'t be uploaded. Have doubt? Check Network requests and/or source code.' },
  { icon: EyeTrackingOff16Filled, title: 'No Telemetry', description: 'Don\'t like trackers? Neither do us. Instead, we welcome you to submit an issue if you have problem.' }
]
</script>

<template>
  <my-upload />
  <my-feature-panel
    :features="features"
    class="my-column"
    style="margin-top: 16px"
  />
</template>
