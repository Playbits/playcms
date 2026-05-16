# Plan: Implement TinyMCE in Product Form with S3 Image Upload

## Objective
Replace Quill editor with TinyMCE in the product form and implement inline image upload to S3 that stores only URLs (not base64/blob data).

## Current State Analysis
- Product form uses `@vueup/vue-quill` in `ProductFormDetails.vue`
- Blog post form already uses `@tinymce/tinymce-vue` with placeholder image handler
- TinyMCE is already a dependency in package.json
- Backend has working media upload endpoints with S3 integration
- No inline image upload handler exists for either editor currently

## Implementation Plan

### 1. Replace Quill with TinyMCE in ProductFormDetails.vue
- Remove Quill imports and CSS
- Add TinyMCE import: `import { Editor } from '@tinymce/tinymce-vue'`
- Replace `<QuillEditor>` with `<Editor>` component
- Copy TinyMCE configuration from `post.vue`
- Implement image upload handler that uploads to S3 and returns URL

### 2. Replace Quill in pageSectionTemplate/default.vue
- Apply same replacement pattern for consistency
- Use identical TinyMCE configuration

### 3. Image Upload Handler Implementation
Create helper function that:
- Receives blob data from TinyMCE
- Converts to FormData and uploads via `/api/media/upload` BFF endpoint
- Returns URL for TinyMCE to insert into editor
- Ensures only URLs are stored in final HTML

### 4. Configuration Details
- Use same TinyMCE setup as post.vue for consistency
- Plugins: `advlist, autolink, lists, link, image, charmap, print, preview, hr, anchor, pagebreak, searchreplace, wordcount, visualblocks, visualchars, fullscreen, insertdatetime, media, table, emoticons, template, help`
- Custom toolbar tailored for product descriptions
- API key from existing nuxt.config.ts configuration
- HTML output format to match current Quill behavior

### 5. Backend Integration
- Verify `/media/upload` endpoint handles multipart/form-data correctly
- Confirm it returns URL in format expected by TinyMCE handler
- Ensure S3 storage works for uploaded images
- Check CORS settings if needed

### 6. Testing & Validation
- Test image upload in product description
- Verify existing products display correctly (unchanged HTML)
- Confirm only URLs stored in database (no base64/blob)
- Validate form submission with TinyMCE content
- Test page sections with TinyMCE replacement
- Edge cases: large images, different formats, upload failures

## Files to Modify
1. `frontend/src/components/forms/product/ProductFormDetails.vue`
2. `frontend/src/components/pageSectionTemplate/default.vue`

## Dependencies (Already Available)
- `@tinymce/tinymce-vue` - installed and configured
- `$fetch`/`useFetch` - for API calls
- Existing media upload BFF endpoint
- S3 storage backend

This leverages existing infrastructure and follows the proven pattern from the blog post form for consistency.