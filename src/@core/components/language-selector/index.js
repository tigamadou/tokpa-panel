import React, { useState } from "react"
import { i18n } from "@src/i18n/index"
import { Input } from "reactstrap"

const LanguageSelector = () => {

  const [selectedLanguage, setSelectedLanguage] = useState(i18n.language)
  const chooseLanguage = (value) => {
    i18n.changeLanguage(value)
    setSelectedLanguage(value)
    localStorage.setItem("selectedLanguage", value)
  }

  return (
    <>
      <Input
        type={"select"}
        size="2"
        value={selectedLanguage}
        onChange={chooseLanguage}
      >
        <option value="" hidden></option>
        <option value={"fr"}>Français</option>
        <option value={"en"}>English</option>
      </Input>
    </>
  )
}

export { LanguageSelector }