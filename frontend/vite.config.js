import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'
import unocss from '@unocss/vite'
import { presetUno } from '@unocss/preset-uno'
import { presetAttributify } from '@unocss/preset-attributify'
import { presetIcons } from '@unocss/preset-icons'
import presetWebFonts from '@unocss/preset-web-fonts'
import transformerDirectives from '@unocss/transformer-directives'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [
    react(),
    unocss({
      presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
          extraProperties: {
            "display": "inline-block",
            "vertical-align": "middle"
          }
        }),
        presetWebFonts({
          provider: "google",
          fonts: {
            sans: "Poppins"
          }
        })
      ],
      transformers: [
        transformerDirectives()
      ],
    })
  ],
})
