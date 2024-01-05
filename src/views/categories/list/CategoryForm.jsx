import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Button, Col, Form, Input, Label, Row } from "reactstrap"
import { getCategories } from "../store"
import useFetch from "../../hooks/useFetch"
import { toast } from "react-toastify"
import { useTranslation } from "react-i18next"

export default function CategoryForm({ action, data, modal, setModal }) {
  const dispatch = useDispatch()
  const { t } = useTranslation()
  const { post, get, put } = useFetch()
  const [name, setName] = useState(data ? data.name : "")
  const [color, setColor] = useState(data ? data.color : "#171616")
  const [lang, setLang] = useState(data ? data.language : "english")
  const languages = ["english", "français"]

  const handleLanguage = (event) => {
    setLang(event.target.value)
  }

  const onCategorySubmit = (e) => {
    e.preventDefault()
    const formData = new FormData()
    formData.append("name", name)
    formData.append("color", `${color}`)
    formData.append("language", `${lang}`)
    if (action === "add") {
      post("/category/", formData).then(() => {
        get("/category/").then((res) => {
          if (res) {
            dispatch(
              getCategories({
                allData: res,
                total: res.length
              })
            )
            toast.success(t("messages.category_added"))
          }
          setName("")
          setColor("")
        })
      })
    } else if (action === "edit") {
      put(`/category/${data.id}`, formData).then(() => {
        get("/category/").then((res) => {
          if (res) {
            dispatch(
              getCategories({
                allData: res,
                total: res.length
              })
            )
            toast.success(t("messages.category_edited"))
          }
          setName("")
          setColor("")
          setModal(!modal)
        })
      })
    }
  }
  return (
    <Form onSubmit={onCategorySubmit}>
      <Row>
        <Col sm="4">
          <Label for="name">{t("fields.name")} :</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Col>

        <Col sm="2">
          <Label for="language">{t("fields.language")} :</Label>
          <Input
            type="select"
            name="select"
            id="select-basic-language"
            onChange={handleLanguage}
            value={lang}
            required
          >
            <option disabled value="">
              {t("fields.choose_language")}
            </option>
            {Array.isArray(languages) &&
              languages.map((lang) => (
                <option key={lang} value={lang}>
                  {lang}
                </option>
              ))}
          </Input>
        </Col>
        <Col sm="2">
          <Label for="color">{t("fields.color")} :</Label>
          <Input
            type="color"
            id="color"
            value={color}
            onChange={(e) => setColor(e.target.value)}
            required
          />
        </Col>
        <Col sm="4" className="d-flex align-items-center pt-2">
          <Button type="submit">
            {action === "add" ? t("buttons.add") : t("buttons.update")}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
