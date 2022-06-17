import React, { useContext } from "react
import { FabricContext }     from "./../context/FabricContext"

const FabricAssetMenu = props => {
  const {opened, setOpened} = useState(false)
  return (
	<>
	  {
		opened &&
		  <div>
			hola
		  </div>
	  }
	</>
  )
}
