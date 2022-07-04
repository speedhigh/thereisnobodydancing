function checkPhone(tel) {
  let phonereg = 11 && /^((13|14|15|16|17|18|19)[0-9]{1}\d{8})$/
  return !!phonereg.test(tel)
}

export { checkPhone }