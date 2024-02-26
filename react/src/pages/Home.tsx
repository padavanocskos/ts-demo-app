import { FC, useEffect } from "react"
import axios from "axios"

const HomePage: FC = () => {
  useEffect(() => {
    axios.get('/contacts', { params: { limit: 10, offset: 0 }})
      .then((response) => {
        console.log(response)
      }).catch((error) => {
        console.log("ERROR" + error)
      })
  }, [])

  return (
    <div>
      {[...new Array(100)]
            .map(
              () => `Cras mattis consectetur purus sit amet fermentum.
Cras justo odio, dapibus ac facilisis in, egestas eget quam.
Morbi leo risus, porta ac consectetur ac, vestibulum at eros.
Praesent commodo cursus magna, vel scelerisque nisl consectetur et.`,
            )
            .join('\n')}
    </div>
  )
}

export default HomePage