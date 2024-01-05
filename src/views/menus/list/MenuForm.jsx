import { addDoc, doc, getDocs, updateDoc } from "firebase/firestore"
import React, { useState } from "react"
import { useDispatch } from "react-redux"
import { Button, Col, Form, Input, Label, Row } from "reactstrap"
import { menusRef, db } from "../../../firebase/base"
import { getMenus } from "../store"
import { useTranslation } from 'react-i18next'


export default function MenuForm({ action, data, modal, setModal }) {
  const { t } = useTranslation()
  const dispatch = useDispatch()
  const [name, setName] = useState(data ? data.name : "")
  const [url, setUrl] = useState(data ? data.url : "")
  const [activated, setActivated] = useState(data ? data.activated : false)
  const [target, setTarget] = useState(data ? data.target : false)
  let docRef
  if (data) {
    docRef = doc(db, "menus", data.id)
  }

  const onMenuSubmit = (e) => {
    e.preventDefault()
    const data = {
      name,
      activated,
      url,
      target
    }
    console.log(data)
    if (action === "add") {
      addDoc(menusRef, data).then(() => {
        getDocs(menusRef).then((snapshot) => {
          let Menus = []
          snapshot.docs.forEach((doc) => {
            Menus = [...Menus, { ...doc.data(), id: doc.id }]
          })
          dispatch(
            getMenus({
              allData: Menus,
              total: Menus.length
            })
          )
          setName("")
          setActivated("")
        })
      })
    } else if (action === "edit") {
      updateDoc(docRef, data).then(() => {
        getDocs(menusRef).then((snapshot) => {
          let Menus = []
          snapshot.docs.forEach((doc) => {
            Menus = [...Menus, { ...doc.data(), id: doc.id }]
          })
          dispatch(
            getMenus({
              allData: Menus,
              total: Menus.length
            })
          )
          setModal(!modal)
        })
      })
    }
  }
  return (
    <Form onSubmit={onMenuSubmit}>
      <Row>
        <Col sm="2">
          <Label for="name">{t('fields.name')} :</Label>
          <Input
            type="text"
            id="name"
            value={name}
            onChange={(e) => setName(e.target.value)}
            required
          />
        </Col>
        <Col sm="2">
          <Label for="url">{t('fields.url')} :</Label>
          <Input
            type="text"
            id="url"
            value={url}
            onChange={(e) => setUrl(e.target.value)}
            required
          />
        </Col>
        <Col sm="2" className="d-flex align-items-center">
          <Label for="activated">{t('fields.activated')} :</Label>
          <Input
            className="mx-2"
            type="checkbox"
            id="activated"
            checked={activated}
            onChange={(e) => setActivated(e.target.checked)}
          />
        </Col>
        <Col sm="2" className="d-flex align-items-center">
          <Label for="target">Externe :</Label>
          <Input
            className="mx-2"
            type="checkbox"
            id="target"
            checked={target}
            onChange={(e) => setTarget(e.target.checked)}
          />
        </Col>
        <Col sm="2" className="d-flex align-items-center pt-2">
          <Button type="submit">
            {action === "add" ? t('buttons.add') : t('buttons.update')}
          </Button>
        </Col>
      </Row>
    </Form>
  )
}
