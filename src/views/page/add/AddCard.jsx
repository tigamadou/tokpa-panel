// ** React Imports
import { Fragment } from "react"

import {
  Row,
  Col,
  Card,
  Form,
  Input,
  Label,
  Button,
  CardBody,
  CardText,
  CardHeader,
  Spinner
} from "reactstrap"

// ** Styles
// import 'react-slidedown/lib/slidedown.css'
// import '@styles/react/libs/react-select/_react-select.scss'
// import '@styles/react/libs/flatpickr/flatpickr.scss'
// import '@styles/base/pages/app-invoice.scss'
// ** Third Party Components

import { Editor } from "react-draft-wysiwyg"

// ** Styles
import "@styles/react/libs/editor/editor.scss"
import slugify from "react-slugify"

const AddCard = ({
  title,
  setTitle,
  intro,
  setIntro,
  content,
  setContent,
  loading,
  language,
  setLanguage
}) => {
  return (
    <Fragment>
      <Card className="invoice-preview-card">
        <CardBody className="py-2">
          <h4>Page </h4>
          <Row>
            <div className="mb-1">
              <Label>Title</Label>
              <Input
                type="text"
                name="title"
                onChange={(e) => setTitle(e.target.value)}
                value={title}
                required
                disabled={loading}
              />
            </div>
            <div className="mb-1">
              <Label>Language</Label>
              <Input
                type="select"
                id="select-basic"
                name="language"
                onChange={(e) => setLanguage(e.target.value)}
                value={language}
                required
                disabled={loading}
              >
                <option selected disabled value="">
                  Choose a language
                </option>
                <option value="french">Français</option>
                <option value="english">Anglais</option>
              </Input>
            </div>

            <div className="mb-1">
              <Label>Slug</Label>
              <Input type="text" name="title" value={slugify(title)} disabled />
            </div>

            <div className="mb-1">
              <Label>Intro</Label>
              <Input
                type="textarea"
                name="intro"
                onChange={(e) => setIntro(e.target.value)}
                value={intro}
                required
                disabled={loading}
              />
            </div>

            <div className="mb-1">
              <Label tag="h6">Content</Label>
              <Editor
                editorState={content}
                onEditorStateChange={(data) => setContent(data)}
                disabled={loading}
              />
            </div>
          </Row>
        </CardBody>
      </Card>
    </Fragment>
  )
}

export default AddCard
