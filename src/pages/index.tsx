import { NavBar } from "./../components/NavBar"
import { withUrqlClient } from "next-urql"
import { createUrqlClient } from "../util/createUrqlClient"

const Index = () => (
  <>
    <NavBar />
    <div>hello world</div>
  </>
)

export default withUrqlClient(createUrqlClient)(Index)
