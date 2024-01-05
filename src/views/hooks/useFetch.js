import { useState } from 'react'

const useFetch = () => {
  const BASE_URL = process.env.REACT_APP_BACKEND_URL
  const [data, setData] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)
  const token = localStorage.getItem("token")

  const get = async (url) => {
    setLoading(true)
    try {
      const response = await fetch(BASE_URL + url, {
        method: "GET",
        headers: {
          Authorization: `Token ${token ? token : null}`,
          'Content-Type': 'application/json'
        }
      })
      if (!response.ok) throw new Error(response.statusText)
      const json = await response.json()
      setLoading(false)
      setData(json)
      setError(null)
      return json
    } catch (error) {
      setError(`${error}. Could not fetch data`)
      setLoading(false)
    }

  }


  const post = async (url, payload) => {
    setLoading(true)
    try {
      const response = await fetch(BASE_URL + url, {
        method: "POST",
        body: payload,
        headers: {
          Authorization: `Token ${token ? token : null}`
        }
      })
      if (!response.ok) throw new Error(response.statusText)
      const json = await response.json()
      setLoading(false)
      setData(json)
      setError(null)
      return json

    } catch (error) {
      setError(`${error}. Could not fetch data`)
      setLoading(false)
    }

  }

  const put = async (url, payload) => {
    setLoading(true)
    try {
      const response = await fetch(BASE_URL + url, {
        method: "PUT",
        body: payload,
        headers: {
          Authorization: `Token ${token ? token : null}`
        }
      })
      if (!response.ok) throw new Error(response.statusText)
      const json = await response.json()
      setLoading(false)
      setData(json)
      setError(null)
      return json

    } catch (error) {
      setError(`${error}. Could not fetch data`)
      setLoading(false)
    }

  }
  const destroy = async (url, payload = null) => {
    setLoading(true)
    try {
      const headers = {
        Authorization: `Token ${token ? token : null}`,
        'Content-Type': 'application/json'
      }

      const requestOptions = {
        method: "DELETE",
        headers,
        body: payload ? JSON.stringify(payload) : undefined
      }

      const response = await fetch(BASE_URL + url, requestOptions)

      if (!response.ok) throw new Error(response.statusText)

      const json = await response.json()
      setLoading(false)
      setData(json)
      setError(null)
    } catch (error) {
      setError(`${error}. Could not fetch data`)
      setLoading(false)
    }
  }


  return { data, loading, error, get, post, put, destroy }
}

export default useFetch