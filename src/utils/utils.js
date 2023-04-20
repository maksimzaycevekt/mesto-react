
//Меняет текст на кнопке сохранения
 export function rendelLoading(isLoading, saveButton, defaultText) {
  if(isLoading) {
    saveButton.textContent = 'Сохранение...'
  } else {
    saveButton.textContent = defaultText
  }
 }

