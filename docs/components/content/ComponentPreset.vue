<script setup lang="ts">
import { transformContent } from '@nuxt/content/transformers'

const props = defineProps({
  slug: {
    type: String,
    default: null,
  },
})

const appConfig = useAppConfig()
const route = useRoute()

const slug = props.slug || route.params.slug[1]
const camelName = useCamelCase(slug)
const name = `E${useUpperFirst(camelName)}`

const preset = appConfig.ui[camelName]

const { data: ast } = await useAsyncData(`${name}-preset`, () =>
  transformContent(
    'content:_markdown.md',
    `
\`\`\`json [appConfig.ui.${camelName}]
${JSON.stringify(preset, null, 2)}
\`\`\`\
`,
    {
      highlight: {
        theme: {
          light: 'material-theme-lighter',
          default: 'material-theme',
          dark: 'material-theme-palenight',
        },
      },
    },
  ),
)
</script>

<template>
  <ContentRenderer :value="ast" />
</template>
