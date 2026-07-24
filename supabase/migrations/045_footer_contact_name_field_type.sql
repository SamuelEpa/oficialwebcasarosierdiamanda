-- Corrige tipo del campo "name" del formulario footer-contact (radio -> text).
UPDATE form_fields ff
SET type = 'text'
FROM forms f
WHERE ff.form_id = f.id
  AND f.slug = 'footer-contact'
  AND ff.name = 'name'
  AND ff.type = 'radio';
