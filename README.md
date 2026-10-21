name: "my-website"
output_dir: "docs"

navbar:
  title: "[name]"
  left:
    - text: "pg1"
      href: index.html
    - text: "pg2"
      href: page2.html
    - text: "pg3"
      href: page3.html
    - text: "pg4"
      href: page4.html

output:
  html_document:
    theme: flatly
    css: styles.css
    include_before: ""

    ---
title: "pg1"
---

<div class="two-col">
<div>

![](picture.jpg){width=100%}

</div>
<div>

Write your text here.

</div>
</div>

---
title: "pg2"
---

## header 2

Your text here.
