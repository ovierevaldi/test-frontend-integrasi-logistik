import { IoRefreshOutline } from "react-icons/io5";

const RandomButton = ({onBtnClick} : {onBtnClick: () => void}) => {

  return (
    <button className="bg-blue-500 rounded-full p-2 text-white" type="button" onClick={() => onBtnClick()}> <IoRefreshOutline /> </button>
  )
}

export default RandomButton