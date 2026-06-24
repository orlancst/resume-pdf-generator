# UI/UX Fixes and Enhancements for the CV Generator

Please implement the following corrections, optimizations, and styling adjustments to the current implementation of the application:

---

## 1. State Management & Persistence (Real-Time Live Preview)
* **The Issue:** Modifying any input field currently triggers a full browser reload, disrupting the user experience.
* **The Solution:** 
  * Refactor the form handling to update the state in real time. Every keystroke, deletion, or modification within the form fields must instantly update the right-side PDF preview pane **without reloading the page**.
  * **"Save Changes" Button:** Introduce a explicit "Save Changes" button in the form section. This button will handle writing and overwriting the updated state back into the active target YAML file in the backend/local directory. Local state updates are temporary until this button is clicked.

---

## 2. Form Accessibility & UI Layout
* **Input Labels:** Every input field in the left configuration panel must have a clear, persistent visual text `<label>` placed directly **above** the input element. Relying solely on placeholders is not sufficient, as they disappear once the user types.

---

## 3. PDF Typography & Spacing Adjustments
* **Header Spacing:** In the CV preview layout, add vertical spacing (margin/padding) between the candidate's **Name** and the **Headline**. They are currently rendered too close to each other.
* **Page-Break Margins:** Implement appropriate top-padding or safe-printing margins for content that flows into a second (or new) page. Ensure that text shifting to a new page never renders flushed right against the top border of the document canvas.

---

## 4. Layout Alignment & Text Sizing
* **Contact Info Alignment:** In the contact details section, vertically center-align (`items-center`) the text relative to its corresponding icon.
* **Font-Size Adjustments:** Increase the font size slightly for the following sections within the CV layout to improve readability:
  * Contact Info text.
  * Skills paragraphs.
  * Social Networks section.